"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import { motion } from "framer-motion"

interface CultureCode {
  id: number
  companyName: string
  slogan: string
  description: string
  tags: string[]
  color: string
}

interface CultureCodeCardProps {
  cultureCode: CultureCode
}

export default function CultureCodeCard({ cultureCode }: CultureCodeCardProps) {
  const { companyName, slogan, description, tags, color } = cultureCode
  const [isHovered, setIsHovered] = useState(false)

  // Extract first letter of company name for logo
  const firstLetter = companyName.charAt(0)

  return (
    <Card
      className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-2 w-full transition-all duration-300 group-hover:h-3" style={{ backgroundColor: color }}></div>
      <CardHeader className="flex flex-row items-start gap-4 pb-2 pt-6">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xl font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {firstLetter}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">{companyName}</div>
          <h3 className="text-xl font-bold leading-tight tracking-tight">{slogan}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        <motion.p
          className="text-gray-600"
          animate={{ height: isHovered ? "auto" : "3.6em" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          {description}
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-xs transition-colors hover:bg-gray-200">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
