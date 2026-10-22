import React from 'react';

export const Badge = ({
  children,
  variant = 'emerald',
  size = 'md',
  className = '',
  dot = false,
  icon: Icon,
  mono = false,
}) => {
  const base = `inline-flex items-center gap-1.5 font-medium rounded-full select-none transition-colors ${
    mono ? 'font-mono tracking-tight text-[11px]' : 'tracking-normal'
  }`;

  const sizes = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-xs px-3.5 py-1.5 font-semibold',
  };

  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    neutral: 'bg-white/[0.04] text-zinc-300 border border-white/10',
    outline: 'bg-transparent text-zinc-400 border border-white/10',
    live: 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant] || variants.neutral} ${className}`}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
        </span>
      )}
      {Icon && <Icon className="w-3 h-3 shrink-0 opacity-80" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
