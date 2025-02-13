import { useThemeStore } from "../../store/useThemeStore";

const Header = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <header className="text-center mb-8">
      <h1
        className={`text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Calculator Builder
      </h1>
      <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        Drag and drop components to build your custom calculator
      </p>
    </header>
  );
};

export default Header;
