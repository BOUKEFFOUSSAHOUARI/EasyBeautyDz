"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Copy } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CouponsPage() {
  const [showAddCoupon, setShowAddCoupon] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const coupons = [
    {
      id: 1,
      code: "WELCOME10",
      type: "Percentage",
      value: 10,
      minOrder: 50,
      maxUses: 100,
      used: 23,
      status: "Active",
      expiryDate: "2024-12-31",
    },
    {
      id: 2,
      code: "FREESHIP",
      type: "Free Shipping",
      value: 0,
      minOrder: 30,
      maxUses: 500,
      used: 156,
      status: "Active",
      expiryDate: "2024-06-30",
    },
    {
      id: 3,
      code: "SAVE20",
      type: "Fixed Amount",
      value: 20,
      minOrder: 100,
      maxUses: 50,
      used: 50,
      status: "Expired",
      expiryDate: "2024-01-15",
    },
    {
      id: 4,
      code: "NEWUSER",
      type: "Percentage",
      value: 15,
      minOrder: 0,
      maxUses: 200,
      used: 89,
      status: "Active",
      expiryDate: "2024-08-31",
    },
  ]

  const filteredCoupons = coupons.filter((coupon) => coupon.code.toLowerCase().includes(searchTerm.toLowerCase()))

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-clash">Coupons</h1>
          <p className="mt-2 text-gray-600 font-inter">Manage discount coupons and promotional codes</p>
        </div>
        <Dialog open={showAddCoupon} onOpenChange={setShowAddCoupon}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <div className="flex space-x-2">
                    <Input id="coupon-code" placeholder="Enter coupon code" className="flex-1" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById("coupon-code") as HTMLInputElement
                        if (input) input.value = generateCouponCode()
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coupon-type">Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="freeship">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <Input id="discount-value" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-order">Minimum Order ($)</Label>
                  <Input id="min-order" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-uses">Maximum Uses</Label>
                  <Input id="max-uses" type="number" placeholder="Unlimited" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" type="date" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddCoupon(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Add Coupon</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons ({filteredCoupons.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Min Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Usage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Expiry</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-medium text-gray-900">{coupon.code}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{coupon.type}</td>
                    <td className="py-4 px-4 text-gray-900">
                      {coupon.type === "Percentage"
                        ? `${coupon.value}%`
                        : coupon.type === "Fixed Amount"
                          ? `$${coupon.value}`
                          : "Free"}
                    </td>
                    <td className="py-4 px-4 text-gray-600">${coupon.minOrder}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {coupon.used}/{coupon.maxUses === 0 ? "∞" : coupon.maxUses}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={coupon.status === "Active" ? "default" : "destructive"}>{coupon.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{coupon.expiryDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
