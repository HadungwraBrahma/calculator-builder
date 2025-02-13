const Button = ({ label, type, onClick }) => {
  const getButtonStyle = () => {
    switch (type) {
      case "operator":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "equals":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "clear":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "backspace":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      default:
        return "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg text-lg font-semibold ${getButtonStyle()}`}
    >
      {label}
    </button>
  );
};

export default Button;
