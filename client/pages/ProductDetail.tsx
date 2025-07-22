import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Package, 
  Truck, 
  Shield, 
  Plus,
  Minus,
  Heart,
  Share2
} from 'lucide-react';

// Demo products data (should match the ones in Index.tsx)
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Milk',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
    category: 'Dairy',
    description: 'Fresh organic milk from local farms. Rich in calcium and protein, perfect for your daily nutrition needs.',
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
    description: 'Freshly baked whole wheat bread. Made with premium ingredients and baked fresh daily.',
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
    description: 'Fresh organic bananas. High in potassium and natural sugars, perfect for a healthy snack.',
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
    description: 'Creamy Greek yogurt with probiotics. Packed with protein and beneficial bacteria for digestive health.',
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
    description: 'Fresh red tomatoes. Vine-ripened and full of flavor, perfect for cooking and salads.',
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
    description: 'Fresh squeezed orange juice. 100% pure orange juice with no added sugars or preservatives.',
    stock: 20,
    deliveryTime: '16 mins',
    rating: 4.8,
    reviews: 91
  }
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = React.useState(1);

  const product = demoProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Product Not Found</CardTitle>
            <CardDescription>The product you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart!`);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Product Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-brand-green mb-4">₹{product.price}</p>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="w-5 h-5 text-brand-green" />
                    <div>
                      <p className="font-medium">{product.deliveryTime}</p>
                      <p className="text-xs text-muted-foreground">Delivery</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Package className="w-5 h-5 text-brand-orange" />
                    <div>
                      <p className="font-medium">{product.stock} units</p>
                      <p className="text-xs text-muted-foreground">In Stock</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-blue" />
                    <div>
                      <p className="font-medium">Quality</p>
                      <p className="text-xs text-muted-foreground">Assured</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-lg" 
                  onClick={handleAddToCart}
                  disabled={!user}
                >
                  {user ? `Add ${quantity} to Cart - ₹${(product.price * quantity).toFixed(2)}` : 'Sign in to Add to Cart'}
                </Button>
                
                {product.stock < 10 && (
                  <p className="text-sm text-orange-600 text-center">
                    Only {product.stock} left in stock!
                  </p>
                )}
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Choose This Product?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-brand-green" />
                  <span>Fast delivery in {product.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-brand-blue" />
                  <span>Quality guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-brand-orange" />
                  <span>Fresh and carefully packaged</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews ({product.reviews})</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating} out of 5</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-medium">Customer {i + 1}</span>
                      <div className="flex ml-auto">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < (5 - i) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {i === 0 && "Great quality product! Fast delivery and exactly as described."}
                      {i === 1 && "Very fresh and well packaged. Will definitely order again."}
                      {i === 2 && "Good value for money. Delivery was quick and hassle-free."}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
