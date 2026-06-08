import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Container — wraps the inner content of every <section>.
 *
 * Rules:
 * - The outer <section> stays edge-to-edge (full bleed background).
 * - This Container holds the max-width + responsive lateral padding.
 * - Use it inside every section to keep horizontal rhythm consistent.
 */
const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16",
      className
    )}
    {...props}
  />
));
Container.displayName = "Container";

export { Container };
