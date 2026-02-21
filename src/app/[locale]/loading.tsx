export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-meyng-border" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-meyng-purple animate-spin" />
        </div>
        <span className="text-meyng-silver text-sm">Loading...</span>
      </div>
    </div>
  );
}
