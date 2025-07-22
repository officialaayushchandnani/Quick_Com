import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoginForm } from '@/components/auth/LoginForm';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, Product } from '@/contexts/CartContext';
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Clock,
  Star,
  Zap,
  Truck,
  Shield,
  MapPin,
  Filter,
  Plus,
  Heart,
  Settings,
  Package
} from 'lucide-react';

// Demo products
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Milk',
    price: 3.99,
    image: '/placeholder.svg',
    category: 'Dairy',
    description: 'Fresh organic milk from local farms',
    stock: 50,
    deliveryTime: '15 mins',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Brown Bread',
    price: 2.49,
    image: '/placeholder.svg',
    category: 'Bakery',
    description: 'Freshly baked whole wheat bread',
    stock: 30,
    deliveryTime: '10 mins',
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Bananas',
    price: 1.99,
    image: '/placeholder.svg',
    category: 'Fruits',
    description: 'Fresh organic bananas',
    stock: 75,
    deliveryTime: '12 mins',
    rating: 4.7,
    reviews: 156
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    price: 5.99,
    image: '/placeholder.svg',
    category: 'Dairy',
    description: 'Creamy Greek yogurt with probiotics',
    stock: 25,
    deliveryTime: '18 mins',
    rating: 4.9,
    reviews: 203
  },
  {
    id: '5',
    name: 'Tomatoes',
    price: 3.49,
    image: '/placeholder.svg',
    category: 'Vegetables',
    description: 'Fresh red tomatoes',
    stock: 40,
    deliveryTime: '14 mins',
    rating: 4.5,
    reviews: 78
  },
  {
    id: '6',
    name: 'Orange Juice',
    price: 4.99,
    image: '/placeholder.svg',
    category: 'Beverages',
    description: 'Fresh squeezed orange juice',
    stock: 20,
    deliveryTime: '16 mins',
    rating: 4.8,
    reviews: 91
  }
];

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'];

export default function Index() {
  const { user, logout } = useAuth();
  const { addToCart, getTotalItems } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(demoProducts);

  useEffect(() => {
    let filtered = demoProducts;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">QuickDash AI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Delivering to Downtown</span>
            </div>
            
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'customer' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative"
                    onClick={() => setShowCart(true)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                )}

                {user.role === 'admin' && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin">
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                )}

                {user.role === 'delivery_agent' && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/delivery">
                      <Package className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                )}

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowLogin(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-green/10 via-background to-brand-orange/10 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
            10-30 Minute Delivery
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered hyperlocal delivery of fresh groceries and essentials. Smart routing, demand prediction, and real-time tracking.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for products, categories..."
                className="h-14 pl-12 pr-4 text-lg rounded-xl border-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-green" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">10-30 min delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Smart Routing</h3>
                <p className="text-sm text-muted-foreground">AI-optimized delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">Fresh & verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {product.deliveryTime}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-brand-green">${product.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.stock} in stock
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                    disabled={!user}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {user ? 'Add to Cart' : 'Sign in to order'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </div>
  );
}
