import React from 'react';
import { LucideIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  success?: string;
  children?: React.ReactNode;
}

const AuthInput = ({ 
  label, 
  icon: Icon, 
  error, 
  success,
  children, 
  className = "",
  ...props 
}: AuthInputProps) => {
  return (
    <div className="space-y-1.5 w-full min-w-0">
      <label className="text-sm font-medium text-gray-300 flex items-center gap-2 ml-1 tracking-tight truncate">
        <Icon size={16} className="text-neon-500 flex-shrink-0" /> {label}
      </label>

      <div className="flex gap-2 w-full">
        <input
          {...props}
          className={`flex-1 min-w-0 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-neon-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500 text-white text-sm bg-zinc-900/50 backdrop-blur-sm ${
            error 
              ? "border-red-500/50 bg-red-500/10 shadow-sm shadow-red-900/20" 
              : success
                ? "border-green-500/50 bg-green-500/10 shadow-sm shadow-green-900/20"
                : "border-zinc-800 hover:border-zinc-700"
          } ${className}`}
        />
        {children}
      </div>

      {error && (
        <p className="text-xs text-red-400 font-medium flex items-center gap-1 ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}

      {!error && success && (
        <p className="text-xs text-green-400 font-medium flex items-center gap-1 ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 size={12} /> {success}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
