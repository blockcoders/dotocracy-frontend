export const cardEnterAnimation: any = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const enterAnimation: any = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    default: {
      duration: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    },
    scale: {
      type: "spring",
      damping: 5,
      stiffness: 100,
      restDelta: 0.001,
    },
  },
};

export const buttonAnimation: any = {
  whileHover: {
    scale: 1.1,
  },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
  transitionDuration: "none",
  transitionPropert: "none",
  whileTap: { scale: 0.95 },
};
