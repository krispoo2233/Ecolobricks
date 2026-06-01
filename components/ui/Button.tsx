import React from 'react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'btn-primary rounded-sm',
  secondary: 'btn-secondary rounded-sm',
  ghost: 'btn-ghost',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const classes = `${variants[variant]} font-body ${className}`;

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </a>
    );
  }

  return (
    <motion.button className={classes} onClick={onClick} {...props}>
      {content}
    </motion.button>
  );
};

export default Button;
