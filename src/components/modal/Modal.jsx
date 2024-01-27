export const Modal = ({ children }) => {
  return (
    <div
      //   onClick={() => dispatch(initOption())}
      className="fixed z-20 inset-0  flex justify-center items-center w-full h-screen rounded mx-auto "
    >
      <div
        className="bg-[#EEF3F8] rounded-md px-32 py-10 max-w-[1050px] flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
