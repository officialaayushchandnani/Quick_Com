import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Package,
  Users,
  TrendingUp,
  MapPin,
  Settings,
  BarChart3,
  ShoppingCart,
  Truck,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Building,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Star,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

// Demo data
const demoProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Milk",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    category: "Dairy",
    description: "Fresh organic milk from local farms",
    stock: 50,
    deliveryTime: "15 mins",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Brown Bread",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    category: "Bakery",
    description: "Freshly baked whole wheat bread",
    stock: 30,
    deliveryTime: "10 mins",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name: "Bananas",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop",
    category: "Fruits",
    description: "Fresh organic bananas",
    stock: 75,
    deliveryTime: "12 mins",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    name: "Greek Yogurt",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1571212515416-01d6ac76d4bf?w=400&h=300&fit=crop",
    category: "Dairy",
    description: "Creamy Greek yogurt with probiotics",
    stock: 25,
    deliveryTime: "18 mins",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "5",
    name: "Tomatoes",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    category: "Vegetables",
    description: "Fresh red tomatoes",
    stock: 40,
    deliveryTime: "14 mins",
    rating: 4.5,
    reviews: 78,
  },
  {
    id: "6",
    name: "Orange Juice",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
    category: "Beverages",
    description: "Fresh squeezed orange juice",
    stock: 20,
    deliveryTime: "16 mins",
    rating: 4.8,
    reviews: 91,
  },
];

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
  },
];

const ahmedabadZones = [
  {
    id: "1",
    name: "Satellite",
    area: "Satellite Road, Ahmedabad",
    deliveryTime: "10-20 mins",
    isActive: true,
    radius: "5 km",
    orders: 234,
  },
  {
    id: "2",
    name: "Vastrapur",
    area: "Vastrapur Lake Area, Ahmedabad",
    deliveryTime: "15-25 mins",
    isActive: true,
    radius: "4 km",
    orders: 189,
  },
  {
    id: "3",
    name: "CG Road",
    area: "C.G. Road, Navrangpura, Ahmedabad",
    deliveryTime: "12-22 mins",
    isActive: true,
    radius: "3 km",
    orders: 312,
  },
  {
    id: "4",
    name: "SG Highway",
    area: "S.G. Highway, Ahmedabad",
    deliveryTime: "15-30 mins",
    isActive: true,
    radius: "8 km",
    orders: 156,
  },
  {
    id: "5",
    name: "Maninagar",
    area: "Maninagar East, Ahmedabad",
    deliveryTime: "18-28 mins",
    isActive: true,
    radius: "6 km",
    orders: 98,
  },
  {
    id: "6",
    name: "Bopal",
    area: "Bopal, S.P. Ring Road, Ahmedabad",
    deliveryTime: "20-35 mins",
    isActive: false,
    radius: "7 km",
    orders: 45,
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddZoneOpen, setIsAddZoneOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Beverages",
    "Snacks",
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    deliveryTime: "",
    image: "",
  });

  const [newZone, setNewZone] = useState({
    name: "",
    area: "",
    deliveryTime: "",
    radius: "",
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access this page.
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      // Simulate image upload with a delay
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setNewProduct({ ...newProduct, image: imageUrl });
        setUploadingImage(false);
        toast.success("Image uploaded successfully!");
      }, 1500);
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    if (categories.includes(newCategoryName)) {
      toast.error("Category already exists");
      return;
    }

    setCategories([...categories, newCategoryName]);
    setNewCategoryName("");
    setIsAddCategoryOpen(false);
    toast.success("Category added successfully!");
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image:
        newProduct.image ||
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      category: newProduct.category,
      description: newProduct.description,
      stock: parseInt(newProduct.stock) || 0,
      deliveryTime: newProduct.deliveryTime || "15 mins",
      rating: 4.5,
      reviews: 0,
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      stock: "",
      deliveryTime: "",
      image: "",
    });
    setIsAddProductOpen(false);
    toast.success("Product added successfully!");
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p)),
    );
    setEditingProduct(null);
    toast.success("Product updated successfully!");
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast.success("Product deleted successfully!");
  };

  const handleAddZone = () => {
    if (!newZone.name || !newZone.area) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Delivery zone added successfully!");
    setNewZone({ name: "", area: "", deliveryTime: "", radius: "" });
    setIsAddZoneOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const availableCategories = categories.filter((cat) => cat !== "All");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard - QuickDash AI</h1>
          <div className="flex items-center gap-4">
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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="zones">Delivery Zones</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +{products.length - demoProducts.length} new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {demoCustomers.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    5 new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹12,456</div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">Order #{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">
                            Customer {i + 1}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹{(Math.random() * 500 + 100).toFixed(0)}
                          </p>
                          <p className="text-sm text-green-600">Delivered</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Zones Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ahmedabadZones.slice(0, 5).map((zone) => (
                      <div
                        key={zone.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {zone.orders} orders
                          </p>
                        </div>
                        <Badge
                          variant={zone.isActive ? "default" : "secondary"}
                        >
                          {zone.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <div className="flex gap-2">
                <Dialog
                  open={isAddCategoryOpen}
                  onOpenChange={setIsAddCategoryOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                      <DialogDescription>
                        Create a new product category
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="category-name">Category Name *</Label>
                        <Input
                          id="category-name"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="e.g., Organic Foods"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddCategory} className="flex-1">
                          Add Category
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddCategoryOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isAddProductOpen}
                  onOpenChange={setIsAddProductOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Fill in the product details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter product name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price (₹) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="image">Product Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              id="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={uploadingImage}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("image")?.click()
                              }
                              disabled={uploadingImage}
                              className="w-full"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {uploadingImage ? "Uploading..." : "Upload Image"}
                            </Button>
                          </div>
                          {newProduct.image && (
                            <div className="mt-2">
                              <img
                                src={newProduct.image}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryTime">Delivery Time</Label>
                        <Input
                          id="deliveryTime"
                          value={newProduct.deliveryTime}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              deliveryTime: e.target.value,
                            })
                          }
                          placeholder="15 mins"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              description: e.target.value,
                            })
                          }
                          placeholder="Product description..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddProduct} className="flex-1">
                          Add Product
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddProductOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Product Filters */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {product.name}
                        </CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-semibold">₹{product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span
                          className={
                            product.stock > 10
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {product.stock} units
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span>{product.deliveryTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Product Dialog */}
            {editingProduct && (
              <Dialog
                open={!!editingProduct}
                onOpenChange={() => setEditingProduct(null)}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Update product details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Product Name</Label>
                      <Input
                        id="edit-name"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        step="0.01"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-stock">Stock</Label>
                      <Input
                        id="edit-stock"
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateProduct} className="flex-1">
                        Update Product
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingProduct(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Customer Management</h2>
              <div className="text-sm text-muted-foreground">
                Total Customers: {demoCustomers.length}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>
                  View and manage customer information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoCustomers.map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{customer.name}</h4>
                            <Badge
                              variant={
                                customer.status === "VIP"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {customer.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                              <span>{customer.orders} orders</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span>₹{customer.totalSpent} spent</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>
                                Joined{" "}
                                {new Date(
                                  customer.joinDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/customer/${customer.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Zones Tab */}
          <TabsContent value="zones" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Delivery Zones - Ahmedabad</h2>
              <Dialog open={isAddZoneOpen} onOpenChange={setIsAddZoneOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Zone
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Delivery Zone</DialogTitle>
                    <DialogDescription>
                      Add a new delivery zone in Ahmedabad
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="zone-name">Zone Name *</Label>
                      <Input
                        id="zone-name"
                        value={newZone.name}
                        onChange={(e) =>
                          setNewZone({ ...newZone, name: e.target.value })
                        }
                        placeholder="e.g., Prahlad Nagar"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zone-area">Area Description *</Label>
                      <Input
                        id="zone-area"
                        value={newZone.area}
                        onChange={(e) =>
                          setNewZone({ ...newZone, area: e.target.value })
                        }
                        placeholder="e.g., Prahlad Nagar, S.G. Highway, Ahmedabad"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zone-delivery">Delivery Time</Label>
                      <Input
                        id="zone-delivery"
                        value={newZone.deliveryTime}
                        onChange={(e) =>
                          setNewZone({
                            ...newZone,
                            deliveryTime: e.target.value,
                          })
                        }
                        placeholder="e.g., 15-25 mins"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zone-radius">Coverage Radius</Label>
                      <Input
                        id="zone-radius"
                        value={newZone.radius}
                        onChange={(e) =>
                          setNewZone({ ...newZone, radius: e.target.value })
                        }
                        placeholder="e.g., 5 km"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddZone} className="flex-1">
                        Add Zone
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddZoneOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ahmedabadZones.map((zone) => (
                <Card key={zone.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{zone.name}</CardTitle>
                        <CardDescription>{zone.area}</CardDescription>
                      </div>
                      <Badge variant={zone.isActive ? "default" : "secondary"}>
                        {zone.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Delivery Time:</span>
                        <span>{zone.deliveryTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coverage:</span>
                        <span>{zone.radius}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orders:</span>
                        <span>{zone.orders}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        View Map
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
