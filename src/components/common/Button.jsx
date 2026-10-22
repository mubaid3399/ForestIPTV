import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] text-sm tracking-tight';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5 font-semibold',
  };

  const variants = {
    // Disciplined, high-contrast primary CTA
    primary:
      'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold border border-emerald-400/30 hover:border-emerald-300 shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    // Minimalist hairline dark surface
    secondary:
      'bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-200 border border-white/10 hover:border-white/20 backdrop-blur-md',
    // Subtle hairline outline
    outline:
      'bg-transparent text-zinc-300 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400',
    // Text ghost
    ghost:
      'bg-transparent hover:bg-white/[0.05] text-zinc-400 hover:text-zinc-100 border border-transparent',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
};

export default Button;
