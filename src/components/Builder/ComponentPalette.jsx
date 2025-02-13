import DraggableComponent from "./DraggableComponent";
import useThemeStore from "../../store/useThemeStore";

const ComponentPalette = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const components = [
    { type: "display", label: "Display", value: "display" },
    { type: "clear", label: "C", value: "C" },
    { type: "backspace", label: "⌫", value: "backspace" },
    { type: "number", label: "7", value: "7" },
    { type: "number", label: "8", value: "8" },
    { type: "number", label: "9", value: "9" },
    { type: "operator", label: "÷", value: "÷" },
    { type: "number", label: "4", value: "4" },
    { type: "number", label: "5", value: "5" },
    { type: "number", label: "6", value: "6" },
    { type: "operator", label: "×", value: "×" },
    { type: "number", label: "1", value: "1" },
    { type: "number", label: "2", value: "2" },
    { type: "number", label: "3", value: "3" },
    { type: "operator", label: "-", value: "-" },
    { type: "number", label: "0", value: "0" },
    { type: "operator", label: ".", value: "." },
    { type: "equals", label: "=", value: "=" },
    { type: "operator", label: "+", value: "+" },
  ];

  return (
    <div
      className={`p-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Components
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {components.map((component) => (
          <div
            key={`palette-${component.type}-${component.value}`}
            className={component.type === "display" ? "col-span-4" : ""}
          >
            <DraggableComponent {...component} isPlaced={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette;
