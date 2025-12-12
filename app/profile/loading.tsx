export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-stone-50 animate-pulse">
      {/* Header skeleton */}
      <div className="relative z-10 flex justify-between items-center px-4 py-4">
        <div className="flex-1 flex justify-start">
          <div className="w-10 h-10 rounded-full bg-stone-200" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-8 w-24 bg-stone-200 rounded" />
        </div>
        <div className="flex-1 flex justify-end">
          <div className="w-10 h-10 rounded-full bg-stone-200" />
        </div>
      </div>

      {/* Profile content skeleton */}
      <div className="px-4 py-6 space-y-6">
        {/* Avatar and info skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-stone-200" />
          <div className="h-6 w-32 bg-stone-200 rounded" />
          <div className="h-4 w-48 bg-stone-200 rounded" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-stone-200 rounded-lg h-20" />
          ))}
        </div>

        {/* Posts skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-stone-200 rounded-lg h-48" />
          ))}
        </div>
      </div>
    </div>
  )
}
