"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Step4Success() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Your Pharmacy Profile is Live on Health Access</h1>
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          Great! Now patients can discover your pharmacy, browse your services and book appointments.
        </p>

        {/* Action Button */}
        <Link href="/dashboard">
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-6 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
