export default function Button({ children }) {
  return (
    <button className="px-4 py-2 rounded-md text-white bg-primary">
      {children}
    </button>
  );
}