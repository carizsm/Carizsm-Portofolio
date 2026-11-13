export const motionTokens = {
  duration: { fast: 0.18, normal: 0.3, reveal: 0.45, slow: 0.6, stagger: 0.08, menuStagger: 0.04, intro: 1 },
  easing: { smooth: [0.22, 1, 0.36, 1] as const },
  distance: { small: 8, content: 20, entrance: 36 },
};

export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { stiffness: 120, damping: 24, mass: 0.8 },
};

export function shouldAnimate(reducedMotion: boolean | null) {
  return reducedMotion === false;
}
