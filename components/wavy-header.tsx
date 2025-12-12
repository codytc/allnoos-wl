export function WavyHeader() {
  // ============================================
  // TUNABLE OFFSETS - Adjust each point separately
  // Positive = move clip DOWN (closes gap), Negative = move clip UP (prevents overlap)
  // ============================================

  const adjustments = {
    p1: 45, // x=0, base Y=48 -> far left edge (had gap, increased significantly)
    p2: 50, // x=240, base Y=128 -> first control point (had gap, increased significantly)
    p3: 45, // x=480, base Y=88 -> first through point (had gap, increased significantly)
    p4: 5, // x=960, base Y=92 -> second through point (reduced to prevent overlap)
    p5: -5, // x=1440, base Y=72 -> far right edge (negative to move clip UP, prevent overlap)
  }

  // Base Y values from original path: M0,48 Q240,128 480,88 T960,92 T1440,72
  const base = { p1: 48, p2: 128, p3: 88, p4: 92, p5: 72 }

  // Calculate final Y values
  const lineY = {
    p1: base.p1,
    p2: base.p2,
    p3: base.p3,
    p4: base.p4,
    p5: base.p5,
  }

  const clipY = {
    p1: base.p1 + adjustments.p1,
    p2: base.p2 + adjustments.p2,
    p3: base.p3 + adjustments.p3,
    p4: base.p4 + adjustments.p4,
    p5: base.p5 + adjustments.p5,
  }

  // Original white line path (unchanged)
  const linePath = `M0,${lineY.p1} Q240,${lineY.p2} 480,${lineY.p3} T960,${lineY.p4} T1440,${lineY.p5}`

  // Clip path with adjustments applied
  const clipPath = `M0,${clipY.p1} Q240,${clipY.p2} 480,${clipY.p3} T960,${clipY.p4} T1440,${clipY.p5} L1440,600 L0,600 Z`

  console.log("[v0] WavyHeader - adjustments:", adjustments)
  console.log("[v0] WavyHeader - clipY:", clipY)

  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* White curved line - separate SVG on top */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <path
          d={linePath}
          fill="none"
          stroke="white"
          strokeWidth="4"
          style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))" }}
        />
      </svg>

      {/* Clipped images container */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1440 600" preserveAspectRatio="none">
        <defs>
          <clipPath id="imageClip">
            <path d={clipPath} />
          </clipPath>
        </defs>

        <g clipPath="url(#imageClip)">
          {/* Left image */}
          <image
            href="/bright-blue-cloudy-sky-with-white-fluffy-clouds.jpg"
            x="0"
            y="0"
            width="720"
            height="600"
            preserveAspectRatio="xMidYMid slice"
          />
          {/* Right image */}
          <image
            href="/dramatic-sunset-with-mountain-silhouette-orange-pu.jpg"
            x="720"
            y="0"
            width="720"
            height="600"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
    </div>
  )
}
