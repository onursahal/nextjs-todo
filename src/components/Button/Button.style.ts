import { cva, VariantProps } from "class-variance-authority";

const buttonStyle = cva(["text-white", "rounded-md px-2 py-1"], {
  variants: {
    intent: {
      primary: ["bg-gradient-to-r from-violet-800 to-indigo-700"],
      secondrary: [""],
      neutral: ["bg-gradient-to-r from-stone-500 to-stone-700"],
      danger: ["bg-gradient-to-r from-red-600 to-red-800"],
      transparent: ["bg-transparent"],
    },
    border: {
      true: ["border border-white"],
      false: ["border border-transparent"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export default buttonStyle;
