import type { Variants } from 'framer-motion';

/**
 * Shared motion primitives so every card/section animates with the same
 * rhythm. Entrance is a subtle fade + small y-offset; hover is a gentle lift.
 * All of these respect prefers-reduced-motion via the global MotionConfig
 * (reducedMotion="user") set in providers.tsx.
 */

// Card entrance — fade + slight rise, with a small per-item stagger via `custom`.
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: (i % 4) * 0.06 },
  }),
};

// Section heading / block reveal.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Hover lift target + its (fast) transition. Kept separate from the entrance
// transition so the per-item stagger delay never leaks into the hover gesture.
export const hoverLift = { y: -6 };
export const hoverTransition = { duration: 0.25, ease: 'easeOut' } as const;

// Standard scroll-trigger viewport config.
export const revealViewport = { once: true, margin: '-60px' } as const;
