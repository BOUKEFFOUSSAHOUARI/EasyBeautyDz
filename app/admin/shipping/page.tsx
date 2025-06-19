"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Wilaya {
  id: string
  name: string
  deliveryPrice: number
  agencyName: string
  wilaya_number: number
  createdAt: string
}

export default function ShippingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [wilayas, setWilayas] = useState<Wilaya[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [newWilaya, setNewWilaya] = useState({ name: "", deliveryPrice: "", agencyName: "", wilaya_number: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string>("")
  const [editingId, setEditingId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch wilayas
  useEffect(() => {
    fetchWilayas()
  }, [])

  const fetchWilayas = async () => {
    try {
      const response = await fetch('/api/main/wilayas')
      const data = await response.json()
      setWilayas(data.wilayas || [])
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load wilaya list",
        className: "text-red-600"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add new wilaya
  const handleAddWilaya = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/main/wilayas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWilaya.name,
          deliveryPrice: Number(newWilaya.deliveryPrice),
          agencyName: newWilaya.agencyName,
          wilaya_number: newWilaya.wilaya_number
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to add wilaya")
      }
      
      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Wilaya added successfully",
        className: "text-green-600"
      })
      setNewWilaya({ name: "", deliveryPrice: "", agencyName: "", wilaya_number: "" })
      setIsDialogOpen(false)
      fetchWilayas()
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

  // Delete wilaya
  const handleDeleteWilaya = async () => {
    if (!deleteId) return
    
    try {
      const response = await fetch(`/api/main/wilayas/${deleteId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete wilaya")
      }
      
      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Wilaya deleted successfully",
        className: "text-green-600"
      })
      setIsDeleteDialogOpen(false)
      fetchWilayas()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred"
      })
    }
  }

  // Add update wilaya function
  const handleUpdateWilaya = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`/api/main/wilayas/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWilaya.name,
          deliveryPrice: Number(newWilaya.deliveryPrice),
          agencyName: newWilaya.agencyName,
          wilaya_number: newWilaya.wilaya_number
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to update wilaya")
      }
      
      toast({
        variant: "success",
        title: "Success!",
        description: data.message || "Wilaya updated successfully",
        className: "text-green-600"
      })
      setNewWilaya({ name: "", deliveryPrice: "", agencyName: "", wilaya_number: "" })
      setIsEditDialogOpen(false)
      fetchWilayas()
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

  // Filter wilayas based on search
  const filteredWilayas = wilayas.filter(wilaya => 
    wilaya.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Shipping Management</h1>
          <p className="mt-2 text-gray-500">Manage shipping fees by wilaya</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md">
              <Plus className="mr-2 h-4 w-4" />
              Add Wilaya
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-gray-900">Add New Wilaya</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddWilaya} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <Input
                  value={newWilaya.name}
                  onChange={(e) => setNewWilaya(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter wilaya name"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Delivery Price (DA)</Label>
                <Input
                  type="number"
                  value={newWilaya.deliveryPrice}
                  onChange={(e) => setNewWilaya(prev => ({ ...prev, deliveryPrice: e.target.value }))}
                  placeholder="Enter delivery price"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Shipping Agency</Label>
                <Input
                  value={newWilaya.agencyName}
                  onChange={(e) => setNewWilaya(prev => ({ ...prev, agencyName: e.target.value }))}
                  placeholder="Enter shipping agency name"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Wilaya Number</Label>
                <Input
                  type="number"
                  value={newWilaya.wilaya_number}
                  onChange={e => setNewWilaya(prev => ({ ...prev, wilaya_number: e.target.value }))}
                  placeholder="Enter wilaya number"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Wilaya"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-gray-900">Update Wilaya</DialogTitle>
            </DialogHeader>              <form onSubmit={handleUpdateWilaya} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <Input
                  value={newWilaya.name}
                  onChange={(e) => setNewWilaya(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter wilaya name"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Delivery Price (DA)</Label>
                <Input
                  type="number"
                  value={newWilaya.deliveryPrice}
                  onChange={(e) => setNewWilaya(prev => ({ ...prev, deliveryPrice: e.target.value }))}
                  placeholder="Enter delivery price"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Shipping Agency</Label>
                <Input
                  value={newWilaya.agencyName}
                  onChange={(e) => setNewWilaya(prev => ({ ...prev, agencyName: e.target.value }))}
                  placeholder="Enter shipping agency name"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Wilaya Number</Label>
                <Input
                  type="number"
                  value={newWilaya.wilaya_number}
                  onChange={e => setNewWilaya(prev => ({ ...prev, wilaya_number: e.target.value }))}
                  placeholder="Enter wilaya number"
                  className="bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Wilaya"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search wilayas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-gray-200 text-gray-900 placeholder:text-gray-500"
        />
      </div>

      <Card className="rounded-lg border border-gray-100">
        <CardHeader className="py-4 px-6 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <CardTitle className="text-xl font-semibold text-gray-900">Wilayas</CardTitle>
              <span className="text-sm text-gray-500">({filteredWilayas.length} total)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          {isLoading ? (
            <div className="p-6 text-center text-sm text-gray-500 bg-white">Loading...</div>
          ) : filteredWilayas.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500 bg-white">
              {searchQuery ? "No wilayas found" : "No wilayas added yet"}
            </div>
          ) : (
            <div className="relative overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Wilaya</th>
                    <th className="px-6 py-3">Delivery Price</th>
                    <th className="px-6 py-3">Agency</th>
                    <th className="px-6 py-3 w-[100px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredWilayas.map((wilaya) => (
                    <tr key={wilaya.id} className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{wilaya.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {typeof wilaya.deliveryPrice === 'number' ? `${wilaya.deliveryPrice.toLocaleString()} DA` : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{wilaya.agencyName}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button
                          className="text-gray-700 hover:text-green-600 hover:bg-green-50 p-2 rounded-md transition-colors"
                          onClick={() => {
                              setEditingId(wilaya.id);
                              setNewWilaya({ 
                                name: wilaya.name,
                                deliveryPrice: wilaya.deliveryPrice.toString(),
                                agencyName: wilaya.agencyName,
                                wilaya_number: wilaya.wilaya_number?.toString() || ""
                              });
                              setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-700 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors"
                          onClick={() => {
                            setDeleteId(wilaya.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this wilaya and its shipping settings.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteWilaya}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
