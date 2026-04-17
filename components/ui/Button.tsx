import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
}

export interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export interface ButtonAsLinkProps
  extends ButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> {
  href: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variants: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary: "bg-coffee-600 text-white hover:bg-coffee-700 active:bg-coffee-800",
  secondary: "bg-coffee-300 text-coffee-800 hover:bg-coffee-400",
  outline:
    "border-2 border-coffee-600 text-coffee-600 hover:bg-coffee-600 hover:text-white",
  ghost: "text-coffee-600 hover:bg-coffee-100",
};

const sizes: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      href,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee-500 focus-visible:ring-offset-2 focus-visible:ring-offset-coffee-50",
      "disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
      variants[variant],
      sizes[size],
      className,
    );

    if (href) {
      const { onClick, tabIndex, ...rest } = props as Omit<ButtonAsLinkProps, "href">;

      return (
        <Link
          href={href}
          className={classes}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : tabIndex}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            onClick?.(e);
          }}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    const buttonProps = props as ButtonAsButtonProps;

    return (
      <button
        className={classes}
        disabled={disabled || buttonProps.disabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
