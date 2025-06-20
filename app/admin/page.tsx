"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign } from "lucide-react"
import { useContext } from "react"
import { LanguageContext } from "./layout"

export default function AdminDashboard() {
  const { lang } = useContext(LanguageContext)

  const translations = {
    en: {
      dashboard: "Dashboard",
      welcome: "Welcome back! Here's what's happening with your store.",
      totalOrders: "Total Orders",
      totalProducts: "Total Products",
      inStock: "In Stock",
      totalRevenue: "Total Revenue",
      fromLastMonth: "from last month",
      recentOrders: "Recent Orders",
      lowStockAlert: "Low Stock Alert",
      left: "left",
      sku: "SKU",
      completed: "Completed",
      processing: "Processing",
      shipped: "Shipped",
      pending: "Pending",
    },
    ar: {
      dashboard: "لوحة التحكم",
      welcome: "مرحبًا بعودتك! إليك ما يحدث في متجرك.",
      totalOrders: "إجمالي الطلبات",
      totalProducts: "إجمالي المنتجات",
      inStock: "المخزون",
      totalRevenue: "إجمالي الإيرادات",
      fromLastMonth: "من الشهر الماضي",
      recentOrders: "الطلبات الأخيرة",
      lowStockAlert: "تنبيه انخفاض المخزون",
      left: "متبقي",
      sku: "رمز المنتج",
      completed: "مكتمل",
      processing: "قيد المعالجة",
      shipped: "تم الشحن",
      pending: "قيد الانتظار",
    },
    fr: {
      dashboard: "Tableau de bord",
      welcome: "Bon retour! Voici ce qui se passe dans votre magasin.",
      totalOrders: "Commandes totales",
      totalProducts: "Produits totaux",
      inStock: "En stock",
      totalRevenue: "Revenu total",
      fromLastMonth: "depuis le mois dernier",
      recentOrders: "Commandes récentes",
      lowStockAlert: "Alerte de stock faible",
      left: "restant",
      sku: "SKU",
      completed: "Terminé",
      processing: "En traitement",
      shipped: "Expédié",
      pending: "En attente",
    },
  } as const;
  type Lang = keyof typeof translations;
  const t = translations[lang as Lang] || translations.en

  const stats = [
    {
      title: t.totalOrders,
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: t.totalProducts,
      value: "89",
      change: "+3",
      trend: "up",
      icon: Package,
    },
    {
      title: t.inStock,
      value: "67",
      change: "-5",
      trend: "down",
      icon: Package,
    },
    {
      title: t.totalRevenue,
      value: "$45,231",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
    },
  ]

  const recentOrders = [
    { id: "#1234", customer: "John Doe", product: "Snake Plant", amount: "$38.00", status: t.completed },
    { id: "#1235", customer: "Jane Smith", product: "ZZ Plant", amount: "$45.00", status: t.processing },
    { id: "#1236", customer: "Bob Johnson", product: "Monstera", amount: "$65.00", status: t.shipped },
    { id: "#1237", customer: "Alice Brown", product: "Pothos", amount: "$28.00", status: t.pending },
  ]

  const lowStockProducts = [
    { name: "Snake Plant", stock: 3, sku: "SP-001" },
    { name: "Spray Bottle", stock: 1, sku: "SB-001" },
    { name: "Plant Food", stock: 2, sku: "PF-001" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t.dashboard}</h1>
        <p className="mt-2 text-gray-600">{t.welcome}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className="p-2 bg-green-50 rounded-full">
                  <Icon className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                  <span className="ml-1">{t.fromLastMonth}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">{t.recentOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.customer} • {order.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">{t.lowStockAlert}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.sku} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{t.sku}: {product.sku}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                      {product.stock} {t.left}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
