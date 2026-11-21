"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MapPin,
  CreditCard,
  Package,
  LogOut,
  Check,
  Plus,
  Trash2,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Tab = "profile" | "orders" | "addresses" | "payment";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}
interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}
interface Address {
  id: string;
  label: string;
  name: string;
  line: string;
  city: string;
  phone: string;
}
interface Card {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  holder: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-2026-001",
    date: "April 10, 2026",
    total: 428,
    status: "Delivered",
    items: [
      { name: "CLUBMASTER AMBER", qty: 1, price: 219 },
      { name: "ROUND WIRE OPTICAL", qty: 1, price: 209 },
    ],
  },
  {
    id: "ORD-2026-002",
    date: "March 28, 2026",
    total: 189,
    status: "Shipped",
    items: [{ name: "SPORT WRAP PRO", qty: 1, price: 189 }],
  },
  {
    id: "ORD-2026-003",
    date: "February 14, 2026",
    total: 229,
    status: "Delivered",
    items: [{ name: "ROUND DOUBLE-BRIDGE", qty: 1, price: 229 }],
  },
  {
    id: "ORD-2025-014",
    date: "December 02, 2025",
    total: 199,
    status: "Delivered",
    items: [{ name: "TORTOISE CAT-EYE", qty: 1, price: 199 }],
  },
];

const statusColor = (status: string) =>
  status === "Delivered" ? "text-green-600" : "text-blue-600";

export default function Profile() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "a1",
      label: "Home",
      name: "John Doe",
      line: "House 12, Street 5, Sector G-13/1",
      city: "Islamabad",
      phone: "+92 300 1234567",
    },
    {
      id: "a2",
      label: "Office",
      name: "John Doe",
      line: "Suite 08, Apex Plaza, Blue Area",
      city: "Islamabad",
      phone: "+92 321 7654321",
    },
  ]);
  const [defaultAddress, setDefaultAddress] = useState("a1");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    name: "",
    line: "",
    city: "",
    phone: "",
  });
  const [cards, setCards] = useState<Card[]>([
    { id: "c1", brand: "Visa", last4: "4242", expiry: "08/28", holder: "John Doe" },
    { id: "c2", brand: "Mastercard", last4: "5588", expiry: "11/27", holder: "John Doe" },
  ]);
  const [defaultCard, setDefaultCard] = useState("c1");
  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({ holder: "", number: "", expiry: "" });

  const handleLogout = () => {
    router.push("/");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `a${Date.now()}`;
    setAddresses((prev) => [...prev, { id, ...newAddress }]);
    setNewAddress({ label: "", name: "", line: "", city: "", phone: "" });
    setShowAddressForm(false);
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (defaultAddress === id && next.length > 0) setDefaultAddress(next[0].id);
      return next;
    });
  };

  const addCard = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = newCard.number.replace(/\D/g, "");
    const id = `c${Date.now()}`;
    setCards((prev) => [
      ...prev,
      {
        id,
        brand: digits.startsWith("4") ? "Visa" : "Mastercard",
        last4: digits.slice(-4),
        expiry: newCard.expiry,
        holder: newCard.holder,
      },
    ]);
    setNewCard({ holder: "", number: "", expiry: "" });
    setShowCardForm(false);
  };

  const removeCard = (id: string) => {
    setCards((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (defaultCard === id && next.length > 0) setDefaultCard(next[0].id);
      return next;
    });
  };

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "profile", label: "Profile", icon: User },
    { key: "orders", label: "Orders", icon: Package },
    { key: "addresses", label: "Addresses", icon: MapPin },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const inputCls =
    "w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]";
  const labelCls = "block text-sm tracking-wider uppercase text-[#1D3557]/60 mb-2";

  const renderOrder = (order: Order) => {
    const open = expandedOrder === order.id;
    const count = order.items.reduce((n, i) => n + i.qty, 0);
    return (
      <div key={order.id} className="bg-[#E3F2FD]">
        <button
          type="button"
          onClick={() => setExpandedOrder(open ? null : order.id)}
          className="w-full p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left"
        >
          <div className="space-y-2">
            <h3 className="tracking-wider uppercase">{order.id}</h3>
            <p className="text-sm text-[#1D3557]/60">{order.date}</p>
            <p className="text-sm text-[#1D3557]/60">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right space-y-2">
              <p className="text-xl">${order.total}</p>
              <p className={`text-sm tracking-wider uppercase ${statusColor(order.status)}`}>
                {order.status}
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-[#1D3557]/10 space-y-2">
                {order.items.map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span className="uppercase tracking-wider">
                      {item.name} × {item.qty}
                    </span>
                    <span>${item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-5xl tracking-tight uppercase mb-4">My Account</h1>
        <p className="text-[#1D3557]/60 text-lg">Manage your profile and orders</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 space-y-2"
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${
                tab === key
                  ? "bg-black text-white"
                  : "bg-[#E3F2FD] hover:bg-[#1D3557]/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="tracking-wider uppercase text-sm">{label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 bg-[#E3F2FD] hover:bg-[#E74C3C] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="tracking-wider uppercase text-sm">Logout</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {tab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <form onSubmit={handleSave} className="space-y-6">
                  <h2 className="text-2xl tracking-tight uppercase">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls}>First Name</label>
                      <input
                        type="text"
                        required
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Last Name</label>
                      <input
                        type="text"
                        required
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelCls}>Email</label>
                      <input
                        type="email"
                        required
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 hover:bg-black/90 transition-colors inline-flex items-center gap-2"
                  >
                    {saved && <Check className="w-4 h-4" />}
                    <span className="tracking-wider uppercase text-sm">
                      {saved ? "Saved!" : "Save Changes"}
                    </span>
                  </button>
                </form>

                <div className="space-y-6">
                  <h2 className="text-2xl tracking-tight uppercase">Recent Orders</h2>
                  <div className="space-y-4">{initialOrders.slice(0, 2).map(renderOrder)}</div>
                  <button
                    type="button"
                    onClick={() => setTab("orders")}
                    className="inline-block text-sm tracking-wider uppercase underline hover:opacity-70 transition-opacity"
                  >
                    View All Orders
                  </button>
                </div>
              </motion.div>
            )}

            {tab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl tracking-tight uppercase">All Orders</h2>
                {initialOrders.length === 0 ? (
                  <div className="bg-[#E3F2FD] p-12 text-center space-y-4">
                    <ShoppingBag className="w-10 h-10 mx-auto text-[#1D3557]/40" />
                    <p>You have no orders yet.</p>
                    <Link href="/shop" className="underline text-sm uppercase tracking-wider">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">{initialOrders.map(renderOrder)}</div>
                )}
              </motion.div>
            )}

            {tab === "addresses" && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl tracking-tight uppercase">Saved Addresses</h2>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm((s) => !s)}
                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 text-sm tracking-wider uppercase hover:bg-black/90"
                  >
                    <Plus className="w-4 h-4" />
                    {showAddressForm ? "Cancel" : "Add Address"}
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={addAddress} className="bg-[#E3F2FD] p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(
                      [
                        ["label", "Label (Home, Office)"],
                        ["name", "Full Name"],
                        ["line", "Street Address"],
                        ["city", "City"],
                        ["phone", "Phone"],
                      ] as const
                    ).map(([field, placeholder]) => (
                      <input
                        key={field}
                        required
                        placeholder={placeholder}
                        value={newAddress[field]}
                        onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                        className="w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
                      />
                    ))}
                    <button
                      type="submit"
                      className="bg-[#E74C3C] text-white px-6 py-3 text-sm tracking-wider uppercase hover:bg-[#C0392B]"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                {addresses.length === 0 ? (
                  <p className="bg-[#E3F2FD] p-8 text-center text-[#1D3557]/70">
                    No saved addresses. Add one above.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((a) => (
                      <div key={a.id} className="bg-[#E3F2FD] p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="tracking-wider uppercase">{a.label}</h3>
                          {defaultAddress === a.id && (
                            <span className="text-xs bg-[#1D3557] text-white px-2 py-1 uppercase tracking-wider">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#1D3557]/70">
                          {a.name}
                          <br />
                          {a.line}
                          <br />
                          {a.city}
                          <br />
                          {a.phone}
                        </p>
                        <div className="flex items-center gap-4 pt-2 text-xs uppercase tracking-wider">
                          {defaultAddress !== a.id && (
                            <button
                              type="button"
                              onClick={() => setDefaultAddress(a.id)}
                              className="underline hover:opacity-70"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeAddress(a.id)}
                            className="inline-flex items-center gap-1 text-[#E74C3C] hover:opacity-70"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {tab === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl tracking-tight uppercase">Payment Methods</h2>
                  <button
                    type="button"
                    onClick={() => setShowCardForm((s) => !s)}
                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 text-sm tracking-wider uppercase hover:bg-black/90"
                  >
                    <Plus className="w-4 h-4" />
                    {showCardForm ? "Cancel" : "Add Card"}
                  </button>
                </div>

                {showCardForm && (
                  <form onSubmit={addCard} className="bg-[#E3F2FD] p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="Cardholder Name"
                      value={newCard.holder}
                      onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                      className="md:col-span-2 w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
                    />
                    <input
                      required
                      inputMode="numeric"
                      pattern="[0-9 ]{13,19}"
                      placeholder="Card Number"
                      value={newCard.number}
                      onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                      className="w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
                    />
                    <input
                      required
                      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                      className="w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
                    />
                    <button
                      type="submit"
                      className="bg-[#E74C3C] text-white px-6 py-3 text-sm tracking-wider uppercase hover:bg-[#C0392B]"
                    >
                      Save Card
                    </button>
                  </form>
                )}

                {cards.length === 0 ? (
                  <p className="bg-[#E3F2FD] p-8 text-center text-[#1D3557]/70">
                    No saved payment methods. Add a card above.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cards.map((c) => (
                      <div
                        key={c.id}
                        className="bg-[#E3F2FD] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-8 h-8" />
                          <div>
                            <p className="tracking-wider uppercase">
                              {c.brand} •••• {c.last4}
                            </p>
                            <p className="text-sm text-[#1D3557]/60">
                              {c.holder} · Expires {c.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs uppercase tracking-wider">
                          {defaultCard === c.id ? (
                            <span className="bg-[#1D3557] text-white px-2 py-1">Default</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDefaultCard(c.id)}
                              className="underline hover:opacity-70"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeCard(c.id)}
                            className="inline-flex items-center gap-1 text-[#E74C3C] hover:opacity-70"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
