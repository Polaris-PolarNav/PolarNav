import type { RouteId, Vec2 } from './stateMachine'

const TWO_PI = Math.PI * 2

const ROUTE_PROFILES: Record<
  RouteId,
  {
    label: string
    description: string
    baseRadiusKm: number
    wobbleKm: number
    angleStart: number
    angleEnd: number
  }
> = {
  transpolar: {
    label: 'Transpolar Commercial',
    description: 'Long-haul polar crossing with stable turns over the pole.',
    baseRadiusKm: 1400,
    wobbleKm: 120,
    angleStart: -2.2,
    angleEnd: 1.4,
  },
  research: {
    label: 'Arctic Research Loop',
    description: 'Tight looping pattern for sampling over the polar cap.',
    baseRadiusKm: 980,
    wobbleKm: 180,
    angleStart: 0.4,
    angleEnd: 0.4 + TWO_PI,
  },
  patrol: {
    label: 'Military Patrol',
    description: 'Wide patrol arc with extended dwell near the pole.',
    baseRadiusKm: 1650,
    wobbleKm: 140,
    angleStart: -1.4,
    angleEnd: 2.8,
  },
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const getRouteMeta = (routeId: RouteId) => ROUTE_PROFILES[routeId]

export const listRoutes = (): Array<{ id: RouteId; label: string }> =>
  (Object.keys(ROUTE_PROFILES) as RouteId[]).map((id) => ({
    id,
    label: ROUTE_PROFILES[id].label,
  }))

export const getTruePosition = (routeId: RouteId, progress: number): Vec2 => {
  const route = ROUTE_PROFILES[routeId]
  const angle = lerp(route.angleStart, route.angleEnd, progress)
  const wobble =
    route.wobbleKm * Math.sin(progress * TWO_PI * 1.6 + route.angleStart * 0.4)
  const radius = route.baseRadiusKm + wobble

  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  }
}
