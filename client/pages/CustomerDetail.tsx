import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShoppingCart,
  DollarSign,
  Package,
  Star,
  User,
  Edit,
  Ban,
} from "lucide-react";

// Demo customer data
const demoCustomers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@email.com",
    phone: "+91 98765 43210",
    orders: 24,
    totalSpent: 3250,
    joinDate: "2024-01-15",
    status: "Active",
    address: "123 Main Street, Satellite, Ahmedabad, Gujarat 380015",
    lastOrder: "2024-03-15",
    favoriteCategory: "Dairy",
    recentOrders: [
      { id: "ORD001", date: "2024-03-15", amount: 145, status: "Delivered" },
      { id: "ORD002", date: "2024-03-10", amount: 280, status: "Delivered" },
      { id: "ORD003", date: "2024-03-05", amount: 320, status: "Delivered" },
    ],
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@email.com",
    phone: "+91 98765 43211",
    orders: 18,
    totalSpent: 2890,
    joinDate: "2024-02-20",
    status: "Active",
    address: "456 Park Avenue, Vastrapur, Ahmedabad, Gujarat 380058",
    lastOrder: "2024-03-12",
    favoriteCategory: "Fruits",
    recentOrders: [
      { id: "ORD004", date: "2024-03-12", amount: 160, status: "Delivered" },
      { id: "ORD005", date: "2024-03-08", amount: 240, status: "Delivered" },
    ],
  },
  {
    id: "3",
    name: "Raj Kumar",
    email: "raj@email.com",
    phone: "+91 98765 43212",
    orders: 31,
    totalSpent: 4680,
    joinDate: "2023-11-10",
    status: "Active",
    address: "789 CG Road, Navrangpura, Ahmedabad, Gujarat 380009",
    lastOrder: "2024-03-14",
    favoriteCategory: "Vegetables",
    recentOrders: [
      { id: "ORD006", date: "2024-03-14", amount: 180, status: "Delivered" },
      { id: "ORD007", date: "2024-03-11", amount: 230, status: "Delivered" },
      { id: "ORD008", date: "2024-03-07", amount: 420, status: "Delivered" },
    ],
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+91 98765 43213",
    orders: 12,
    totalSpent: 1540,
    joinDate: "2024-03-05",
    status: "Active",
    address: "321 SG Highway, Makarba, Ahmedabad, Gujarat 380051",
    lastOrder: "2024-03-13",
    favoriteCategory: "Bakery",
    recentOrders: [
      { id: "ORD009", date: "2024-03-13", amount: 125, status: "Delivered" },
      { id: "ORD010", date: "2024-03-09", amount: 190, status: "Delivered" },
    ],
  },
  {
    id: "5",
    name: "Amit Shah",
    email: "amit@email.com",
    phone: "+91 98765 43214",
    orders: 45,
    totalSpent: 8940,
    joinDate: "2023-09-22",
    status: "VIP",
    address: "654 Prahlad Nagar, Satellite, Ahmedabad, Gujarat 380015",
    lastOrder: "2024-03-16",
    favoriteCategory: "Beverages",
    recentOrders: [
      { id: "ORD011", date: "2024-03-16", amount: 380, status: "Delivered" },
      { id: "ORD012", date: "2024-03-13", amount: 210, status: "Delivered" },
      { id: "ORD013", date: "2024-03-10", amount: 450, status: "Delivered" },
    ],
  },
];

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to view customer details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Go to Homepage</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const customer = demoCustomers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Customer Not Found</CardTitle>
            <CardDescription>
              The customer you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <h1 className="text-lg font-semibold">Customer Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Profile
                  </CardTitle>
                  <Badge
                    variant={
                      customer.status === "VIP" ? "default" : "secondary"
                    }
                  >
                    {customer.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center pb-4 border-b">
                  <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h2 className="text-xl font-semibold">{customer.name}</h2>
                  <p className="text-muted-foreground">
                    Customer ID: {customer.id}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{customer.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      Joined {new Date(customer.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Ban className="w-4 h-4 mr-2" />
                    Block
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customer Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <ShoppingCart className="w-5 h-5 mx-auto mb-2 text-brand-green" />
                    <p className="text-2xl font-bold">{customer.orders}</p>
                    <p className="text-xs text-muted-foreground">
                      Total Orders
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <DollarSign className="w-5 h-5 mx-auto mb-2 text-brand-orange" />
                    <p className="text-2xl font-bold">₹{customer.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Favorite Category:</span>
                    <Badge variant="outline">{customer.favoriteCategory}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Order:</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Order:</span>
                    <span className="text-sm font-medium">
                      ₹{(customer.totalSpent / customer.orders).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription>
                  Latest {customer.recentOrders.length} orders from this
                  customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.recentOrders.map((order, index) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.amount}</p>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            4.{5 - index}/5 rating
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Recent customer activity and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-green rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Order Delivered</p>
                      <p className="text-sm text-muted-foreground">
                        Order {customer.recentOrders[0]?.id} was successfully
                        delivered
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Payment Completed</p>
                      <p className="text-sm text-muted-foreground">
                        Customer completed payment for order{" "}
                        {customer.recentOrders[0]?.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        3 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-blue rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">
                        New order {customer.recentOrders[0]?.id} placed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
