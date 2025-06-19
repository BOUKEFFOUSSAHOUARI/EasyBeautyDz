"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingBag, Minus, Plus, Heart, Star, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            className="block text-gray-800 font-medium font-inter"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accessories
          </Link>
        </nav>
      </div>

      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
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
          <Link href="/accessories" className="text-gray-800 hover:text-black font-medium font-inter">
            Accessories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-4">
                <div className="w-20 h-20 bg-[#C4B5A0] rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Spray bottle thumbnail"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-20 h-20 bg-[#C4B5A0] rounded-lg overflow-hidden cursor-pointer opacity-60">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Plant thumbnail"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 aspect-square bg-[#C4B5A0] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Spray Bottle"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 font-inter">PLANTED</p>
              <h1 className="text-4xl font-bold text-black mb-4 font-clash">Spray Bottle</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-inter">0</span>
              </div>

              <p className="text-3xl font-bold text-black mb-8 font-inter">$15.00</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-inter">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="flex-1 bg-[#9AE66E] hover:bg-[#8BD65A] text-black font-medium h-12 rounded-full font-inter">
                  Add to cart
                </Button>

                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-black font-clash">Planted Spray Bottle</h2>
              <p className="text-gray-600 leading-relaxed font-inter">
                Imagine stepping into your own personal greenhouse, the air thick with the scent of fresh earth and
                vibrant greenery. As you tend to your leafy companions, misting them with care and precision, you become
                part of a ritual that connects you to nature's rhythm. Our spray bottle isn't just a tool—it's your
                gateway to creating that perfect environment where plants thrive and your green thumb truly shines.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
