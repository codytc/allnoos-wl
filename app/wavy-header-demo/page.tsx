import { WavyHeader } from "@/components/wavy-header"

export default function WavyHeaderDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WavyHeader />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wavy Header Demo</h1>
        <p className="text-gray-600">
          This demonstrates the WavyHeader component with a white curved line overlay and images clipped exactly 10px
          below the line.
        </p>
      </div>
    </div>
  )
}
