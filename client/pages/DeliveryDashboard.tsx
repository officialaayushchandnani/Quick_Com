import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  Package,
  Navigation,
  CheckCircle,
  DollarSign,
  Route,
  Phone,
  User,
  Mail,
  Home,
  ExternalLink,
  Check,
  X,
  Truck,
  PackageCheck,
  ThumbsUp,
} from "lucide-react";

// Demo delivery data
const activeDeliveries = [
  {
    id: "ORD001",
    customer: {
      name: "John Smith",
      phone: "+91 98765 43210",
      email: "john@email.com",
      address: "123 Main Street, Satellite, Ahmedabad, Gujarat 380015",
      coordinates: { lat: 23.0396, lng: 72.5662 },
    },
    items: ["Fresh Milk", "Brown Bread", "Bananas"],
    amount: 190,
    expectedEarnings: 35,
    status: "Picked Up",
    estimatedTime: "15 mins",
    specialInstructions: "Ring the doorbell twice",
  },
  {
    id: "ORD002",
    customer: {
      name: "Priya Patel",
      phone: "+91 98765 43211",
      email: "priya@email.com",
      address: "456 Park Avenue, Vastrapur, Ahmedabad, Gujarat 380058",
      coordinates: { lat: 23.0403, lng: 72.5323 },
    },
    items: ["Greek Yogurt", "Tomatoes"],
    amount: 210,
    expectedEarnings: 40,
    status: "Assigned",
    estimatedTime: "20 mins",
    specialInstructions: "Call before delivery",
  },
  {
    id: "ORD003",
    customer: {
      name: "Raj Kumar",
      phone: "+91 98765 43212",
      email: "raj@email.com",
      address: "789 CG Road, Navrangpura, Ahmedabad, Gujarat 380009",
      coordinates: { lat: 23.0325, lng: 72.5581 },
    },
    items: ["Orange Juice", "Fresh Milk"],
    amount: 185,
    expectedEarnings: 32,
    status: "Assigned",
    estimatedTime: "25 mins",
    specialInstructions: "Leave at gate if no one answers",
  },
];

export default function DeliveryDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState(activeDeliveries);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(1560);
  const [completedDeliveries, setCompletedDeliveries] = useState(8);
  const [recentCompletions, setRecentCompletions] = useState([
    { id: 'ORD010', date: new Date(Date.now() - 1000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), amount: 280, time: '12' },
    { id: 'ORD009', date: new Date(Date.now() - 2000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), amount: 350, time: '15' },
    { id: 'ORD008', date: new Date(Date.now() - 3000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), amount: 420, time: '18' },
    { id: 'ORD007', date: new Date(Date.now() - 4000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), amount: 190, time: '10' },
    { id: 'ORD006', date: new Date(Date.now() - 5000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), amount: 320, time: '22' }
  ]);

  const handleNavigate = (delivery: any) => {
    const { address, coordinates } = delivery.customer;

    // Try to open Google Maps with navigation
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&travelmode=driving`;

    // Try to open in Google Maps app first, fallback to web
    const mapsAppUrl = `google.navigation:q=${coordinates.lat},${coordinates.lng}`;

    try {
      // For mobile devices, try to open the Maps app
      if (
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        window.location.href = mapsAppUrl;
        // Fallback to web version if app doesn't open
        setTimeout(() => {
          window.open(googleMapsUrl, "_blank");
        }, 2000);
      } else {
        // For desktop, open in new tab
        window.open(googleMapsUrl, "_blank");
      }

      toast.success("Opening navigation to customer location");
    } catch (error) {
      toast.error(
        "Could not open navigation. Please use your preferred maps app.",
      );
    }
  };

  const handleCallCustomer = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleViewCustomerDetails = (delivery: any) => {
    setSelectedDelivery(delivery);
    setShowCustomerDetails(true);
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'Accepted' }
        : order
    ));
    toast.success('Order accepted successfully!');
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'Rejected' }
        : order
    ));
    toast.error('Order rejected');
  };

  const handleMarkPickup = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'Picked Up' }
        : order
    ));
    toast.success('Order marked as picked up!');
  };

  const handleMarkDelivered = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Update order status
      setOrders(orders.map(o =>
        o.id === orderId
          ? { ...o, status: 'Delivered', completedAt: new Date() }
          : o
      ));

      // Update earnings and delivery count
      setTodayEarnings(prev => prev + order.expectedEarnings);
      setCompletedDeliveries(prev => prev + 1);

      // Add to recent completions
      const newCompletion = {
        id: order.id,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        amount: order.expectedEarnings,
        time: Math.floor(Math.random() * 10 + 10).toString() // Random delivery time for demo
      };
      setRecentCompletions(prev => [newCompletion, ...prev.slice(0, 4)]);

      toast.success(`Order delivered! Earned ₹${order.expectedEarnings}`);
    }
  };

  if (!user || user.role !== "delivery_agent") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need delivery agent credentials to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => (window.location.href = "/")}>
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Delivery Agent - QuickDash AI</h1>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="text-green-600 border-green-600"
            >
              Online
            </Badge>
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Deliveries
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedDeliveries + orders.filter(o => o.status !== 'Delivered' && o.status !== 'Rejected').length}</div>
              <p className="text-xs text-muted-foreground">
                {completedDeliveries} completed, {orders.filter(o => o.status !== 'Delivered' && o.status !== 'Rejected').length} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{todayEarnings}</div>
              <p className="text-xs text-muted-foreground">
                +₹280 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 min</div>
              <p className="text-xs text-muted-foreground">
                2 min faster than avg
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>
                Your current delivery assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((delivery, i) => (
                  <div key={delivery.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{delivery.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          Customer: {delivery.customer.name}
                        </p>
                      </div>
                      <Badge
                        variant={
                          delivery.status === "Delivered" ? "default" :
                          delivery.status === "Picked Up" ? "default" :
                          delivery.status === "Accepted" ? "outline" :
                          delivery.status === "Rejected" ? "destructive" :
                          "secondary"
                        }
                      >
                        {delivery.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {delivery.customer.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        ETA: {delivery.estimatedTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {delivery.items.join(", ")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-brand-green" />
                        <span className="text-sm font-medium text-brand-green">
                          Expected: ₹{delivery.expectedEarnings}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Order: ₹{delivery.amount}
                      </span>
                    </div>

                    {/* Action Buttons Based on Status */}
                    <div className="space-y-2">
                      {delivery.status === "Assigned" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleAcceptOrder(delivery.id)}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Accept Order
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectOrder(delivery.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {delivery.status === "Accepted" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleMarkPickup(delivery.id)}
                          >
                            <PackageCheck className="w-4 h-4 mr-2" />
                            Mark as Picked Up
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNavigate(delivery)}
                          >
                            <Navigation className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {delivery.status === "Picked Up" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleMarkDelivered(delivery.id)}
                          >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Mark as Delivered
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNavigate(delivery)}
                          >
                            <Navigation className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {delivery.status === "Delivered" && (
                        <div className="flex justify-center">
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </Badge>
                        </div>
                      )}

                      {delivery.status === "Rejected" && (
                        <div className="flex justify-center">
                          <Badge variant="destructive">
                            <X className="w-4 h-4 mr-2" />
                            Rejected
                          </Badge>
                        </div>
                      )}

                      {/* Common Actions */}
                      {delivery.status !== "Delivered" && delivery.status !== "Rejected" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCallCustomer(delivery.customer.phone)}
                            className="flex-1"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewCustomerDetails(delivery)}
                            className="flex-1"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Completions</CardTitle>
              <CardDescription>
                Your recently completed deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCompletions.map((completion, i) => (
                  <div key={completion.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">{completion.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {completion.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹{completion.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {completion.time} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center p-8 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Delivery Agent Portal - Coming Soon
          </h3>
          <p className="text-muted-foreground mb-4">
            Full delivery management including real-time GPS navigation, order
            status updates, customer communication, earnings tracking, and route
            optimization will be available here.
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Return to Homepage
          </Button>
        </div>
      </div>

      {/* Customer Details Dialog */}
      {selectedDelivery && (
        <Dialog
          open={showCustomerDetails}
          onOpenChange={setShowCustomerDetails}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Customer Details - {selectedDelivery.id}
              </DialogTitle>
              <DialogDescription>
                Complete customer information for this delivery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="w-5 h-5 text-brand-green" />
                <div>
                  <p className="font-medium">
                    {selectedDelivery.customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {selectedDelivery.customer.phone}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleCallCustomer(selectedDelivery.customer.phone)
                    }
                    className="ml-auto"
                  >
                    Call
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {selectedDelivery.customer.email}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">
                    {selectedDelivery.customer.address}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Order Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Items:</span>
                    <span className="text-sm font-medium">
                      {selectedDelivery.items.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Amount:</span>
                    <span className="text-sm font-medium">
                      ₹{selectedDelivery.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge
                      variant={
                        selectedDelivery.status === "Delivered" ? "default" :
                        selectedDelivery.status === "Picked Up" ? "default" :
                        selectedDelivery.status === "Accepted" ? "outline" :
                        selectedDelivery.status === "Rejected" ? "destructive" :
                        "secondary"
                      }
                    >
                      {selectedDelivery.status}
                    </Badge>
                  </div>
                  {selectedDelivery.specialInstructions && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium">
                        Special Instructions:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedDelivery.specialInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => handleNavigate(selectedDelivery)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate to Customer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCustomerDetails(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
