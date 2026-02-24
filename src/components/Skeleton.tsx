export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-meyng-border/50 ${className}`}
      {...props}
    />
  );
}

export function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
        <Skeleton className="h-8 w-40 mx-auto rounded-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3 mx-auto" />
        <div className="flex justify-center gap-4 mt-8">
          <Skeleton className="h-14 w-48 rounded-xl" />
          <Skeleton className="h-14 w-40 rounded-xl" />
        </div>
      </div>
    </section>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-10 w-16 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      ))}
    </div>
  );
}
