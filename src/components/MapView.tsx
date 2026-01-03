import { useEffect, useMemo, useRef } from 'react'
import type {
  ComparisonMode,
  SimSample,
  SimulationConfig,
} from '../engine/stateMachine'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

interface MapViewProps {
  config: SimulationConfig
  withSamples: SimSample[]
  withoutSamples: SimSample[]
  mode: ComparisonMode
}

const buildPath = (points: Array<{ x: number; y: number }>) => {
  if (points.length === 0) return ''
  return points
    .map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
    )
    .join(' ')
}

const normalizePoints = (points: Array<{ x: number; y: number }>) => {
  if (points.length === 0) return points
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const padding = 120
  const width = maxX - minX || 1
  const height = maxY - minY || 1
  const scale = Math.min(
    (1000 - padding * 2) / width,
    (1000 - padding * 2) / height,
  )

  return points.map((point) => ({
    x: (point.x - minX) * scale + padding,
    y: (maxY - point.y) * scale + padding,
  }))
}

const MapView = ({ config, withSamples, withoutSamples, mode }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current) return
    if (!MAPBOX_TOKEN) return

    let map: import('mapbox-gl').Map | null = null
    let cancelled = false

    const initMap = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      if (cancelled || !mapRef.current) return

      mapboxgl.accessToken = MAPBOX_TOKEN
      map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 88],
        zoom: 1.7,
        projection: { name: 'globe' },
        interactive: false,
      })
    }

    void initMap()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [MAPBOX_TOKEN])

  const truePoints = useMemo(
    () => normalizePoints(withSamples.map((sample) => sample.truePos)),
    [withSamples],
  )
  const withPoints = useMemo(
    () => normalizePoints(withSamples.map((sample) => sample.estPos)),
    [withSamples],
  )
  const withoutPoints = useMemo(
    () => normalizePoints(withoutSamples.map((sample) => sample.estPos)),
    [withoutSamples],
  )

  const showWith = mode === 'with' || mode === 'split'
  const showWithout = mode === 'without' || mode === 'split'

  const latestWith = withPoints[withPoints.length - 1]
  const latestWithout = withoutPoints[withoutPoints.length - 1]

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40">
      <div ref={mapRef} className="absolute inset-0" />
      {!MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/70 to-slate-950/80 text-xs uppercase tracking-[0.3em] text-white/60">
          Add Mapbox Token
        </div>
      )}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="truePath" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <path
          d={buildPath(truePoints)}
          fill="none"
          stroke="url(#truePath)"
          strokeWidth={2}
          strokeDasharray="6 8"
          opacity={0.6}
        />
        {showWithout && (
          <path
            d={buildPath(withoutPoints)}
            fill="none"
            stroke="#f97316"
            strokeWidth={3}
            opacity={0.8}
          />
        )}
        {showWith && (
          <path
            d={buildPath(withPoints)}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={3}
            opacity={0.9}
          />
        )}
        {showWith && latestWith && (
          <circle cx={latestWith.x} cy={latestWith.y} r={8} fill="#22d3ee" />
        )}
        {showWithout && latestWithout && (
          <circle cx={latestWithout.x} cy={latestWithout.y} r={8} fill="#f97316" />
        )}
      </svg>
      <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
        {config.routeId.replace('-', ' ')}
      </div>
    </div>
  )
}

export default MapView
