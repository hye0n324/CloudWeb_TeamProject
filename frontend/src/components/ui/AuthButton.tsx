import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  to?: string;
}

export default function AuthButton({ 
  isLoading, 
  icon: Icon, 
  children, 
  className = "", 
  disabled,
  to,
  ...props 
}: AuthButtonProps) {
  const commonStyles = `w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-black shadow-lg transition-all active:scale-[0.98] ${
    isLoading || disabled ? "bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none" : "bg-neon-500 hover:bg-neon-400 shadow-neon-500/20 hover:shadow-neon-500/40"
  } ${className}`;

  const content = (
    <>
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {children}
          {Icon && <Icon size={20} />}
        </>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={commonStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={commonStyles}
    >
      {content}
    </button>
  );
}
