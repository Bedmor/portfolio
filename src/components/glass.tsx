"use client";
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "react";

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "soft" | "dark";
}

export default function Glass({
  className,
  children,
  variant = "default",
  ...props
}: GlassProps) {
  const classes = cn(
    variant === "dark"
      ? "glass-dark"
      : variant === "soft"
        ? "glass-soft"
        : "glass",
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
