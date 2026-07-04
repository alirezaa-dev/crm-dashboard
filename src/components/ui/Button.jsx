export default function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 rounded-md text-white bg-primary cursor-pointer hover:bg-primary-hover"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
