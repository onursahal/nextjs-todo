import React, { FC } from "react";
import buttonStyle from "./Button.style";
import { VariantProps } from "class-variance-authority";
import { Button as HeadlessButton } from "@headlessui/react";

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
    <HeadlessButton
      className={buttonStyle({ intent, border, className })}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};

export default Button;
