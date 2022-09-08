export const getRandomInt = (max: number, min: number = 1): number => {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
