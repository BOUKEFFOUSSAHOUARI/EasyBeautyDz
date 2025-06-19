"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingBag, ChevronDown, ChevronUp, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/footer"

export default function ShopPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [brandOpen, setBrandOpen] = useState(true)
  const [colorOpen, setColorOpen] = useState(true)

  const products = [
    {
      id: 1,
      name: "3 Plant Bundle",
      price: "$342.00",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "The Planter by Rustic Roots",
      brand: "Rustic Roots",
      price: "$55.00",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "The Cylinder by Modern Botany",
      brand: "Modern Botany",
      price: "$35.00",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "ZZ Plant",
      price: "$45.00",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 5,
      name: "Snake Plant",
      price: "$38.00",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 6,
      name: "Monstera Deliciosa",
      price: "$65.00",
      image: "/placeholder.svg?height=400&width=400",
    },
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
            className="block text-black font-medium font-inter"
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
            className="block text-gray-800 font-medium font-inter"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accessories
          </Link>
        </nav>
      </div>

      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <Link href="/" className="text-2xl font-bold text-black border-2 border-black px-3 py-1">
          Planted
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-black hover:text-black font-medium">
            Shop All
          </Link>
          <Link href="/plants" className="text-gray-800 hover:text-black font-medium">
            Plants
          </Link>
          <Link href="/accessories" className="text-gray-800 hover:text-black font-medium">
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black font-clash">
            All Products <span className="text-gray-400">18</span>
          </h2>
          <Select defaultValue="featured">
            <SelectTrigger className="w-48 border-0 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured items</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Brand Filter */}
              <div>
                <button
                  onClick={() => setBrandOpen(!brandOpen)}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-4"
                >
                  BRAND
                  {brandOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {brandOpen && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="modern-botany" />
                      <label htmlFor="modern-botany" className="text-sm">
                        Modern Botany
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="planted" />
                      <label htmlFor="planted" className="text-sm">
                        Planted
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rustic-roots" />
                      <label htmlFor="rustic-roots" className="text-sm">
                        Rustic Roots
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div>
                <button
                  onClick={() => setColorOpen(!colorOpen)}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-4"
                >
                  COLOR
                  {colorOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {colorOpen && (
                  <div className="grid grid-cols-2 gap-3">
                    {["Denim", "Emerald", "Lavender", "Mint", "Ocean", "Peach", "Plum", "Salmon", "Sand", "Sky"].map(
                      (color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox id={color.toLowerCase()} />
                          <label htmlFor={color.toLowerCase()} className="text-sm">
                            {color}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-[4/5] bg-[#C4B5A0] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-1 font-clash">{product.name}</h3>
                    {product.brand && <p className="text-gray-500 text-sm mb-1 font-inter">{product.brand}</p>}
                    <p className="text-gray-600 font-medium font-inter">{product.price}</p>
                  </Link>
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox id={`compare-${product.id}`} />
                    <label htmlFor={`compare-${product.id}`} className="text-sm text-gray-600 font-inter">
                      Compare
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
