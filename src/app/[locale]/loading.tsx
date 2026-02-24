import { HeroSkeleton, StatsSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <section className="py-16 border-y border-meyng-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <StatsSkeleton />
        </div>
      </section>
    </div>
  );
}
