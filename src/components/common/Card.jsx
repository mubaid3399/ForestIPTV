import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl bg-zinc-950/60 backdrop-blur-md border border-white/[0.08] p-6 sm:p-7
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:border-white/20 hover:bg-zinc-900/60' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
