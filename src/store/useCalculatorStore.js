import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      components: [],
      display: "0",
      currentInput: "",
      previousInput: "",
      operator: "",
      isNewNumber: true,
      waitingForSecondOperand: false,

      addComponent: (component) =>
        set((state) => ({
          components: [...state.components, component],
        })),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== id),
        })),

      updateComponentPosition: (id, position) =>
        set((state) => ({
          components: state.components.map((component) =>
            component.id === id ? { ...component, position } : component
          ),
        })),

      handleNumber: (number) =>
        set((state) => {
          if (state.waitingForSecondOperand) {
            return {
              display: number,
              currentInput: number,
              waitingForSecondOperand: false,
              isNewNumber: false,
            };
          }

          const newInput = state.isNewNumber
            ? number
            : state.currentInput + number;
          return {
            display: newInput,
            currentInput: newInput,
            isNewNumber: false,
          };
        }),

      handleOperator: (nextOperator) =>
        set((state) => {
          const { currentInput, previousInput, operator } = state;

          if (operator && !state.waitingForSecondOperand) {
            const result = calculate(previousInput, currentInput, operator);
            return {
              display: String(result),
              previousInput: String(result),
              currentInput: String(result),
              operator: nextOperator,
              waitingForSecondOperand: true,
              isNewNumber: true,
            };
          }

          return {
            previousInput: currentInput || previousInput,
            operator: nextOperator,
            waitingForSecondOperand: true,
            isNewNumber: true,
          };
        }),

      handleEquals: () =>
        set((state) => {
          if (!state.operator || !state.previousInput || !state.currentInput) {
            return state;
          }

          const result = calculate(
            state.previousInput,
            state.currentInput,
            state.operator
          );
          return {
            display: String(result),
            currentInput: String(result),
            previousInput: "",
            operator: "",
            waitingForSecondOperand: false,
            isNewNumber: true,
          };
        }),

      clearCalculator: () =>
        set({
          display: "0",
          currentInput: "",
          previousInput: "",
          operator: "",
          isNewNumber: true,
          waitingForSecondOperand: false,
        }),

      handleBackspace: () =>
        set((state) => {
          if (state.waitingForSecondOperand) {
            return state;
          }

          if (state.currentInput.length <= 1) {
            return {
              display: "0",
              currentInput: "",
              isNewNumber: true,
            };
          }

          const newInput = state.currentInput.slice(0, -1);
          return {
            display: newInput,
            currentInput: newInput,
          };
        }),

      saveCurrentLayout: () =>
        set((state) => ({
          savedLayout: state.components.sort((a, b) => {
            if (Math.abs(a.position.y - b.position.y) > 20) {
              return a.position.y - b.position.y;
            }
            return a.position.x - b.position.x;
          }),
        })),

      clearSavedLayout: () => set({ savedLayout: null }),
    }),
    {
      name: "calculator-storage",
    }
  )
);

// Helper function to perform calculations
const calculate = (previousValue, currentValue, operator) => {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return current;

  switch (operator) {
    case "+":
      return prev + current;
    case "-":
      return prev - current;
    case "×":
      return prev * current;
    case "÷":
      return current === 0 ? "Error" : prev / current;
    default:
      return current;
  }
};
