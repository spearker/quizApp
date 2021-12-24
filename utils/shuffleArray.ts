export const shuffleArray = (array: Array<string>) => {
  return array.sort(() => Math.random() - 0.5);
}
