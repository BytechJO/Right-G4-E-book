const WrongMark = ({
  top = "top-1/2",
  left = "left-full",
  marginLeft = "ml-2",
}) => {
  return (
    <div
      className={`absolute ${top} ${left} ${marginLeft} -translate-y-1/2
      w-6 h-6 text-xs bg-red-500 text-white rounded-full
      flex items-center justify-center font-bold border-2 border-white
      pointer-events-none shadow-lg`}
    >
      ✕
    </div>
  );
};

export default WrongMark; 