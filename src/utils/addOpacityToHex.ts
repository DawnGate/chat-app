const addOpacityToHex = (color: string, opacity: number) => {
  // coerce values so ti is between 0 and 1.
  const opacityClean = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + opacityClean.toString(16).toUpperCase();
};

export default addOpacityToHex;
