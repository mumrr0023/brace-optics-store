"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Search,
  Filter,
  ArrowUpRight,
  Shield,
  UserCheck,
  UserX,
  X,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useStore, AdminOrder, StaffUser } from "../context/StoreContext";
import { Product } from "../data/products";

type AdminTab = "overview" | "inventory" | "orders" | "users";

export default function AdminPage() {
  const {
    products,
    orders,
    users,
    toggleProductStock,
    updateProductPrice,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    addUser,
    deleteUser,
    toggleUserStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceValue, setEditingPriceValue] = useState<number>(0);

  // New product form
  const [newProd, setNewProd] = useState({
    name: "",
    price: 199,
    category: "Sunglasses",
    image: "/images/products/glasses-1.jpeg",
    hoverImage: "/images/products/wearing-1.jpeg",
    description: "Premium handcrafted optics engineered with precision acetate.",
    features: "UV400 Protection, Acetate Frame, Polarized, Ergonomic Fit",
    inStock: true,
  });

  // New user form
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: StaffUser["role"];
    status: StaffUser["status"];
  }>({
    name: "",
    email: "",
    role: "Store Manager",
    status: "Active",
  });

  // Calculations for KPI Cards
  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => (o.status !== "Cancelled" ? sum + o.total : sum), 0),
    [orders]
  );
  const inStockCount = useMemo(() => products.filter((p) => p.inStock).length, [products]);
  const outOfStockCount = useMemo(() => products.filter((p) => !p.inStock).length, [products]);
  const pendingOrdersCount = useMemo(
    () => orders.filter((o) => o.status === "Pending" || o.status === "Processing").length,
    [orders]
  );

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.includes(q)
    );
  }, [products, productSearch]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    const q = orderSearch.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
    );
  }, [orders, orderSearch]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, userSearch]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProd.name.toUpperCase(),
      price: Number(newProd.price),
      category: newProd.category,
      image: newProd.image,
      hoverImage: newProd.hoverImage,
      description: newProd.description,
      features: newProd.features.split(",").map((s) => s.trim()),
      inStock: newProd.inStock,
    });
    setShowAddProductModal(false);
    setNewProd({
      name: "",
      price: 199,
      category: "Sunglasses",
      image: "/images/products/glasses-1.jpeg",
      hoverImage: "/images/products/wearing-1.jpeg",
      description: "Premium handcrafted optics engineered with precision acetate.",
      features: "UV400 Protection, Acetate Frame, Polarized, Ergonomic Fit",
      inStock: true,
    });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
    });
    setShowAddUserModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "Store Manager",
      status: "Active",
    });
  };

  const handleSavePrice = (id: string) => {
    if (editingPriceValue > 0) {
      updateProductPrice(id, editingPriceValue);
    }
    setEditingPriceId(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1D3557]">
      {/* Top Header Bar */}
      <div className="bg-[#1D3557] text-white px-8 py-5 border-b border-white/10 sticky top-20 z-30">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#E74C3C] text-white flex items-center justify-center font-bold text-lg">
              BO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight uppercase">
                  Staff Admin & Operations Portal
                </h1>
                <span className="text-[10px] bg-[#E74C3C] text-white uppercase px-2 py-0.5 tracking-widest font-semibold">
                  Live
                </span>
              </div>
              <p className="text-xs text-white/60">
                BRACE Optics Management System • Real-Time Store Sync Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white hover:text-[#1D3557] text-xs uppercase tracking-wider transition-colors"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1D3557]/10 pb-4 mb-8">
          {[
            { key: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
            { key: "inventory", label: "Inventory & Frames", icon: Package },
            { key: "orders", label: "Customer Orders", icon: ShoppingBag },
            { key: "users", label: "Staff & Role Access", icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as AdminTab)}
              className={`inline-flex items-center gap-2.5 px-5 py-3 text-xs tracking-wider uppercase font-medium transition-all ${
                activeTab === key
                  ? "bg-[#1D3557] text-white shadow-sm"
                  : "bg-white text-[#1D3557] border border-[#1D3557]/10 hover:bg-[#E3F2FD]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#1D3557]/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#1D3557]/60">
                  <span className="text-xs uppercase tracking-wider font-semibold">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-[#E74C3C]" />
                </div>
                <p className="text-3xl font-bold text-[#1D3557]">${totalRevenue}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
                </p>
              </div>

              <div className="bg-white p-6 border border-[#1D3557]/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#1D3557]/60">
                  <span className="text-xs uppercase tracking-wider font-semibold">Total Inventory</span>
                  <Package className="w-5 h-5 text-[#1D3557]" />
                </div>
                <p className="text-3xl font-bold text-[#1D3557]">{products.length} Models</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-700 font-medium">{inStockCount} In Stock</span>
                  <span>•</span>
                  <span className="text-[#E74C3C] font-medium">{outOfStockCount} Out of Stock</span>
                </div>
              </div>

              <div className="bg-white p-6 border border-[#1D3557]/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#1D3557]/60">
                  <span className="text-xs uppercase tracking-wider font-semibold">Pending Fulfillment</span>
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-[#1D3557]">{pendingOrdersCount} Orders</p>
                <p className="text-xs text-[#1D3557]/60">Requires lens lab or shipping action</p>
              </div>

              <div className="bg-white p-6 border border-[#1D3557]/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[#1D3557]/60">
                  <span className="text-xs uppercase tracking-wider font-semibold">Staff & Optometrists</span>
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-[#1D3557]">{users.length} Active Accounts</p>
                <p className="text-xs text-emerald-600">All security credentials verified</p>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Recent Orders Quick Snapshot */}
              <div className="lg:col-span-2 bg-white border border-[#1D3557]/10 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold tracking-wider uppercase">Recent Customer Orders</h3>
                    <p className="text-xs text-[#1D3557]/60">Latest transactions requiring fulfillment</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs uppercase tracking-wider text-[#E74C3C] hover:underline flex items-center gap-1"
                  >
                    <span>View All Orders</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="divide-y divide-[#1D3557]/10">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{order.id}</span>
                          <span className="text-xs text-[#1D3557]/50">• {order.date}</span>
                        </div>
                        <p className="text-xs text-[#1D3557]/70">
                          {order.customerName} ({order.customerEmail})
                        </p>
                        <p className="text-xs font-medium text-[#1D3557]/90">
                          {order.items.map((i) => `${i.name} (x${i.qty})`).join(", ")}
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-sm font-bold">${order.total}</p>
                        <span
                          className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 font-semibold ${
                            order.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Out of stock status and quick links */}
              <div className="space-y-6">
                <div className="bg-white border border-[#1D3557]/10 p-6 space-y-4">
                  <h3 className="text-base font-semibold tracking-wider uppercase">
                    Stock Alerts ({outOfStockCount})
                  </h3>
                  <p className="text-xs text-[#1D3557]/60 leading-relaxed">
                    Products marked as &ldquo;Out of Stock&rdquo; automatically trigger instant warning banners in the
                    storefront search bar and disable customer add-to-cart.
                  </p>

                  <div className="space-y-2 pt-2">
                    {products
                      .filter((p) => !p.inStock)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 bg-[#E74C3C]/10 border border-[#E74C3C]/30 text-xs"
                        >
                          <span className="font-semibold">{p.name}</span>
                          <button
                            onClick={() => toggleProductStock(p.id)}
                            className="text-[#E74C3C] hover:underline font-semibold uppercase text-[10px]"
                          >
                            Restock Now
                          </button>
                        </div>
                      ))}
                    {outOfStockCount === 0 && (
                      <div className="p-4 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>All {products.length} eyewear designs are currently in stock!</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#1D3557] text-white p-6 space-y-4">
                  <h4 className="text-xs tracking-[0.2em] uppercase text-[#E74C3C] font-semibold">
                    Admin Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveTab("inventory");
                        setShowAddProductModal(true);
                      }}
                      className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white hover:text-[#1D3557] text-xs uppercase tracking-wider transition-colors flex items-center justify-between"
                    >
                      <span>+ Add New Eyewear Model</span>
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("users");
                        setShowAddUserModal(true);
                      }}
                      className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white hover:text-[#1D3557] text-xs uppercase tracking-wider transition-colors flex items-center justify-between"
                    >
                      <span>+ Provision New Manager/Admin</span>
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & PRODUCTS */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#1D3557]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inventory by frame name or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#1D3557]/15 text-xs focus:outline-none focus:border-[#E74C3C]"
                />
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E74C3C] hover:bg-[#C0392B] text-white text-xs uppercase tracking-wider transition-colors font-medium self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Eyewear Frame</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white border border-[#1D3557]/10 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#E3F2FD]/60 uppercase text-[#1D3557]/70 border-b border-[#1D3557]/10 tracking-wider">
                  <tr>
                    <th className="p-4">Frame</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4">Key Features</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D3557]/10">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover bg-[#E3F2FD] border border-[#1D3557]/10 flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-sm text-[#1D3557]">{product.name}</p>
                            <p className="text-[10px] text-[#1D3557]/50">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-[#E3F2FD] text-[#1D3557] uppercase text-[10px] tracking-wider font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4">
                        {editingPriceId === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <span>$</span>
                            <input
                              type="number"
                              value={editingPriceValue}
                              onChange={(e) => setEditingPriceValue(Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-[#1D3557]/20 text-xs"
                            />
                            <button
                              onClick={() => handleSavePrice(product.id)}
                              className="px-2 py-1 bg-emerald-600 text-white text-[10px] uppercase font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="px-1.5 py-1 text-slate-500 hover:text-slate-800"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">${product.price}</span>
                            <button
                              onClick={() => {
                                setEditingPriceId(product.id);
                                setEditingPriceValue(product.price);
                              }}
                              className="text-slate-400 hover:text-[#1D3557]"
                              title="Edit price"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleProductStock(product.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                            product.inStock
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-[#E74C3C] text-white hover:bg-[#C0392B]"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-emerald-600" : "bg-white"}`} />
                          <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                        </button>
                      </td>
                      <td className="p-4 max-w-xs text-[#1D3557]/70 truncate">
                        {product.features?.join(", ") || "Standard UV400"}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            target="_blank"
                            className="p-1.5 text-slate-500 hover:text-[#1D3557] hover:bg-slate-100"
                            title="Preview on Store"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove frame "${product.name}"?`)) {
                                deleteProduct(product.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-[#E74C3C] hover:bg-red-50"
                            title="Delete Frame"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No frames match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#1D3557]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders by ID, client name, or email..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#1D3557]/15 text-xs focus:outline-none focus:border-[#E74C3C]"
                />
              </div>

              <div className="text-xs text-[#1D3557]/60">
                Total Orders: <strong className="text-[#1D3557]">{orders.length}</strong>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-[#1D3557]/10 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#E3F2FD]/60 uppercase text-[#1D3557]/70 border-b border-[#1D3557]/10 tracking-wider">
                  <tr>
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Ordered Items</th>
                    <th className="p-4">Order Total</th>
                    <th className="p-4">Status & Progression</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D3557]/10">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <span className="font-semibold text-sm text-[#1D3557]">{order.id}</span>
                        <p className="text-[10px] text-[#1D3557]/50 mt-0.5">{order.date}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-[#1D3557]">{order.customerName}</p>
                        <p className="text-[11px] text-[#1D3557]/60">{order.customerEmail}</p>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-xs">
                              <span className="font-semibold">{item.name}</span>
                              <span className="text-slate-500 text-[11px]"> (Qty: {item.qty} • ${item.price})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-sm text-[#1D3557]">
                        ${order.total}
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as AdminOrder["status"])}
                          className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1.5 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1D3557] ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-800"
                              : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-800"
                              : order.status === "Cancelled"
                              ? "bg-rose-50 text-rose-800"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        No orders match your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: USERS & ROLES */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#1D3557]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search staff members by name, email, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#1D3557]/15 text-xs focus:outline-none focus:border-[#E74C3C]"
                />
              </div>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D3557] hover:bg-[#E74C3C] text-white text-xs uppercase tracking-wider transition-colors font-medium self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Provision New Staff Account</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-[#1D3557]/10 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#E3F2FD]/60 uppercase text-[#1D3557]/70 border-b border-[#1D3557]/10 tracking-wider">
                  <tr>
                    <th className="p-4">Staff Member</th>
                    <th className="p-4">Assigned Role</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D3557]/10">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1D3557] text-white flex items-center justify-center font-bold text-xs uppercase">
                            {user.name.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#1D3557]">{user.name}</p>
                            <p className="text-[11px] text-[#1D3557]/60">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold ${
                            user.role === "Super Admin"
                              ? "bg-purple-100 text-purple-900 border border-purple-300"
                              : user.role === "Store Manager"
                              ? "bg-blue-100 text-blue-900 border border-blue-300"
                              : user.role === "Optometrist"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold ${
                            user.status === "Active"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          {user.status === "Active" ? (
                            <UserCheck className="w-3.5 h-3.5" />
                          ) : (
                            <UserX className="w-3.5 h-3.5" />
                          )}
                          <span>{user.status}</span>
                        </button>
                      </td>
                      <td className="p-4 text-slate-500">{user.lastActive}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove staff access for ${user.name}?`)) {
                              deleteUser(user.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-[#E74C3C] hover:bg-red-50"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD PRODUCT */}
      <AnimatePresence>
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-xl p-8 border border-[#1D3557]/20 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1D3557]">
                  Add New Eyewear Frame
                </h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Frame Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TITANIUM EDGE GOLD"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                    >
                      <option value="Sunglasses">Sunglasses</option>
                      <option value="Optical">Optical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Frame Image Path
                  </label>
                  <input
                    type="text"
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Model Wearing Image (Hover)
                  </label>
                  <input
                    type="text"
                    value={newProd.hoverImage}
                    onChange={(e) => setNewProd({ ...newProd, hoverImage: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Key Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newProd.features}
                    onChange={(e) => setNewProd({ ...newProd, features: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="stockCheck"
                    checked={newProd.inStock}
                    onChange={(e) => setNewProd({ ...newProd, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#E74C3C]"
                  />
                  <label htmlFor="stockCheck" className="text-xs font-semibold text-slate-700 uppercase">
                    Immediately In Stock
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#E74C3C] text-white hover:bg-[#C0392B] uppercase tracking-wider text-xs font-semibold"
                  >
                    Save & Publish to Store
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD USER */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md p-8 border border-[#1D3557]/20 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#1D3557]">
                  Provision Staff Account
                </h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Farooq"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#1D3557]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Staff Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maria@braceoptics.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#1D3557]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Role & Permission Level *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value as StaffUser["role"] })
                    }
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#1D3557]"
                  >
                    <option value="Super Admin">Super Admin (Full Access)</option>
                    <option value="Store Manager">Store Manager (Products & Orders)</option>
                    <option value="Optometrist">Optometrist (Prescriptions & Lab)</option>
                    <option value="Support Specialist">Support Specialist (Order Status)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-700 mb-1">
                    Account Status
                  </label>
                  <select
                    value={newUser.status}
                    onChange={(e) =>
                      setNewUser({ ...newUser, status: e.target.value as StaffUser["status"] })
                    }
                    className="w-full px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-[#1D3557]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1D3557] text-white hover:bg-[#E74C3C] uppercase tracking-wider text-xs font-semibold transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

