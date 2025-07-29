// src/components/ui/button.jsx
export function Button({ children, onClick, className = '', variant = 'default' }) {
  const base = 'px-4 py-2 rounded font-semibold transition-all';
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

