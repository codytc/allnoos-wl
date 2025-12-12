export default function VoyagerLoading() {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            </div>
            <div className="flex justify-center">
              <div className="h-12 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex-1" />
          </div>
          <div className="relative">
            <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-6">
        <section className="w-full max-w-full">
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-border rounded-lg overflow-hidden bg-background"
              >
                <div className="h-56 bg-muted animate-pulse" />
                <div className="p-5 pt-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
