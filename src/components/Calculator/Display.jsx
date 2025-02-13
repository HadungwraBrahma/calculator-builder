import { useCalculatorStore } from "../../store/useCalculatorStore";
import useThemeStore from "../../store/useThemeStore";

const Display = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const display = useCalculatorStore((state) => state.display);

  return (
    <div
      className={`p-4 rounded-lg mb-4 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <div
        className={`text-right text-2xl font-mono overflow-hidden ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {display}
      </div>
    </div>
  );
};

export default Display;
