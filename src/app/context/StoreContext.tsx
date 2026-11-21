"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, products as initialProducts } from "../data/products";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Store Manager" | "Optometrist" | "Support Specialist";
  status: "Active" | "Inactive";
  lastActive: string;
}

interface StoreContextType {
  products: Product[];
  orders: AdminOrder[];
  users: StaffUser[];
  toggleProductStock: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: AdminOrder["status"]) => void;
  addUser: (user: Omit<StaffUser, "id" | "lastActive">) => void;
  deleteUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;
}

const defaultOrders: AdminOrder[] = [
  {
    id: "ORD-2026-001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    date: "April 10, 2026",
    total: 428,
    status: "Delivered",
    items: [
      { id: "1", name: "CLUBMASTER AMBER", price: 219, qty: 1 },
      { id: "10", name: "ROUND WIRE OPTICAL", price: 209, qty: 1 },
    ],
  },
  {
    id: "ORD-2026-002",
    customerName: "Ayesha Khan",
    customerEmail: "ayesha.k@gmail.com",
    date: "March 28, 2026",
    total: 189,
    status: "Shipped",
    items: [{ id: "13", name: "SPORT WRAP PRO", price: 189, qty: 1 }],
  },
  {
    id: "ORD-2026-003",
    customerName: "Hamza Malik",
    customerEmail: "hamza.m@outlook.com",
    date: "March 22, 2026",
    total: 249,
    status: "Processing",
    items: [{ id: "12", name: "OVERSIZED TORTOISE GLAM", price: 249, qty: 1 }],
  },
  {
    id: "ORD-2026-004",
    customerName: "Sara Ahmed",
    customerEmail: "sara.ahmed@yahoo.com",
    date: "March 15, 2026",
    total: 209,
    status: "Pending",
    items: [{ id: "3", name: "CRYSTAL CAT-EYE", price: 209, qty: 1 }],
  },
];

const defaultUsers: StaffUser[] = [
  {
    id: "USR-01",
    name: "Hamza Noman",
    email: "hamza@braceoptics.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: "USR-02",
    name: "Dr. Bilal Saeed",
    email: "bilal.opt@braceoptics.com",
    role: "Optometrist",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "USR-03",
    name: "Zainab Raza",
    email: "zainab.ops@braceoptics.com",
    role: "Store Manager",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: "USR-04",
    name: "Tariq Mehmood",
    email: "support@braceoptics.com",
    role: "Support Specialist",
    status: "Inactive",
    lastActive: "3 days ago",
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [productsList, setProductsList] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("brace_products");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialProducts;
  });

  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("brace_orders");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return defaultOrders;
  });

  const [users, setUsers] = useState<StaffUser[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("brace_staff_users");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return defaultUsers;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("brace_products", JSON.stringify(productsList));
    } catch {
      // ignore
    }
  }, [productsList]);

  useEffect(() => {
    try {
      localStorage.setItem("brace_orders", JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("brace_staff_users", JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  const toggleProductStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const addProduct = (newProd: Omit<Product, "id">) => {
    const newId = String(Date.now());
    setProductsList((prev) => [{ ...newProd, id: newId }, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateOrderStatus = (orderId: string, status: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const addUser = (newUser: Omit<StaffUser, "id" | "lastActive">) => {
    const newId = `USR-${String(Date.now()).slice(-4)}`;
    setUsers((prev) => [
      ...prev,
      {
        ...newUser,
        id: newId,
        lastActive: "Just added",
      },
    ]);
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products: productsList,
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}

