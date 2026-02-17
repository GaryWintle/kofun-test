const TestButton = ({ children, activeClass, onClick }) => {
  return (
    <button
      className={`${'px-4 py-2 rounded-2xl cursor-pointer'} ${activeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TestButton;
