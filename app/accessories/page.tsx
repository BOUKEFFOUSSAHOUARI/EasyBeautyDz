"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function AccessoriesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const accessories = [
    { id: 1, name: "Spray Bottle", price: "$15.00", image: "/placeholder.svg?height=300&width=300" },
    { id: 2, name: "Plant Food", price: "$12.00", image: "/placeholder.svg?height=300&width=300" },
    { id: 3, name: "Watering Can", price: "$25.00", image: "/placeholder.svg?height=300&width=300" },
    { id: 4, name: "Plant Stand", price: "$45.00", image: "/placeholder.svg?height=300&width=300" },
    { id: 5, name: "Pruning Shears", price: "$18.00", image: "/placeholder.svg?height=300&width=300" },
    { id: 6, name: "Humidity Meter", price: "$22.00", image: "/placeholder.svg?height=300&width=300" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <Link href="/" className="text-xl font-bold text-black border-2 border-black px-2 py-1 font-clash">
            Planted
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-6 space-y-4">
          <Link
            href="/shop"
            className="block text-gray-800 font-medium font-inter"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop All
          </Link>
          <Link
            href="/plants"
            className="block text-gray-800 font-medium font-inter"
            onClick={() => setMobileMenuOpen(false)}
          >
            Plants
          </Link>
          <Link
            href="/accessories"
            className="block text-black font-medium font-inter"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accessories
          </Link>
        </nav>
      </div>

      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <Link href="/" className="text-2xl font-bold text-black border-2 border-black px-3 py-1 font-clash">
          Planted
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-gray-800 hover:text-black font-medium font-inter">
            Shop All
          </Link>
          <Link href="/plants" className="text-gray-800 hover:text-black font-medium font-inter">
            Plants
          </Link>
          <Link href="/accessories" className="text-black hover:text-black font-medium font-inter">
            Accessories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-black mb-8 font-clash">Accessories</h1>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group cursor-pointer">
              <Link href={`/product/${accessory.id}`}>
                <div className="aspect-[4/5] bg-[#C4B5A0] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={accessory.image || "/placeholder.svg"}
                    alt={accessory.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 font-clash">{accessory.name}</h3>
                <p className="text-gray-600 font-medium font-inter">{accessory.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
