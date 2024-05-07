import React, { FC } from "react";
import buttonStyle from "./Button.style";
import { VariantProps } from "class-variance-authority";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyle> {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  intent,
  border,
  className,
  children,
  ...props
}) => {
  return (
    <button className={buttonStyle({ intent, border, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
