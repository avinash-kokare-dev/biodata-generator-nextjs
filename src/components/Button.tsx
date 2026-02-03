
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-rose-700 to-rose-800 text-white hover:from-rose-800 hover:to-rose-900 shadow-lg shadow-rose-900/20 focus:ring-rose-500',
    secondary: 'bg-slate-900 text-white hover:bg-black focus:ring-slate-500 shadow-md',
    outline: 'border-2 border-rose-200 text-rose-800 hover:bg-rose-50 hover:border-rose-300 focus:ring-rose-400',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-400 border border-red-200',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-600/20 focus:ring-amber-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs uppercase tracking-widest font-bold',
    md: 'px-6 py-3 text-sm font-bold tracking-wide',
    lg: 'px-10 py-4 text-base font-bold tracking-wide',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
