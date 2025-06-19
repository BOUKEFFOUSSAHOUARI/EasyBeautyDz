"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface StockItemType {
  id: string
  title: string
  sku: string | null
  quantity: number | null
  isActivated: boolean
  updatedAt: string
}

export default function StockPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [stockItems, setStockItems] = useState<StockItemType[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [newQuantity, setNewQuantity] = useState<number | "">("")

  useEffect(() => {
    fetchStockItems()
  }, [page, searchTerm])

  const fetchStockItems = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/main/stock?page=${page}&limit=10&search=${searchTerm}`
      )
      const data = await response.json()
      if (response.ok) {
        setStockItems(data.products)
        setTotalPages(data.pagination.totalPages)
      } else {
        throw new Error(data.error || "Failed to load stock items")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateQuantity = async (id: string) => {
    if (newQuantity === "" || newQuantity < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Quantity",
        description: "Please enter a valid quantity."
      })
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch('/api/main/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity: newQuantity }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update quantity")
      }

      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Quantity updated successfully"
      })
      setEditingItemId(null)
      setNewQuantity("")
      fetchStockItems() // Re-fetch to get updated data
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const lowStockCount = stockItems.filter(item => (item.quantity !== null && item.quantity <= 5 && item.quantity > 0)).length
  const outOfStockCount = stockItems.filter(item => (item.quantity !== null && item.quantity === 0)).length

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
        <p className="mt-2 text-gray-500">Monitor and update product inventory</p>
      </div>

      {/* Stock Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stockItems.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Stock Levels ({stockItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6 text-center text-sm text-gray-500">Loading stock items...</div>
          ) : stockItems.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              {searchTerm ? "No matching stock items found" : "No stock items available"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stockItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{item.title}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.sku || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-900">
                        {editingItemId === item.id ? (
                          <Input
                            type="number"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(parseInt(e.target.value) || "")}
                            className="w-24 px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-300"
                          />
                        ) : (
                          item.quantity !== null ? item.quantity : 'N/A'
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            item.quantity !== null && item.quantity > 5
                              ? "bg-green-50 text-green-700 hover:bg-green-50"
                              : item.quantity !== null && item.quantity > 0 && item.quantity <= 5
                              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                              : "bg-red-50 text-red-700 hover:bg-red-50"
                          }
                        >
                          {item.quantity !== null && item.quantity > 5
                            ? "In Stock"
                            : item.quantity !== null && item.quantity > 0 && item.quantity <= 5
                            ? "Low Stock"
                            : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {editingItemId === item.id ? (
                          <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id)} disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => {
                              setEditingItemId(item.id)
                              setNewQuantity(item.quantity !== null ? item.quantity : "")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="py-2 px-4 text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
