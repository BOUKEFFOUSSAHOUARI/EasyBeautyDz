"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Search, Plus, Edit, Trash } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductType {
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
  isActivated: boolean
  sku?: string
  quantity?: number
  categoryId: string
  createdAt: string
  updatedAt: string
  productPriceForQty?: { qty: number; price: number }[]
}

interface CategoryType {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    sku: "",
    quantity: "",
    categoryId: "",
    isActivated: true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrlPreview, setImageUrlPreview] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string>("")
  const [editingId, setEditingId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [productPriceForQty, setProductPriceForQty] = useState<{ qty: string; price: string }[]>([])
  const [viewProduct, setViewProduct] = useState<ProductType | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [page, searchTerm])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/main/product?page=${page}&limit=10&search=${searchTerm}`)
      const data = await response.json()
      if (response.ok) {
        setProducts(data.products)
        setTotalPages(data.pagination.totalPages)
      } else {
        throw new Error(data.error || "Failed to load products")
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/main/categories') // Assuming you have a categories API
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories || [])
      } else {
        throw new Error(data.error || "Failed to load categories")
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load categories for product creation"
      })
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", newProduct.title)
      formData.append("description", newProduct.description)
      formData.append("price", newProduct.price)
      formData.append("sku", newProduct.sku)
      formData.append("quantity", newProduct.quantity)
      formData.append("categoryId", newProduct.categoryId)
      formData.append("isActivated", newProduct.isActivated.toString())
      console.log("Add Product - isActivated value being sent:", newProduct.isActivated)
      if (imageFile) {
        formData.append("imageFile", imageFile)
      }
      formData.append("productPriceForQty", JSON.stringify(productPriceForQty.filter(p => p.qty && p.price).map(p => ({ qty: Number(p.qty), price: Number(p.price) }))));

      const response = await fetch('/api/main/product', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product")
      }

      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Product added successfully"
      })
      setNewProduct({
        title: "",
        description: "",
        price: "",
        sku: "",
        quantity: "",
        categoryId: "",
        isActivated: true,
      })
      setProductPriceForQty([])
      setImageFile(null)
      setImageUrlPreview("")
      setIsDialogOpen(false)
      fetchProducts()
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

  const handleEditClick = (product: ProductType) => {
    setViewProduct(null);
    setEditingId(product.id)
    setNewProduct({
      title: product.title,
      description: product.description || "",
      price: product.price.toString(),
      sku: product.sku || "",
      quantity: product.quantity?.toString() || "",
      categoryId: product.categoryId,
      isActivated: product.isActivated,
    })
    setImageUrlPreview(product.imageUrl)
    setImageFile(null) // Clear selected file for edit, rely on preview
    setIsEditDialogOpen(true)
    setProductPriceForQty(product.productPriceForQty ? product.productPriceForQty.map(p => ({ qty: p.qty.toString(), price: p.price.toString() })) : [])
  }

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("sku", newProduct.sku);
      formData.append("quantity", newProduct.quantity);
      formData.append("categoryId", newProduct.categoryId);
      formData.append("isActivated", newProduct.isActivated.toString());
      console.log("Update Product - isActivated value being sent:", newProduct.isActivated);
      
      if (imageFile) {
        formData.append("imageFile", imageFile);
      } else if (imageUrlPreview === "") {
        // If image was explicitly cleared, send an empty string for imageUrl
        formData.append("imageUrl", "");
      } else {
        // If no new file is selected, and image wasn't cleared, send the existing URL
        formData.append("imageUrl", imageUrlPreview);
      }
      formData.append("productPriceForQty", JSON.stringify(productPriceForQty.filter(p => p.qty && p.price).map(p => ({ qty: Number(p.qty), price: Number(p.price) }))));

      const response = await fetch(`/api/main/product/${editingId}`, {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update product")
      }

      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Product updated successfully"
      })
      setNewProduct({
        title: "",
        description: "",
        price: "",
        sku: "",
        quantity: "",
        categoryId: "",
        isActivated: true,
      })
      setProductPriceForQty([])
      setImageFile(null)
      setImageUrlPreview("")
      setIsEditDialogOpen(false)
      fetchProducts()
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

  const handleDeleteProduct = async () => {
    if (!deleteId) return
    setIsLoading(true)
    try {
      const response = await fetch(`/api/main/product/${deleteId}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to delete product")

      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Product deleted successfully"
      })
      setIsDeleteDialogOpen(false)
      fetchProducts()
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

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Product Management</h1>
          <p className="mt-2 text-gray-500">Manage your product catalog</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-gray-900">Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Product Name</Label>
                  <Input
                    placeholder="Enter product name"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">SKU (Optional)</Label>
                  <Input
                    placeholder="Enter SKU"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct(f => ({ ...f, sku: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  placeholder="Enter product description"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Price (DA)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(f => ({ ...f, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Quantity</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct(f => ({ ...f, quantity: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <Select
                  value={newProduct.categoryId}
                  onValueChange={(value) => setNewProduct(f => ({ ...f, categoryId: value }))}
                  required
                >
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-black placeholder:text-gray-400">
                    <SelectValue placeholder="Select a category" className="text-black" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id} className="text-black">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Product Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0])
                      setImageUrlPreview(URL.createObjectURL(e.target.files[0]))
                    } else {
                      setImageFile(null);
                      setImageUrlPreview(""); // Clear preview if no file selected
                    }
                  }}
                />
                {imageUrlPreview && ( // Show preview only if imageUrlPreview exists
                  <div className="relative w-24 h-24 mt-2 border border-gray-200 rounded-lg overflow-hidden">
                    <Image src={imageUrlPreview} alt="Preview" layout="fill" objectFit="cover" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-white/70 hover:bg-white text-red-500 rounded-full"
                      onClick={() => {
                        setImageFile(null);
                        setImageUrlPreview("");
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Quantity-based Pricing</Label>
                {productPriceForQty.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center mb-2">
                    <Input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={e => setProductPriceForQty(arr => arr.map((el, i) => i === idx ? { ...el, qty: e.target.value } : el))}
                      className="w-24 bg-gray-50 text-black border border-gray-300 focus:ring-1 focus:ring-green-200 placeholder:text-gray-400"
                    />
                    <Input
                      type="number"
                      min="0"
                      placeholder="Price per one"
                      value={item.price}
                      onChange={e => setProductPriceForQty(arr => arr.map((el, i) => i === idx ? { ...el, price: e.target.value } : el))}
                      className="w-32 bg-gray-50 text-black border border-gray-300 focus:ring-1 focus:ring-green-200 placeholder:text-gray-400"
                    />
                    <Button type="button" variant="outline" onClick={() => setProductPriceForQty(arr => arr.filter((_, i) => i !== idx))} className="mt-1 bg-gray-50 text-black border border-gray-300 hover:bg-green-50">
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setProductPriceForQty(arr => [...arr, { qty: '', price: '' }])} className="mt-1 bg-gray-50 text-black border border-gray-300 hover:bg-green-50">
                  Add Qty/Price
                </Button>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="text-gray-700 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white sm:max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-gray-900">Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateProduct} className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Product Name</Label>
                  <Input
                    placeholder="Enter product name"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">SKU (Optional)</Label>
                  <Input
                    placeholder="Enter SKU"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct(f => ({ ...f, sku: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  placeholder="Enter product description"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Price (DA)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(f => ({ ...f, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Quantity</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct(f => ({ ...f, quantity: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <Select
                  value={newProduct.categoryId}
                  onValueChange={(value) => setNewProduct(f => ({ ...f, categoryId: value }))}
                  required
                >
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-black placeholder:text-gray-400">
                    <SelectValue placeholder="Select a category" className="text-black" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id} className="text-black">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Product Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0])
                      setImageUrlPreview(URL.createObjectURL(e.target.files[0]))
                    } else {
                      setImageFile(null);
                      setImageUrlPreview(""); // Clear preview if no file selected
                    }
                  }}
                />
                {imageUrlPreview && ( // Show preview only if imageUrlPreview exists
                  <div className="relative w-24 h-24 mt-2 border border-gray-200 rounded-lg overflow-hidden">
                    <Image src={imageUrlPreview} alt="Preview" layout="fill" objectFit="cover" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-white/70 hover:bg-white text-red-500 rounded-full"
                      onClick={() => {
                        setImageFile(null);
                        setImageUrlPreview("");
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Quantity-based Pricing</Label>
                {productPriceForQty.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center mb-2">
                    <Input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={e => setProductPriceForQty(arr => arr.map((el, i) => i === idx ? { ...el, qty: e.target.value } : el))}
                      className="w-24 bg-gray-50 text-black border border-gray-300 focus:ring-1 focus:ring-green-200 placeholder:text-gray-400"
                    />
                    <Input
                      type="number"
                      min="0"
                      placeholder="Price per one"
                      value={item.price}
                      onChange={e => setProductPriceForQty(arr => arr.map((el, i) => i === idx ? { ...el, price: e.target.value } : el))}
                      className="w-32 bg-gray-50 text-black border border-gray-300 focus:ring-1 focus:ring-green-200 placeholder:text-gray-400"
                    />
                    <Button type="button" variant="outline" onClick={() => setProductPriceForQty(arr => arr.filter((_, i) => i !== idx))} className="mt-1 bg-gray-50 text-black border border-gray-300 hover:bg-green-50">
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setProductPriceForQty(arr => [...arr, { qty: '', price: '' }])} className="mt-1 bg-gray-50 text-black border border-gray-300 hover:bg-green-50">
                  Add Qty/Price
                </Button>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="text-gray-700 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-500"
        />
      </div>

      {/* Products Table */}
      <Card className="rounded-lg border border-gray-100">
        <CardHeader className="py-4 px-6 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <CardTitle className="text-xl font-semibold text-gray-900">Products</CardTitle>
              <span className="text-sm text-gray-500">({products.length} total)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          {isLoading ? (
            <div className="p-6 text-center text-sm text-gray-500 bg-white">Loading...</div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500 bg-white">
              {searchTerm ? "No products found" : "No products added yet"}
            </div>
          ) : (
            <div className="relative overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">SKU</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="bg-white group cursor-pointer" onClick={e => {
                      if ((e.target as HTMLElement).closest('.action-btn')) return;
                      setViewProduct(product);
                    }}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <div className="flex items-center space-x-3">
                          {product.imageUrl && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                              <Image src={product.imageUrl} alt={product.title} layout="fill" objectFit="cover" />
                            </div>
                          )}
                          <span>{product.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{product.sku || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black group-hover:text-black">{product.price.toLocaleString()} DA</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black group-hover:text-black">{product.quantity !== undefined ? product.quantity : 'N/A'}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button
                          className="action-btn text-gray-700 hover:text-green-600 hover:bg-green-50 p-2 rounded-md transition-colors"
                          onClick={e => { e.stopPropagation(); handleEditClick(product); }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="action-btn text-gray-700 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors"
                          onClick={e => { e.stopPropagation(); setDeleteId(product.id); setIsDeleteDialogOpen(true); }}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Pagination */}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this product. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteProduct}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Product View Dialog */}
      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <button
            aria-label="Close"
            onClick={() => setViewProduct(null)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ×
          </button>
          {viewProduct && (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {viewProduct.imageUrl && (
                  <Image src={viewProduct.imageUrl} alt={viewProduct.title} width={80} height={80} className="rounded" />
                )}
                <div>
                  <div className="font-bold text-lg text-black">{viewProduct.title}</div>
                  <div className="text-gray-600">SKU: {viewProduct.sku || 'N/A'}</div>
                </div>
              </div>
              <div className="text-black">Description: {viewProduct.description}</div>
              <div className="text-black">Price: {viewProduct.price} DA</div>
              <div className="text-black">Quantity: {viewProduct.quantity}</div>
              {viewProduct.productPriceForQty && viewProduct.productPriceForQty.length > 0 && (
                <div>
                  <div className="font-semibold text-black mb-1">Quantity-based Pricing:</div>
                  <table className="w-full text-sm mt-2 border border-gray-200 rounded">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-black px-3 py-1 text-left">Qty</th>
                        <th className="text-black px-3 py-1 text-left">Price/one (DA)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewProduct.productPriceForQty.map((p, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="text-black px-3 py-1">{p.qty}</td>
                          <td className="text-black px-3 py-1">{p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
