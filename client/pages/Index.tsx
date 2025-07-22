import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoginForm } from '@/components/auth/LoginForm';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, Product } from '@/contexts/CartContext';
import { toast } from 'sonner';
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
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571212515416-01d6ac76d4bf?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
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
    toast.success(`${product.name} added to cart!`, {
      description: `You now have ${getTotalItems() + 1} items in your cart`,
      action: {
        label: "View Cart",
        onClick: () => setShowCart(true),
      },
    });
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
              <span>Delivering to Ahmedabad</span>
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

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">QuickDash AI</h3>
              </div>
              <p className="text-muted-foreground">
                AI-powered hyperlocal delivery platform bringing fresh groceries and essentials to your doorstep in 10-30 minutes.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Serving Downtown & Surrounding Areas</span>
              </div>
            </div>

            {/* For Customers */}
            <div className="space-y-4">
              <h4 className="font-semibold">For Customers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Track Your Order</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Delivery Areas</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing & Fees</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Customer Support</a></li>
              </ul>
            </div>

            {/* For Partners */}
            <div className="space-y-4">
              <h4 className="font-semibold">For Partners</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/delivery" className="hover:text-foreground transition-colors">
                    Become a Delivery Agent
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-foreground transition-colors">
                    Business Dashboard
                  </Link>
                </li>
                <li><a href="#" className="hover:text-foreground transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Merchant Resources</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Documentation</a></li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold">Support & Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Refund Policy</a></li>
              </ul>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">Download Our App</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    App Store
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; 2025 QuickDash AI. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Service Active</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      {/* Cart Drawer */}
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}
