// eslint-disable-next-line import/no-extraneous-dependencies
import Lenis from '@studio-freight/lenis';

export const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
  
requestAnimationFrame(raf)