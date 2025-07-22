import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  CreditCard,
  MapPin,
  Clock,
  Truck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    // TODO: Implement real checkout process
    alert('Checkout functionality will be implemented with payment processing!');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-md bg-background h-full overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
            {getTotalItems() > 0 && (
              <Badge>{getTotalItems()}</Badge>
            )}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add some products to get started!</p>
              <Button onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            ${item.product.price.toFixed(2)} each
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {item.product.deliveryTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-destructive hover:text-destructive p-0 h-auto"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Delivery Info */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">123 Main St, Downtown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Expected delivery: 15-25 mins</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Free delivery on orders over ₹500
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{getTotalPrice() >= 25 ? 'Free' : '$2.99'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        ${(getTotalPrice() + (getTotalPrice() >= 25 ? 0 : 2.99) + getTotalPrice() * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <div className="space-y-3">
                <Button className="w-full h-12" onClick={handleCheckout}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
