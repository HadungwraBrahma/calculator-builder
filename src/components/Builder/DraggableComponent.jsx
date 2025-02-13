import { useDrag } from "react-dnd";
import { XCircle } from "lucide-react";
import { useCalculatorStore } from "../../store/useCalculatorStore";
import useThemeStore from "../../store/useThemeStore";

const DraggableComponent = ({
  id,
  type,
  label,
  value,
  position,
  onRemove,
  isPlaced,
}) => {
  const {
    handleNumber,
    handleOperator,
    handleEquals,
    clearCalculator,
    handleBackspace,
    display,
  } = useCalculatorStore();

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { id, type, label, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    if (!isPlaced) return;

    switch (type) {
      case "number":
        handleNumber(value);
        break;
      case "operator":
        if (value === ".") {
          if (!display.includes(".")) {
            handleNumber(".");
          }
        } else {
          handleOperator(value);
        }
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
  };

  const getStyle = () => {
    if (!isPlaced) return {};
    return {
      position: "absolute",
      left: `${position?.x || 0}px`,
      top: `${position?.y || 0}px`,
      transform: "translate(-50%, -50%)",
    };
  };

  const getComponentStyle = () => {
    const baseStyles =
      "flex items-center justify-center cursor-move shadow-md relative";

    switch (type) {
      case "display":
        return `${baseStyles} ${isPlaced ? "w-64" : "w-full"} h-16 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        } text-right px-4 text-xl ${!isPlaced ? "col-span-4" : ""}`;
      case "operator":
        return `${baseStyles} ${
          isPlaced ? "w-12" : "w-full"
        } h-12 bg-blue-500 text-white hover:bg-blue-600`;
      case "equals":
        return `${baseStyles} ${
          isPlaced ? "w-12" : "w-full"
        } h-12 bg-green-500 text-white hover:bg-green-600`;
      case "clear":
        return `${baseStyles} ${
          isPlaced ? "w-12" : "w-full"
        } h-12 bg-red-500 text-white hover:bg-red-600`;
      case "backspace":
        return `${baseStyles} ${
          isPlaced ? "w-12" : "w-full"
        } h-12 bg-yellow-500 text-white hover:bg-yellow-600`;
      default:
        return `${baseStyles} ${isPlaced ? "w-12" : "w-full"} h-12 ${
          isDarkMode
            ? "bg-gray-600 hover:bg-gray-500"
            : "bg-gray-200 hover:bg-gray-300"
        }`;
    }
  };

  return (
    <div
      ref={drag}
      style={getStyle()}
      className={`
        ${getComponentStyle()}
        rounded-lg
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${isPlaced ? "absolute" : ""}
      `}
      onClick={handleClick}
    >
      {type === "display" ? display : label}
      {isPlaced && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 bg-white rounded-full shadow-sm z-10"
        >
          <XCircle className="w-4 h-4 text-red-500" />
        </button>
      )}
    </div>
  );
};

export default DraggableComponent;
