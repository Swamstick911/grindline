
export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
}
