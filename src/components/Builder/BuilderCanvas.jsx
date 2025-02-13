import { useCalculatorStore } from "../../store/useCalculatorStore";
import { useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import useThemeStore from "../../store/useThemeStore";

const BuilderCanvas = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { components, addComponent, removeComponent, updateComponentPosition } =
    useCalculatorStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const dropRect = document
        .getElementById("builder-canvas")
        .getBoundingClientRect();
      const position = {
        x: offset.x - dropRect.left,
        y: offset.y - dropRect.top,
      };

      if (!item.id) {
        addComponent({
          id: Date.now().toString(),
          type: item.type,
          label: item.label,
          value: item.value,
          position,
        });
      } else {
        updateComponentPosition(item.id, position);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      id="builder-canvas"
      ref={drop}
      className={`relative p-6 rounded-lg shadow-lg min-h-[600px] ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } ${isOver ? "border-2 border-blue-500" : "border-2 border-transparent"}`}
    >
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          {...component}
          onRemove={() => removeComponent(component.id)}
          isPlaced={true}
        />
      ))}
    </div>
  );
};

export default BuilderCanvas;
