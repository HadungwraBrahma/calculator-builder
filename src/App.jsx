import Header from "./components/UI/Header";
import BuilderCanvas from "./components/Builder/BuilderCanvas";
import ComponentPalette from "./components/Builder/ComponentPalette";
import CalculatorGrid from "./components/Calculator/CalculatorGrid";
import ThemeToggle from "./components/UI/ThemeToggle";
import { useCalculatorStore } from "./store/useCalculatorStore";
import useThemeStore from "./store/useThemeStore";

const App = () => {
  const { saveCurrentLayout, clearSavedLayout, savedLayout } =
    useCalculatorStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <Header />
        <ThemeToggle />

        {!savedLayout ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <ComponentPalette />
              <div className="md:col-span-2">
                <BuilderCanvas />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={saveCurrentLayout}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Layout
              </button>
            </div>
          </>
        ) : (
          <>
            <CalculatorGrid />
            <div className="mt-4 flex justify-center">
              <button
                onClick={clearSavedLayout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Return to Builder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
