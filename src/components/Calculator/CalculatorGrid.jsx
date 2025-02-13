import Button from "./Button";
import Display from "./Display";
import { useCalculatorStore } from "../../store/useCalculatorStore";
import useThemeStore from "../../store/useThemeStore";

const CalculatorGrid = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const savedLayout = useCalculatorStore((state) => state.savedLayout);
  const {
    handleNumber,
    handleOperator,
    handleEquals,
    clearCalculator,
    handleBackspace,
  } = useCalculatorStore();

  if (!savedLayout) return null;

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="grid grid-cols-4 gap-2">
        {savedLayout.map((component) => {
          if (component.type === "display")
            return (
              <div key={component.id} className="col-span-4">
                <Display />
              </div>
            );

          return (
            <Button
              key={component.id}
              label={component.label}
              type={component.type}
              onClick={() => {
                switch (component.type) {
                  case "number":
                    handleNumber(component.value);
                    break;
                  case "operator":
                    handleOperator(component.value);
                    break;
                  case "equals":
                    handleEquals();
                    break;
                  case "clear":
                    clearCalculator();
                    break;
                  case "backspace":
                    handleBackspace();
                    break;
                  default:
                    break;
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalculatorGrid;
