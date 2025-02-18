interface  CenterHeaderProps {
    title?: string
    description?: string
    className?: string
  }
  
  export function CenterHeader({
    title = "Blogs",
    description = "Explore expert tips, health insights, and updates on pharmacy services to stay informed and empowered.",
    className = "",
  }: CenterHeaderProps) {
    return (
      <div className={`text-center space-y-4 max-w-4xl mx-auto px-4 ${className}`}>
        <h1 className="text-4xl md:text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        <p className="text-[18px] text-[#52525B] font-normal font-roboto leading-relaxed">{description}</p>
      </div>
    )
  }
  
  