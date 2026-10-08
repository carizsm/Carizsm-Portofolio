export const motionTokens = {
  duration: { fast: 0.18, normal: 0.3 },
  easing: { smooth: [0.22, 1, 0.36, 1] as const },
  distance: { small: 8 },
};

export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
};

export function shouldAnimate(reducedMotion: boolean | null) {
  return reducedMotion === false;
}
