export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-6">
      {/* Animated logo */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <span className="absolute text-3xl">📰</span>
      </div>

      {/* Skeleton lines */}
      <div className="w-64 space-y-3">
        {[80, 60, 72, 50].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-muted overflow-hidden"
            style={{ width: `${w}%` }}
          >
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground animate-pulse">Chargement des articles...</p>
    </div>
  );
}
