
const ModalDialogWrapper = ({ toggleModal = false, children }) => {

  return (
    toggleModal ?
      <main className={"fixed z-40 inset-0 w-auto flex flex-col items-center justify-center bg-gray-300 bg-opacity-50"}>
        {children}
      </main>
      :
      <></>
  );
}

export default ModalDialogWrapper;