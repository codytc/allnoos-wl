import { AllnoosLogo } from "@/components/allnoos-logo"

export default function Loading() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-start px-4 py-4">
        <AllnoosLogo variant="white" size="md" />
      </div>
    </div>
  )
}
