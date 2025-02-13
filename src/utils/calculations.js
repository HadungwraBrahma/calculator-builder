export const evaluate = (equation) => {
  try {
    const sanitizedEquation = equation.replace(/[^0-9+\-*/().]/g, "");
    return Function(`'use strict'; return (${sanitizedEquation})`)();
  } catch (error) {
    return "Error";
  }
};
