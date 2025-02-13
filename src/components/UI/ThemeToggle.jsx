import { useThemeStore } from "../../store/useThemeStore";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
