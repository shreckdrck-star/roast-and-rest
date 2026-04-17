import * as React from "react";

import { cn } from "@/lib/utils";

export interface ContainerOwnProps<T extends React.ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
  className?: string;
}

export type ContainerProps<T extends React.ElementType = "div"> =
  ContainerOwnProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerOwnProps<T>>;

export function Container<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
