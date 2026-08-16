/**
 * Declarations minimales pour Vanta et three (0.134, sans types embarques).
 * Les deux ne sont utilises que dans <VantaBackground>, en import dynamique.
 */
declare module 'three'

declare module 'vanta/dist/vanta.dots.min.js' {
  const effect: (options: Record<string, unknown>) => { destroy: () => void }
  export default effect
}
