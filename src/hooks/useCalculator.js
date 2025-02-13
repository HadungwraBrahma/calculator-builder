import { useState } from "react";

export const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num) => {
    setDisplay((prev) => (isNewNumber ? num : prev + num));
    setIsNewNumber(false);
  };

  const handleOperator = (operator) => {
    setEquation((prev) => `${prev} ${display} ${operator}`);
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const result = eval(`${equation} ${display}`);
      setDisplay(result.toString());
      setEquation("");
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  };

  return {
    display,
    equation,
    handleNumber,
    handleOperator,
    calculate,
    clear,
  };
};
