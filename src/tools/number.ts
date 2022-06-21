export const random = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genIdChars = () => {
  const numChars = "1234567890";
  const alphaChars = "qwertyuiopasdfghjklzxcvbnm";
  const charsAry = [...Array(6)].map(() => {
    const isNum = random(0, 1) === 0;
    if (isNum) {
      return numChars[random(0, 9)];
    } else {
      return alphaChars[random(0, 25)];
    }
  });
  return charsAry.join('');
};