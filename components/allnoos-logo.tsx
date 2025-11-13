"use client"

interface AllnoosLogoProps {
  variant?: "default" | "white" | "primary"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  animated?: boolean
}

export function AllnoosLogo({
  variant = "default",
  size = "md",
  className = "",
  onClick,
  animated = false,
}: AllnoosLogoProps) {
  const getColorClass = () => {
    switch (variant) {
      case "white":
        return "text-white"
      case "primary":
        return "text-primary"
      default:
        return "text-[#FDB484]" // Brand orange
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          fontSize: "24px",
          lineHeight: "20px",
          letterSpacing: "-0.8px",
        }
      case "lg":
        return {
          fontSize: "48px",
          lineHeight: "40px",
          letterSpacing: "-1.6px",
        }
      default: // md
        return {
          fontSize: "38px",
          lineHeight: "32px",
          letterSpacing: "-1.2px",
        }
    }
  }

  return (
    <h1
      className={`block flex-shrink-0 whitespace-nowrap leading-none italic font-medium ${getColorClass()} ${className} ${onClick ? "cursor-pointer" : ""} ${
        animated ? "transition-all duration-700 ease-in-out" : ""
      }`}
      style={{
        minWidth: size === "sm" ? "80px" : size === "md" ? "100px" : size === "lg" ? "140px" : "100px",
        minHeight: size === "sm" ? "20px" : size === "md" ? "24px" : size === "lg" ? "32px" : "24px",
        fontFamily: "Urbanist, 'Georgia', 'Times New Roman', serif",
        fontWeight: "500",
        fontStyle: "italic",
        ...getSizeStyles(),
      }}
      onClick={onClick}
    >
      allnoos
    </h1>
  )
}

export default AllnoosLogo
