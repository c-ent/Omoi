function Dots({ size = "md", className = "" }) {
  const dotSize = size === "sm" ? "h-1.5 w-1.5" : "h-2.5 w-2.5";

  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden="true">
      <span className={`${dotSize} animate-pulse rounded-full bg-current opacity-40`} />
      <span
        className={`${dotSize} animate-pulse rounded-full bg-current opacity-70`}
        style={{ animationDelay: "150ms" }}
      />
      <span
        className={`${dotSize} animate-pulse rounded-full bg-current`}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}

export default function LoadingDots({ variant = "page" }) {
  if (variant === "button") {
    return <Dots size="md" className="text-inherit" />;
  }

  if (variant === "inline") {
    return (
      <div className="loading_dots_inline">
        <Dots className="text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="loading_dots_page">
      <Dots className="text-yellow-400" />
    </div>
  );
}
