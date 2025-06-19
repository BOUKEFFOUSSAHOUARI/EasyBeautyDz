import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-[600px] bg-[#D4C4B0] overflow-hidden">
        <Image src="/plant-hero.jpg" alt="Fresh plants for every occasion" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 font-clash">
            Fresh finds for every occasion
          </h1>
          <p className="text-lg mb-8 opacity-90 font-inter">
            Explore our latest arrivals, curated to bring you style, functionality, and inspiration. Shop now and
            discover your next favorite.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium font-inter">
            Shop Now
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-8 flex space-x-2">
          <div className="w-12 h-1 bg-white"></div>
          <div className="w-12 h-1 bg-white/40"></div>
          <div className="w-12 h-1 bg-white/40"></div>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 right-8 text-white">
          <span className="text-lg font-inter">01/03</span>
          <div className="flex space-x-2 mt-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-clash">Featured collection</h2>
              <p className="text-gray-600 text-lg mb-8 font-inter">
                Explore our top picks in this featured collection. Find the perfect gift or treat yourself!
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full font-inter">
                View more
              </Button>
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-[#C4B5A0] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="3 Plant Bundle"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 font-clash">3 Plant Bundle</h3>
                <p className="text-gray-600 font-medium font-inter">$342.00</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-[#C4B5A0] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="The Planter by Rustic Roots"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 font-clash">The Planter by Rustic Roots</h3>
                <p className="text-gray-500 text-sm mb-1 font-inter">Rustic Roots</p>
                <p className="text-gray-600 font-medium font-inter">$55.00</p>
              </div>

              <div className="group cursor-pointer col-span-2 lg:col-span-1">
                <div className="aspect-[4/5] bg-[#C4B5A0] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="The Cylinder by Modern Botany"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 font-clash">The Cylinder by Modern Botany</h3>
                <p className="text-gray-500 text-sm mb-1 font-inter">Modern Botany</p>
                <p className="text-gray-600 font-medium font-inter">$35.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2 font-clash">New arrivals</h2>
              <p className="text-gray-600 font-inter">Our latest products are here. Check out what's new in store.</p>
            </div>
            <Link href="/shop" className="text-black font-medium hover:underline font-inter">
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "ZZ Plant", price: "$45.00" },
              { name: "Spray Bottle", price: "$15.00" },
              { name: "Snake Plant", price: "$38.00" },
              { name: "Succulent", price: "$22.00" },
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-[#C4B5A0] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 font-clash">{product.name}</h3>
                <p className="text-gray-600 font-medium font-inter">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
