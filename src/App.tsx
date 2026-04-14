import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  User, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  X, 
  CheckCircle2, 
  Truck, 
  Package, 
  Cake as CakeIcon,
  LogOut,
  LayoutDashboard,
  History,
  Calendar,
  Image as ImageIcon,
  Gift,
  Heart,
  Home as HomeIcon,
  Grid,
  User as UserIcon,
  Loader2,
  Flame,
  PartyPopper,
  Sparkles,
  Zap,
  Edit3,
  AlertCircle,
  Trash2,
  ArrowRight,
  Ticket,
  Tag,
  Bell,
  ShoppingBag,
  TrendingUp,
  XCircle,
  Shield,
  Cake,
  Coffee,
  ChevronUp
} from 'lucide-react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onSnapshot, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  arrayUnion,
  OperationType,
  handleFirestoreError
} from './firebase';
import { 
  Product, 
  Order, 
  OrderItem, 
  DeliveryDetails, 
  OrderStatus, 
  UserProfile,
  AppNotification
} from './types';
import { INITIAL_PRODUCTS } from './constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Toaster, toast } from 'sonner';

// --- Components ---

const Navbar = ({ user, cartCount, onOpenCart, onOpenAuth, onSignOut, isAdmin, onOpenAdmin, onOpenOrders, onOpenProfile, setView, onOpenNotifications, unreadNotifications }: { 
  user: any, 
  cartCount: number, 
  onOpenCart: () => void, 
  onOpenAuth: () => void, 
  onSignOut: () => void,
  isAdmin: boolean,
  onOpenAdmin: () => void,
  onOpenOrders: () => void,
  onOpenProfile: () => void,
  setView: (view: any) => void,
  onOpenNotifications: () => void,
  unreadNotifications: number
}) => (
  <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-emerald-deep/5">
    <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
      <div className="flex items-center gap-8 md:gap-12">
        <button 
          onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col group cursor-pointer"
        >
          <span className="text-2xl md:text-3xl font-heading font-bold tracking-[-0.05em] text-emerald-deep leading-none group-hover:text-gold transition-colors duration-500 italic">KOSELI</span>
          <span className="text-[7px] md:text-[8px] font-bold tracking-[0.5em] text-emerald-deep/30 uppercase mt-1 group-hover:text-gold/50 transition-colors duration-500">Artisan Bakery</span>
        </button>
        
        <div className="hidden lg:flex items-center gap-10">
          {['Collection', 'About', 'Bespoke'].map((item) => (
            <button 
              key={item}
              onClick={() => {
                if (item === 'Collection') {
                  setView('home');
                  setTimeout(() => document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }
              }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-deep/40 hover:text-emerald-deep transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex items-center gap-2 bg-emerald-deep/5 px-4 py-2 rounded-full border border-emerald-deep/5">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          <span className="text-[9px] font-bold text-emerald-deep/60 uppercase tracking-widest">Kathmandu, NP</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full text-emerald-deep/40 hover:text-emerald-deep hover:bg-emerald-deep/5 transition-all"
            onClick={() => setView('search')}
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full text-emerald-deep/40 hover:text-emerald-deep hover:bg-emerald-deep/5 transition-all relative"
            onClick={onOpenCart}
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-coral text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </Button>

          <div className="h-8 w-[1px] bg-emerald-deep/10 mx-1 hidden md:block" />

          {user ? (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="hidden md:flex items-center gap-3 px-4 h-12 rounded-full hover:bg-emerald-deep/5 group"
                onClick={() => setView('profile')}
              >
                <div className="h-8 w-8 rounded-full bg-emerald-deep/10 flex items-center justify-center border border-emerald-deep/5 group-hover:border-gold/30 transition-all">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <UserIcon className="h-4 w-4 text-emerald-deep/60" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-bold text-emerald-deep uppercase tracking-widest leading-none mb-1">Welcome</p>
                  <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest truncate max-w-[80px]">{user.displayName?.split(' ')[0] || 'Artisan'}</p>
                </div>
              </Button>
              {isAdmin && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all shadow-lg shadow-gold/10"
                  onClick={onOpenAdmin}
                >
                  <Shield className="h-5 w-5" />
                </Button>
              )}
            </div>
          ) : (
            <Button 
              className="bg-emerald-deep text-white hover:bg-gold rounded-full px-6 md:px-8 h-10 md:h-12 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-emerald-deep/10 transition-all"
              onClick={onOpenAuth}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  </nav>
);

const VisualNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const items = [
    { id: 'all', name: 'All Items', icon: Grid },
    { id: 'birthday', name: 'Birthday', icon: CakeIcon },
    { id: 'anniversary', name: 'Anniv', icon: Heart },
    { id: 'wedding', name: 'Wedding', icon: Star },
    { id: 'cupcakes', name: 'Cupcakes', icon: CakeIcon },
    { id: 'pastries', name: 'Pastries', icon: Coffee },
    { id: 'accessories', name: 'Extras', icon: Gift },
    { id: 'combo', name: 'Combos', icon: Package },
  ];

  return (
    <div className="w-full mb-12 md:mb-20 overflow-hidden">
      <div className="flex items-center justify-start md:justify-center gap-4 md:gap-12 overflow-x-auto no-scrollbar py-8 px-6">
        {items.map((item, idx) => {
          const isActive = activeTab === item.id;
          return (
            <button 
              key={idx}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-5 min-w-[70px] md:min-w-[110px] group transition-all"
            >
              <div className={`h-14 w-14 md:h-24 md:w-24 rounded-full flex items-center justify-center transition-all duration-700 border-2 ${isActive ? 'bg-emerald-deep text-white border-gold shadow-[0_15px_40px_rgba(6,78,59,0.3)] scale-110' : 'bg-white text-emerald-deep/30 border-emerald-deep/5 shadow-sm group-hover:border-gold/30 group-hover:text-gold group-hover:-translate-y-2'}`}>
                <item.icon className="h-6 w-6 md:h-10 md:w-10" strokeWidth={1} />
              </div>
              <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${isActive ? 'text-emerald-deep translate-y-1' : 'text-emerald-deep/20 group-hover:text-gold'}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CartPage = ({ 
  cart, 
  products, 
  removeFromCart, 
  updateCartQuantity, 
  totalAmount, 
  onCheckout, 
  onExplore,
  addToCart,
  clearCart,
  paymentMethod,
  setPaymentMethod
}: { 
  cart: OrderItem[], 
  products: Product[], 
  removeFromCart: (i: number) => void, 
  updateCartQuantity: (i: number, d: number) => void,
  totalAmount: number,
  onCheckout: (method: 'esewa' | 'khalti' | 'cod') => void,
  onExplore: () => void,
  addToCart: (p: Product) => void,
  clearCart: () => void,
  paymentMethod: 'esewa' | 'khalti' | 'cod',
  setPaymentMethod: (m: 'esewa' | 'khalti' | 'cod') => void
}) => {
  const [voucherCode, setVoucherCode] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="h-24 w-24 md:h-32 md:w-32 bg-emerald-deep/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <ShoppingCart className="h-8 w-8 md:h-12 md:w-12 text-emerald-deep/20" strokeWidth={1} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-emerald-deep italic mb-4">Your collection is empty</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-12 font-medium">Begin your journey through our exquisite selection of artisanal masterpieces.</p>
          <Button 
            className="bg-emerald-deep text-white rounded-full px-8 md:px-12 h-14 md:h-16 font-bold uppercase tracking-widest hover:bg-champagne transition-all shadow-2xl shadow-emerald-deep/20"
            onClick={onExplore}
          >
            Explore Collection
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto pt-8 pb-48 px-4 md:px-6 flex-1 flex flex-col w-full"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-start">
        <div className="flex-1 w-full space-y-4">
          {/* Cart Header */}
          <div className="bg-[#e5e5e0]/50 p-4 rounded-2xl border border-emerald-deep/5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full border border-emerald-deep/20 flex items-center justify-center bg-white">
                <div className="h-2.5 w-2.5 rounded-full bg-[#064e3b]" />
              </div>
              <span className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.1em]">SELECT ALL ({cart.length} ITEMS)</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[10px] font-bold text-[#ff6b6b] hover:text-red-600 uppercase tracking-widest flex items-center gap-2"
              onClick={clearCart}
            >
              <Trash2 className="h-3.5 w-3.5" /> DELETE
            </Button>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <motion.div 
                  key={index}
                  layout
                  className="bg-[#e5e5e0]/30 p-4 md:p-6 rounded-[2rem] border border-emerald-deep/5 shadow-sm flex gap-4 md:gap-6 group relative hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-5 w-5 rounded-full border border-emerald-deep/20 mt-1 shrink-0 flex items-center justify-center bg-white">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#064e3b]" />
                    </div>
                    <div className="h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-[1.5rem] bg-muted shrink-0 border border-emerald-deep/5 shadow-inner">
                      <img 
                        src={product?.imageUrl || 'https://picsum.photos/seed/cake/400/400'} 
                        alt={item.cakeName} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h4 className="font-heading font-bold text-lg md:text-xl text-emerald-deep leading-tight italic">{item.cakeName}</h4>
                        <p className="text-[10px] text-emerald-deep/40 font-bold uppercase tracking-widest">DESIGN: {item.cakeDesign || 'STANDARD'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-deep/20 hover:text-emerald-deep rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#ff6b6b]/60 hover:text-[#ff6b6b] rounded-full" onClick={() => removeFromCart(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-emerald-deep/30 uppercase tracking-widest">ARTISAN VALUE</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[10px] font-bold text-emerald-deep/40">Rs.</span>
                          <span className="font-heading font-bold text-2xl text-emerald-deep/80">{item.price}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full p-1 border border-emerald-deep/5 shadow-sm">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-emerald-deep/5 text-emerald-deep disabled:opacity-30"
                          onClick={() => updateCartQuantity(index, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-heading font-bold text-emerald-deep min-w-[30px] text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-emerald-deep/5 text-emerald-deep"
                          onClick={() => updateCartQuantity(index, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[380px] lg:sticky lg:top-24">
          <div className="bg-[#e5e5e0]/40 p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-xl space-y-8">
            <div className="space-y-1">
              <h3 className="text-2xl font-heading font-bold text-emerald-deep italic leading-none">Order Summary</h3>
              <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">FINAL REVIEW</p>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-emerald-deep/60">
                  <span className="font-bold uppercase tracking-widest text-[10px]">Subtotal ({cart.length} items)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-bold text-emerald-deep/40">Rs.</span>
                    <span className="text-xl font-bold text-emerald-deep/70">{totalAmount}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm font-medium text-emerald-deep/60">
                  <span className="font-bold uppercase tracking-widest text-[10px]">Delivery Fee</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">COMPLIMENTARY</span>
                </div>
                
                <div className="pt-6 border-t border-emerald-deep/5">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Total Amount</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-emerald-deep/40">Rs.</span>
                        <span className="text-3xl font-heading font-bold text-emerald-deep tracking-tighter">{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-emerald-deep uppercase tracking-widest ml-1">Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'esewa', label: 'ESEWA' },
                  { id: 'khalti', label: 'KHALTI' },
                  { id: 'cod', label: 'COD' }
                ].map((method) => (
                  <Button 
                    key={method.id}
                    variant={paymentMethod === method.id ? 'default' : 'outline'}
                    className={`h-12 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${paymentMethod === method.id ? 'bg-emerald-deep text-white shadow-lg' : 'border-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep/5'}`}
                    onClick={() => setPaymentMethod(method.id as any)}
                  >
                    {method.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full h-14 bg-[#064e3b] text-white hover:bg-[#064e3b]/90 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-deep/20 transition-all flex items-center justify-center gap-3 group"
              onClick={() => onCheckout(paymentMethod)}
            >
              Place Artisan Order
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="text-[8px] text-center text-emerald-deep/30 font-medium uppercase tracking-[0.2em] leading-relaxed">
              SECURE ARTISAN CHECKOUT POWERED BY <br/> <span className="text-emerald-deep font-bold">ARTISAN BAKERY NETWORK</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BottomNav = ({ cartCount, onOpenCart, onOpenAuth, user, onOpenOrders, onOpenProfile, activeView, setView, isAdmin }: { 
  cartCount: number, 
  onOpenCart: () => void, 
  onOpenAuth: () => void, 
  user: any, 
  onOpenOrders: () => void,
  onOpenProfile: () => void,
  activeView: string,
  setView: (view: string) => void,
  isAdmin: boolean
}) => {
  const NavItem = ({ icon: Icon, label, view, onClick, badge }: any) => {
    const isActive = activeView === view;
    return (
      <div className="relative group flex flex-col items-center">
        <button 
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 p-4 rounded-full ${isActive ? 'text-white bg-emerald-deep shadow-[0_15px_30px_rgba(6,78,59,0.3)]' : 'text-emerald-deep/30 hover:text-emerald-deep hover:bg-emerald-deep/5'}`} 
          onClick={() => {
            if (onClick) onClick();
            else setView(view);
          }}
        >
          <div className="relative">
            <Icon className="h-6 w-6" strokeWidth={isActive ? 2 : 1.5} />
            {badge > 0 && (
              <Badge className="absolute -top-3 -right-3 h-6 w-6 justify-center rounded-full bg-coral p-0 text-[10px] text-white border-2 border-white font-bold shadow-lg">
                {badge}
              </Badge>
            )}
          </div>
        </button>
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-emerald-deep text-white text-[10px] font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap shadow-2xl translate-y-2 group-hover:translate-y-0 border border-white/10">
          {label}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-emerald-deep" />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md h-24 bg-white/90 backdrop-blur-3xl border border-emerald-deep/5 flex items-center justify-around px-8 rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
      <NavItem icon={HomeIcon} label="Home" view="home" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      <NavItem icon={Grid} label="Collection" view="menu" onClick={() => { setView('home'); setTimeout(() => document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' }), 100); }} />
      <NavItem icon={ShoppingCart} label="Basket" view="cart" badge={cartCount} />
      <NavItem icon={UserIcon} label="Account" view="profile" onClick={() => user ? setView('profile') : onOpenAuth()} />
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product, 
  onAddToCart: (p: Product) => void,
  isWishlisted: boolean,
  onToggleWishlist: (id: string) => void
}> = ({ product, onAddToCart, isWishlisted, onToggleWishlist }) => {
  const navigate = useNavigate();
  
  return (
    <Card className={`group overflow-hidden border-none shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-1000 rounded-[3.5rem] bg-white flex flex-col h-full relative ${!product.inStock ? 'opacity-80 grayscale-[0.3]' : ''}`}>
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-muted cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-emerald-deep/40 backdrop-blur-[4px] flex items-center justify-center z-20">
            <Badge className="bg-coral text-white border-none px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] shadow-2xl animate-pulse">
              Out of Stock
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-emerald-deep/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
          <Button className="bg-white/90 backdrop-blur-md text-emerald-deep hover:bg-gold hover:text-white rounded-full px-10 h-14 font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all border border-emerald-deep/5">View Masterpiece</Button>
        </div>
        <div className="absolute top-8 left-8 flex flex-col gap-3">
          <Badge className="bg-white/95 backdrop-blur-xl text-emerald-deep border border-emerald-deep/5 shadow-xl font-bold text-[9px] px-5 py-2 rounded-full tracking-[0.3em] w-fit">
            {product.category.toUpperCase()}
          </Badge>
        </div>
        <button 
          className={`absolute top-8 right-8 h-14 w-14 rounded-full flex items-center justify-center transition-all duration-700 z-30 ${isWishlisted ? 'bg-coral text-white shadow-coral/30' : 'bg-white/90 backdrop-blur-xl text-emerald-deep hover:bg-emerald-deep hover:text-white shadow-xl border border-emerald-deep/5'}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
        >
          <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
        </button>
      </div>
      
      <div className="p-10 flex flex-col flex-1 gap-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-2xl md:text-3xl text-emerald-deep leading-tight group-hover:text-gold transition-colors duration-500 italic">{product.name}</h4>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-gold" />
              <p className="text-[9px] text-emerald-deep/30 font-bold uppercase tracking-[0.3em]">{product.characteristics[0] || 'Artisan Creation'}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-[0.3em] leading-none mb-1">Value</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold text-emerald-deep/30">Rs.</span>
              <span className="font-heading font-bold text-xl text-emerald-deep/50 tracking-tighter">{product.price}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-emerald-deep/60 line-clamp-2 font-medium leading-relaxed italic">
          {product.description}
        </p>

        <div className="mt-auto pt-6">
          <Button 
            className={`w-full h-16 rounded-3xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-700 shadow-xl ${
              product.inStock 
                ? 'bg-emerald-deep text-white hover:bg-gold shadow-emerald-deep/20 hover:-translate-y-1' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            onClick={() => product.inStock && onAddToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <span className="flex items-center gap-4">
                <ShoppingCart className="h-4 w-4" strokeWidth={2} /> Add to Collection
              </span>
            ) : (
              <span className="flex items-center gap-4">
                <AlertCircle className="h-4 w-4" /> Currently Unavailable
              </span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ProductDetailsPage = ({ 
  products, 
  onAddToCart,
  wishlist,
  onToggleWishlist
}: { 
  products: Product[], 
  onAddToCart: (p: Product, quantity: number, custom: { name: string, design: string }) => void,
  wishlist: string[],
  onToggleWishlist: (id: string) => void
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState({ name: '', design: '' });

  const isWishlisted = product ? wishlist.includes(product.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-heading font-bold text-emerald-deep">Product not found</h2>
        <Button className="mt-8 bg-emerald-deep text-white hover:bg-champagne rounded-full px-10 h-14 font-bold text-xs uppercase tracking-widest shadow-xl" onClick={() => navigate('/')}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-24 pb-48">
      <div className="flex items-center justify-between mb-16">
        <Button 
          variant="ghost" 
          className="text-emerald-deep font-bold flex items-center gap-4 hover:bg-emerald-deep/5 text-[10px] uppercase tracking-[0.4em]"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" /> Return to Collection
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full h-16 w-16 shadow-2xl transition-all duration-700 ${isWishlisted ? 'bg-coral text-white border-coral' : 'bg-white text-emerald-deep border-emerald-deep/5 hover:bg-emerald-deep hover:text-white'}`}
          onClick={() => onToggleWishlist(product.id)}
        >
          <Heart className={`h-7 w-7 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1} />
        </Button>
      </div>

      <div className="grid gap-20 md:grid-cols-2 lg:gap-32 items-start">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] overflow-hidden rounded-[5rem] bg-white shadow-2xl border border-emerald-deep/5 group"
        >
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-10 left-10">
            <Badge className="bg-white/90 backdrop-blur-md text-emerald-deep border-none shadow-lg font-bold text-[10px] px-6 py-2 rounded-full tracking-[0.4em]">
              {product.category.toUpperCase()}
            </Badge>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-12"
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-emerald-deep tracking-tighter leading-[0.85] italic">{product.name}</h1>
            <div className="flex items-center gap-8 mt-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-[0.4em] mb-1">Artisan Value</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-emerald-deep/40">Rs.</span>
                  <span className="text-3xl font-heading font-bold text-emerald-deep/60 tracking-tighter">{product.price}</span>
                </div>
              </div>
              <div className="h-[1px] w-16 bg-emerald-deep/10" />
              <span className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-[0.4em]">Artisan Creation</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-deep uppercase text-[10px] tracking-[0.5em] opacity-30 italic">The Experience</h3>
            <p className="text-muted-foreground leading-relaxed text-xl font-medium">{product.description}</p>
          </div>

          <div className="grid gap-8 bg-maroon/5 p-10 rounded-[3rem] border border-maroon/5 relative overflow-hidden">
            {!product.inStock && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex items-center justify-center p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-maroon/10 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-maroon" />
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-maroon italic">Currently Unavailable</h4>
                  <p className="text-sm text-muted-foreground font-medium">This masterpiece is currently out of stock. Please check back later or explore our other creations.</p>
                  <Button variant="outline" className="rounded-full border-maroon/20 text-maroon font-bold uppercase tracking-widest text-[10px] mt-2" onClick={() => navigate('/')}>Return to Collection</Button>
                </div>
              </div>
            )}
            <div className="grid gap-4">
              <Label htmlFor="page-name" className="text-emerald-deep font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Calligraphy Request</Label>
              <Input 
                id="page-name" 
                placeholder="e.g. Happy Birthday Isabella" 
                className="h-16 rounded-2xl border-emerald-deep/10 focus:ring-champagne bg-white shadow-sm"
                value={custom.name}
                onChange={(e) => setCustom({...custom, name: e.target.value})}
              />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="page-design" className="text-emerald-deep font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Bespoke Instructions</Label>
              <Input 
                id="page-design" 
                placeholder="e.g. Gold leaf accents, cream theme" 
                className="h-16 rounded-2xl border-emerald-deep/10 focus:ring-champagne bg-white shadow-sm"
                value={custom.design}
                onChange={(e) => setCustom({...custom, design: e.target.value})}
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-10 pt-8 border-t border-emerald-deep/10">
              <div className="grid gap-4">
                <Label className="text-emerald-deep font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Quantity</Label>
                <div className="flex items-center gap-8 bg-white p-2 rounded-full border border-emerald-deep/5 shadow-sm">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-full hover:bg-emerald-deep/5 text-emerald-deep"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold text-2xl min-w-[40px] text-center text-emerald-deep font-heading">{qty}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-full hover:bg-emerald-deep/5 text-emerald-deep"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                className="flex-1 bg-emerald-deep hover:bg-champagne text-white h-16 md:h-20 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest shadow-2xl shadow-emerald-deep/20 transition-all active:scale-95 flex items-center justify-center gap-4"
                onClick={() => {
                  onAddToCart(product, qty, custom);
                  toast.success('Added to your collection');
                }}
              >
                Add to Collection <ShoppingCart className="h-5 w-5" strokeWidth={1} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 rounded-[2rem] border border-maroon/5 bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-maroon/5 flex items-center justify-center">
                <Clock className="h-6 w-6 text-maroon" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-maroon uppercase tracking-[0.2em]">Preparation</p>
                <p className="text-xs text-muted-foreground font-medium">4-6 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-[2rem] border border-maroon/5 bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-maroon/5 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-maroon" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-maroon uppercase tracking-[0.2em]">Delivery</p>
                <p className="text-xs text-muted-foreground font-medium">Bheemdatt Area</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

import PaymentTest from './PaymentTest';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [status, setStatus] = useState<'success' | 'error'>('success');
  const [orderId, setOrderId] = useState<string | null>(searchParams.get('orderId'));

  useEffect(() => {
    const verifyPayment = async () => {
      const data = searchParams.get('data'); // eSewa
      const pidx = searchParams.get('pidx'); // Khalti
      const urlOrderId = searchParams.get('orderId');

      try {
        let verificationResult;
        if (data) {
          // eSewa verification
          const response = await fetch(`/api/payment/esewa/verify?data=${data}`);
          verificationResult = await response.json();
        } else if (pidx) {
          // Khalti verification
          const response = await fetch('/api/payment/khalti/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pidx })
          });
          verificationResult = await response.json();
        }

        if (verificationResult?.success) {
          const verifiedOrderId = verificationResult.orderId || urlOrderId;
          setOrderId(verifiedOrderId);
          
          // Update Firestore (skip for test orders)
          if (verifiedOrderId && !verifiedOrderId.startsWith('TEST-')) {
            const orderRef = doc(db, 'orders', verifiedOrderId);
            
            // We need to wait for auth to be ready before updating
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
              if (user) {
                try {
                  await updateDoc(orderRef, {
                    paymentStatus: 'paid',
                    status: 'confirmed',
                    timeline: arrayUnion({ 
                      status: 'confirmed', 
                      timestamp: new Date().toISOString(), 
                      message: 'Payment verified successfully. Order is now confirmed.' 
                    })
                  });
                } catch (err) {
                  console.error('Error updating order after payment:', err);
                }
                unsubscribe();
              }
            });
          }
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-maroon/5 p-4">
        <Card className="max-w-md w-full text-center p-8 rounded-3xl border-maroon/10 shadow-xl">
          <div className="flex justify-center mb-6">
            <Loader2 className="h-12 w-12 text-maroon animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-maroon mb-2">Verifying Payment...</h2>
          <p className="text-muted-foreground">Please wait while we confirm your transaction with the bank.</p>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-maroon/5 p-4">
        <Card className="max-w-md w-full text-center p-8 rounded-3xl border-maroon/10 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <X className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-maroon mb-2">Verification Failed</h2>
          <p className="text-muted-foreground mb-8">We couldn't verify your payment. If you've been charged, please contact our support team.</p>
          <Button className="w-full bg-maroon hover:bg-maroon/90 h-12 rounded-xl" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-maroon/5 p-4">
      <Card className="max-w-md w-full text-center p-8 rounded-3xl border-maroon/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-maroon mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8">Your order #{orderId?.slice(-6)} has been confirmed and is being prepared with love.</p>
        <Button className="w-full bg-maroon hover:bg-maroon/90 h-12 rounded-xl" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
};

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-maroon/5 p-4">
      <Card className="max-w-md w-full text-center p-8 rounded-3xl border-maroon/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <X className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-maroon mb-2">Payment Failed</h2>
        <p className="text-muted-foreground mb-8">We couldn't process your payment for order #{orderId?.slice(-6)}. Please try again or contact support.</p>
        <Button className="w-full bg-maroon hover:bg-maroon/90 h-12 rounded-xl" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
};

const NotificationInbox = ({ 
  notifications, 
  onMarkAsRead,
  onClose
}: { 
  notifications: AppNotification[], 
  onMarkAsRead: (id: string) => void,
  onClose: () => void
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-emerald-deep/5 overflow-hidden w-full max-w-md">
      <div className="p-6 bg-emerald-deep text-white flex items-center justify-between">
        <h3 className="font-heading font-bold text-xl">Notifications</h3>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-deep/5 rounded-full flex items-center justify-center mx-auto">
              <Bell className="h-8 w-8 text-emerald-deep/20" />
            </div>
            <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-emerald-deep/5">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-6 transition-colors hover:bg-emerald-deep/5 cursor-pointer ${!notif.read ? 'bg-emerald-deep/[0.02]' : ''}`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                <div className="flex gap-4">
                  <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${notif.read ? 'bg-transparent' : 'bg-emerald-500'}`} />
                  <div className="space-y-1">
                    <p className={`text-sm ${notif.read ? 'text-emerald-deep/60' : 'text-emerald-deep font-bold'}`}>
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-emerald-deep/40 font-bold uppercase tracking-widest">
                      {new Date(notif.createdAt?.toDate?.() || notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CartNotification = ({ product, isOpen }: { product: Product | null, isOpen: boolean }) => {
  if (!product) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
        >
          <div className="bg-emerald-deep/95 backdrop-blur-xl border border-white/10 rounded-full p-2 pl-6 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-heading font-bold text-sm leading-tight">{product.name}</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Added to your collection</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center mr-1">
              <CheckCircle2 className="h-5 w-5 text-emerald-deep" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AddToCartModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onGoToCart 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  product: Product | null,
  onGoToCart: () => void
}) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[500px] w-[95vw] rounded-[3.5rem] border-emerald-deep/5 shadow-[0_50px_100px_rgba(0,0,0,0.2)] p-0 overflow-hidden cursor-pointer group"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          onGoToCart();
        }}
      >
        <div className="bg-emerald-deep p-10 md:p-12 text-white text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.2),transparent)]" />
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="h-20 w-20 md:h-24 md:w-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-2xl"
          >
            <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-gold" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-heading font-bold italic tracking-tight">Added to Collection</h2>
          <p className="text-white/40 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em]">An exquisite choice, artisan</p>
        </div>
        
        <div className="p-10 md:p-12 space-y-10">
          <div className="flex items-center gap-6 md:gap-8 bg-emerald-deep/[0.02] p-6 rounded-[2.5rem] border border-emerald-deep/5 shadow-inner">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-[2rem] overflow-hidden shrink-0 border border-emerald-deep/10 shadow-xl">
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-heading font-bold text-emerald-deep text-xl md:text-2xl leading-tight italic">{product.name}</h4>
              <p className="text-[10px] md:text-[11px] text-emerald-deep/30 font-bold uppercase tracking-[0.3em]">{product.category}</p>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-[10px] md:text-[11px] font-bold text-emerald-deep/20">Rs.</span>
                <span className="font-heading font-bold text-2xl md:text-3xl text-emerald-deep/60 tracking-tighter">{product.price}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Button 
              variant="outline" 
              className="h-14 md:h-16 rounded-2xl border-emerald-deep/10 text-emerald-deep font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-deep/5 transition-all"
              onClick={onClose}
            >
              Continue Exploring
            </Button>
            <Button 
              className="h-14 md:h-16 rounded-2xl bg-emerald-deep text-white font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-gold shadow-xl shadow-emerald-deep/10 transition-all"
              onClick={onGoToCart}
            >
              View Collection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AdminDashboard = ({ 
  products, 
  orders, 
  users,
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct, 
  onToggleStock,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onSendNotification,
  onBack
}: { 
  products: Product[], 
  orders: Order[], 
  users: UserProfile[],
  onAddProduct: () => void, 
  onEditProduct: (p: Product) => void, 
  onDeleteProduct: (id: string) => void,
  onToggleStock: (id: string, inStock: boolean) => void,
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void,
  onUpdatePaymentStatus: (orderId: string, status: 'paid' | 'unpaid') => void,
  onSendNotification: (userId: string, message: string, type: 'targeted' | 'broadcast') => void,
  onBack: () => void
}) => {
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  const [notifTarget, setNotifTarget] = useState<string>('all');
  const [notifMessage, setNotifMessage] = useState('');

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);
  
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.totalAmount, 0),
    pendingCount: orders.filter(o => o.status === 'pending').length,
    cancelledCount: orders.filter(o => o.status === 'cancelled').length,
    deliveredCount: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-24 pb-48">
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            className="text-emerald-deep font-bold flex items-center gap-4 hover:bg-emerald-deep/5 text-[10px] uppercase tracking-[0.4em]"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4" /> Return to Shop
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-deep/10 pb-10 gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-emerald-deep tracking-tighter italic">Admin Control Center</h1>
            <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-[0.4em] mt-4">Manage your shop's heartbeat - orders and collections.</p>
          </div>
          <Button 
            className="bg-emerald-deep text-white hover:bg-champagne rounded-full px-8 h-14 font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-deep/20 transition-all flex items-center gap-3"
            onClick={onAddProduct}
          >
            <Plus className="h-4 w-4" /> New Masterpiece
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-emerald-deep' },
            { label: 'Revenue', value: `Rs. ${stats.totalRevenue}`, icon: TrendingUp, color: 'text-emerald-500' },
            { label: 'Pending', value: stats.pendingCount, icon: Clock, color: 'text-champagne' },
            { label: 'Delivered', value: stats.deliveredCount, icon: CheckCircle2, color: 'text-blue-500' },
            { label: 'Cancelled', value: stats.cancelledCount, icon: XCircle, color: 'text-coral' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-emerald-deep/5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="bg-emerald-deep/5 p-1 rounded-2xl mb-12 w-fit">
            <TabsTrigger value="products" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-emerald-deep data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest">Products</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-emerald-deep data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest">Orders</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-emerald-deep data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-8">
            <div className="grid gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-3xl border border-emerald-deep/5 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl transition-all duration-500">
                  <div className="h-24 w-24 rounded-2xl overflow-hidden bg-muted shrink-0 border border-emerald-deep/5">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-1 text-center md:text-left">
                    <h4 className="font-heading font-bold text-xl text-emerald-deep">{product.name}</h4>
                    <p className="text-[10px] text-emerald-deep/40 font-bold uppercase tracking-widest">{product.category}</p>
                    <div className="flex items-baseline gap-1 justify-center md:justify-start mt-2">
                      <span className="text-[10px] font-bold text-emerald-deep/40">Rs.</span>
                      <span className="font-heading font-bold text-lg text-emerald-deep/60">{product.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center gap-3 bg-emerald-deep/5 px-4 py-2 rounded-full">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${product.inStock ? 'text-emerald-500' : 'text-coral'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-8 px-4 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${product.inStock ? 'bg-coral text-white hover:bg-coral/90' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
                        onClick={() => onToggleStock(product.id, !product.inStock)}
                      >
                        {product.inStock ? 'Mark Out' : 'Mark In'}
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-12 w-12 rounded-full border-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep hover:text-white"
                      onClick={() => onEditProduct(product)}
                    >
                      <Edit3 className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-12 w-12 rounded-full border-coral/10 text-coral hover:bg-coral hover:text-white"
                      onClick={() => onDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {['all', 'pending', 'confirmed', 'picked', 'ready', 'delivered', 'cancelled'].map((status) => (
                <Button
                  key={status}
                  variant={orderFilter === status ? 'default' : 'outline'}
                  className={`rounded-full px-6 text-[10px] font-bold uppercase tracking-widest ${
                    orderFilter === status ? 'bg-emerald-deep text-white' : 'border-emerald-deep/10 text-emerald-deep'
                  }`}
                  onClick={() => setOrderFilter(status as any)}
                >
                  {status} ({status === 'all' ? orders.length : orders.filter(o => o.status === status).length})
                </Button>
              ))}
            </div>

            <div className="grid gap-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-emerald-deep/5 pb-6">
                    <div>
                      <h4 className="font-heading font-bold text-xl text-emerald-deep">Order #{order.id.slice(-6).toUpperCase()}</h4>
                      <p className="text-[10px] text-emerald-deep/40 font-bold uppercase tracking-widest mt-1">Placed on {new Date(order.createdAt?.toDate?.() || order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest border-none ${
                        order.status === 'delivered' ? 'bg-emerald-500 text-white' :
                        order.status === 'ready' ? 'bg-blue-500 text-white' :
                        order.status === 'picked' ? 'bg-purple-500 text-white' :
                        order.status === 'confirmed' ? 'bg-champagne text-white' :
                        order.status === 'cancelled' ? 'bg-coral text-white' :
                        'bg-emerald-deep/10 text-emerald-deep'
                      }`}>
                        {order.status}
                      </Badge>

                      <Badge className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest border-none ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {order.paymentStatus}
                      </Badge>

                      <select 
                        className="bg-emerald-deep/5 border-none rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-deep focus:ring-2 focus:ring-emerald-deep outline-none cursor-pointer"
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="picked">Picked</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <select 
                        className="bg-emerald-deep/5 border-none rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-deep focus:ring-2 focus:ring-emerald-deep outline-none cursor-pointer"
                        value={order.paymentStatus}
                        onChange={(e) => onUpdatePaymentStatus(order.id, e.target.value as 'paid' | 'unpaid')}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Customer Details</h5>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-emerald-deep">{order.deliveryDetails.fullName}</p>
                        <p className="text-sm text-muted-foreground">{order.deliveryDetails.phone}</p>
                        <p className="text-sm text-muted-foreground">{order.deliveryDetails.address}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Order Items</h5>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="font-medium text-emerald-deep">{item.cakeName} x {item.quantity}</span>
                            <span className="font-bold text-emerald-deep/60">Rs. {item.price * item.quantity}</span>
                          </div>
                        ))}
                        <Separator className="bg-emerald-deep/5" />
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] font-bold text-emerald-deep uppercase tracking-widest">Total Amount</span>
                          <span className="text-xl font-heading font-bold text-champagne">Rs. {order.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline in Admin View */}
                  <div className="space-y-4 pt-6 border-t border-emerald-deep/5">
                    <h5 className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Order Timeline</h5>
                    <div className="space-y-4">
                      {order.timeline.map((event, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`h-2 w-2 rounded-full mt-1.5 ${i === order.timeline.length - 1 ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-deep/20'}`} />
                            {i !== order.timeline.length - 1 && <div className="w-px h-full bg-emerald-deep/10" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-emerald-deep">{event.message}</p>
                            <p className="text-[10px] text-emerald-deep/40">{new Date(event.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-sm max-w-2xl">
              <h3 className="font-heading font-bold text-2xl text-emerald-deep mb-6">Send Notification</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Target User</label>
                  <select 
                    className="w-full bg-emerald-deep/5 border-none rounded-2xl px-6 py-4 text-sm font-medium text-emerald-deep focus:ring-2 focus:ring-emerald-deep outline-none"
                    value={notifTarget}
                    onChange={(e) => setNotifTarget(e.target.value)}
                  >
                    <option value="all">Broadcast to All Users</option>
                    {users.map(u => (
                      <option key={u.uid} value={u.uid}>{u.displayName} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Message</label>
                  <textarea 
                    className="w-full bg-emerald-deep/5 border-none rounded-2xl px-6 py-4 text-sm font-medium text-emerald-deep focus:ring-2 focus:ring-emerald-deep outline-none min-h-[120px]"
                    placeholder="Enter your message here..."
                    value={notifMessage}
                    onChange={(e) => setNotifMessage(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full bg-emerald-deep text-white hover:bg-champagne h-14 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all"
                  onClick={() => {
                    if (!notifMessage.trim()) return;
                    onSendNotification(notifTarget, notifMessage, notifTarget === 'all' ? 'broadcast' : 'targeted');
                    setNotifMessage('');
                  }}
                >
                  Send Notification
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customDetails, setCustomDetails] = useState({ name: '', design: '' });
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    fullName: '',
    phone: '',
    address: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTime: '11:00',
    deliveryMethod: 'delivery'
  });
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeView, setActiveView] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation sync
  useEffect(() => {
    if (location.pathname !== '/' && activeView !== 'home') {
      navigate('/');
    }
  }, [activeView, location.pathname, navigate]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [prevOrdersCount, setPrevOrdersCount] = useState<number | null>(null);
  const [prevCancelledCount, setPrevCancelledCount] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | 'cod'>('cod');
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Birthday',
    imageUrl: '',
    characteristics: [],
    inStock: true
  });

  // Auth & Initial Data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const isUserAdmin = u.email === 'tejsinghsaud55@gmail.com';
        setIsAdmin(isUserAdmin);

        // Create/Update user document
        try {
          const userRef = doc(db, 'users', u.uid);
          await setDoc(userRef, {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
            role: isUserAdmin ? 'admin' : 'user'
          }, { merge: true });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${u.uid}`);
        }

        // Fetch user profile for wishlist
        onSnapshot(doc(db, 'users', u.uid), (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setWishlist(userData.wishlist || []);
          }
        });

        // Fetch user orders
        const q = query(collection(db, 'orders'), where('userId', '==', u.uid), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
          setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
        }, (error) => {
          console.error('Orders subscription error:', error);
        });

        // If admin, fetch all orders
        if (isUserAdmin) {
          const allQ = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
          onSnapshot(allQ, (snapshot) => {
            setAllOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
          }, (error) => {
            console.error('All orders subscription error:', error);
          });

          // Fetch all users for admin
          const qUsers = query(collection(db, 'users'));
          onSnapshot(qUsers, (snapshot) => {
            setAllUsers(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as any as UserProfile)));
          }, (error) => {
            console.error('Users subscription error:', error);
          });
        }

        // Fetch notifications
        const notificationTargets = [u.uid, 'all'];
        if (isUserAdmin) notificationTargets.push('admin');
        
        const qNotif = query(
          collection(db, 'notifications'), 
          where('userId', 'in', notificationTargets),
          orderBy('createdAt', 'desc')
        );
        onSnapshot(qNotif, (snapshot) => {
          setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any as AppNotification)));
        }, (error) => {
          console.error('Notifications subscription error:', error);
        });
      } else {
        setIsAdmin(false);
        setOrders([]);
        setAllOrders([]);
      }
    });

    // Fetch products
    const qProducts = query(collection(db, 'products'));
    const unsubProducts = onSnapshot(qProducts, (snapshot) => {
      if (snapshot.empty) {
        // Only attempt to seed if we are the admin
        if (auth.currentUser?.email === 'tejsinghsaud55@gmail.com') {
          INITIAL_PRODUCTS.forEach(async (p) => {
            try {
              await addDoc(collection(db, 'products'), p);
            } catch (e) {
              console.error('Error seeding product:', e);
            }
          });
        }
      } else {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      }
    }, (error) => {
      console.error('Products subscription error:', error);
    });

    return () => {
      unsubscribe();
      unsubProducts();
    };
  }, []);

  // Cleanup delivered orders older than 48 hours
  useEffect(() => {
    const cleanupDeliveredOrders = async (ordersList: Order[]) => {
      const now = new Date().getTime();
      const fortyEightHoursInMs = 48 * 60 * 60 * 1000;

      for (const order of ordersList) {
        if (order.status === 'delivered') {
          // Find the timestamp when it was delivered
          const deliveredEvent = order.timeline.find(e => e.status === 'delivered');
          if (deliveredEvent) {
            const deliveredTime = new Date(deliveredEvent.timestamp).getTime();
            if (now - deliveredTime > fortyEightHoursInMs) {
              try {
                await deleteDoc(doc(db, 'orders', order.id));
              } catch (error) {
                console.error('Error deleting old order:', error);
              }
            }
          }
        }
      }
    };

    if (isAdmin && allOrders.length > 0) {
      cleanupDeliveredOrders(allOrders);
    } else if (orders.length > 0) {
      cleanupDeliveredOrders(orders);
    }
  }, [orders, allOrders, isAdmin]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAuthOpen(false);
      toast.success('Signed in successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign in.');
    }
  };

  // Admin Real-time Alerts
  useEffect(() => {
    if (!isAdmin || allOrders.length === 0) return;

    if (prevOrdersCount === null) {
      setPrevOrdersCount(allOrders.length);
      setPrevCancelledCount(allOrders.filter(o => o.status === 'cancelled').length);
      return;
    }

    // New Order Alert
    if (allOrders.length > prevOrdersCount) {
      const newOrder = allOrders[0];
      toast.info(`New Order Received!`, {
        description: `Order #${newOrder.id.slice(-6).toUpperCase()} from ${newOrder.deliveryDetails.fullName}. Amount: Rs. ${newOrder.totalAmount}`,
        duration: 5000,
      });
    }

    // Cancellation Alert
    const currentCancelledCount = allOrders.filter(o => o.status === 'cancelled').length;
    if (currentCancelledCount > prevCancelledCount!) {
      const cancelledOrder = allOrders.find(o => o.status === 'cancelled' && !allOrders.find(prev => prev.id === o.id && prev.status === 'cancelled'));
      if (cancelledOrder) {
        toast.error(`Order Cancelled!`, {
          description: `Order #${cancelledOrder.id.slice(-6).toUpperCase()} was cancelled by ${cancelledOrder.deliveryDetails.fullName}.`,
          duration: 5000,
        });
      }
    }

    setPrevOrdersCount(allOrders.length);
    setPrevCancelledCount(currentCancelledCount);
  }, [allOrders, isAdmin]);

  const sendNotification = async (targetUserId: string, message: string, type: 'targeted' | 'broadcast') => {
    if (!isAdmin) return;
    try {
      await addDoc(collection(db, 'notifications'), {
        userId: targetUserId,
        message,
        type,
        read: false,
        createdAt: serverTimestamp(),
        senderId: user?.uid
      });
      toast.success('Notification sent successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'notifications');
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `notifications/${id}`);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success('Signed out successfully!');
  };

  const addToCart = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsDetailsModalOpen(true);
  };

  const confirmAddToCart = () => {
    if (!selectedProduct) return;
    
    const newItem: OrderItem = {
      productId: selectedProduct.id,
      quantity: quantity,
      cakeName: customDetails.name || selectedProduct.name,
      cakeDesign: customDetails.design || 'Standard',
      price: selectedProduct.price,
      imageUrl: selectedProduct.imageUrl
    };

    setCart([...cart, newItem]);
    setIsDetailsModalOpen(false);
    setCustomDetails({ name: '', design: '' });
    setLastAddedProduct(selectedProduct);
    setNotificationProduct(selectedProduct);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const handlePageAddToCart = (product: Product, qty: number = 1, custom: { name: string, design: string } = { name: '', design: '' }) => {
    const newItem: OrderItem = {
      productId: product.id,
      quantity: qty,
      cakeName: custom.name || product.name,
      cakeDesign: custom.design || 'Standard',
      price: product.price,
      imageUrl: product.imageUrl
    };

    setCart([...cart, newItem]);
    setLastAddedProduct(product);
    setNotificationProduct(product);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    const newQuantity = newCart[index].quantity + delta;
    if (newQuantity > 0) {
      newCart[index].quantity = newQuantity;
      setCart(newCart);
    } else {
      removeFromCart(index);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (method?: 'esewa' | 'khalti' | 'cod') => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    if (method) setPaymentMethod(method);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const handleCancelOrder = async () => {
    if (!user || !orderToCancel) return;

    try {
      const orderRef = doc(db, 'orders', orderToCancel);
      const order = orders.find(o => o.id === orderToCancel);
      if (!order) return;

      const newTimelineEvent = {
        status: 'cancelled' as OrderStatus,
        timestamp: new Date().toISOString(),
        message: 'Order cancelled by customer.'
      };

      await updateDoc(orderRef, {
        status: 'cancelled',
        timeline: [...order.timeline, newTimelineEvent]
      });

      setIsCancelModalOpen(false);
      setOrderToCancel(null);
      toast.success('Order cancelled successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderToCancel}`);
    }
  };

  const handleSaveProduct = async () => {
    if (!isAdmin) return;

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productFormData);
        toast.success('Product updated successfully');
      } else {
        await addDoc(collection(db, 'products'), productFormData);
        toast.success('Product added successfully');
      }
      setIsProductFormOpen(false);
      setEditingProduct(null);
      setProductFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Birthday',
        imageUrl: '',
        characteristics: [],
        inStock: true
      });
    } catch (error) {
      handleFirestoreError(error, editingProduct ? OperationType.UPDATE : OperationType.CREATE, 'products');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  const toggleStock = async (productId: string, inStock: boolean) => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'products', productId), { inStock });
      toast.success(`Product marked as ${inStock ? 'In Stock' : 'Out of Stock'}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    setWishlist(newWishlist);
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        wishlist: newWishlist
      });
      toast.success(wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const processPayment = async (method: 'esewa' | 'khalti' | 'cod') => {
    if (!user) return;

    // Validation
    const errors: { [key: string]: string } = {};
    if (!deliveryDetails.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!deliveryDetails.phone.trim()) errors.phone = 'Phone Number is required';
    if (deliveryDetails.deliveryMethod !== 'pickup' && !deliveryDetails.address.trim()) errors.address = 'Delivery Address is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fill in all required fields');
      return;
    }
    setFormErrors({});

    try {
      const transaction_uuid = `${Date.now()}-${user.uid.slice(0, 5)}`;
      
      const orderData: Omit<Order, 'id'> = {
        userId: user.uid,
        items: cart,
        deliveryDetails,
        totalAmount,
        status: 'pending',
        paymentStatus: method === 'cod' ? 'unpaid' : 'unpaid', // Will be updated on success for others
        paymentMethod: method,
        timeline: [
          { 
            status: 'pending', 
            timestamp: new Date().toISOString(), 
            message: method === 'cod' ? 'Order placed with Cash on Delivery.' : 'Order placed, awaiting payment.' 
          }
        ],
        createdAt: serverTimestamp()
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      const orderId = orderRef.id;

      // Notify Admin
      await addDoc(collection(db, 'notifications'), {
        userId: 'admin',
        message: `New Order Received! Order #${orderId.slice(-6).toUpperCase()} from ${deliveryDetails.fullName}. Amount: Rs. ${totalAmount}`,
        type: 'targeted',
        read: false,
        createdAt: serverTimestamp(),
        senderId: user.uid
      });

      if (method === 'cod') {
        setCart([]);
        setIsOrderModalOpen(false);
        setActiveView('orders');
        toast.success('Order placed successfully! Please pay on delivery.');
        return;
      }

      if (method === 'esewa') {
        const product_code = import.meta.env.VITE_ESEWA_PRODUCT_CODE || 'EPAYTEST';
        const gatewayUrl = import.meta.env.VITE_ESEWA_GATEWAY_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
        
        // Get signature from backend
        const sigResponse = await fetch('/api/payment/esewa/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            transaction_uuid: orderId, // Using orderId as transaction_uuid for tracking
            product_code
          })
        });
        
        const { signature } = await sigResponse.json();

        // Create and submit form
        const form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', gatewayUrl);

        const fields = {
          amount: totalAmount.toString(),
          tax_amount: '0',
          total_amount: totalAmount.toString(),
          transaction_uuid: orderId,
          product_code: product_code,
          product_service_charge: '0',
          product_delivery_charge: '0',
          success_url: `${window.location.origin}/payment-success?orderId=${orderId}`,
          failure_url: `${window.location.origin}/payment-failure?orderId=${orderId}`,
          signed_field_names: 'total_amount,transaction_uuid,product_code',
          signature: signature
        };

        for (const [key, value] of Object.entries(fields)) {
          const input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', key);
          input.setAttribute('value', value);
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      } else if (method === 'khalti') {
        const response = await fetch('/api/payment/khalti/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            purchase_order_id: orderId,
            purchase_order_name: `Order #${orderId.slice(-6)}`,
            return_url: `${window.location.origin}/payment-success?orderId=${orderId}`
          })
        });

        const data = await response.json();
        if (data.payment_url) {
          window.location.href = data.payment_url;
        } else {
          toast.error('Failed to initiate Khalti payment');
        }
      }

      setCart([]);
      setIsOrderModalOpen(false);
      setIsCartOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    if (!isAdmin) return;
    
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    const statusMessages: Record<OrderStatus, string> = {
      pending: 'Order is pending confirmation.',
      confirmed: 'Order has been confirmed by the shop.',
      picked: 'Order has been picked up for preparation.',
      ready: 'Your cake is ready for delivery!',
      delivered: 'Order has been successfully delivered. Enjoy!',
      cancelled: 'Order has been cancelled.'
    };

    const newTimelineEvent = {
      status: newStatus,
      timestamp: new Date().toISOString(),
      message: statusMessages[newStatus]
    };

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        timeline: arrayUnion(newTimelineEvent)
      });

      // Send notification to user
      await addDoc(collection(db, 'notifications'), {
        userId: order.userId,
        message: `Your order #${orderId.slice(-6).toUpperCase()} status has been updated to: ${newStatus.toUpperCase()}. ${statusMessages[newStatus]}`,
        type: 'targeted',
        read: false,
        createdAt: serverTimestamp(),
        senderId: user?.uid
      });

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const updatePaymentStatus = async (orderId: string, newStatus: 'paid' | 'unpaid') => {
    if (!isAdmin) return;
    
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        paymentStatus: newStatus,
        timeline: arrayUnion({
          status: order.status,
          timestamp: new Date().toISOString(),
          message: `Payment status updated to ${newStatus.toUpperCase()} by admin.`
        })
      });
      toast.success(`Payment status updated to ${newStatus}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesTab = activeTab === 'all' || p.category.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [products, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fcfaf2] font-sans antialiased flex flex-col">
        <Toaster position="bottom-center" />
        
        <Navbar 
          user={user} 
          cartCount={cart.length} 
          onOpenCart={() => {
            setActiveView('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
          onSignOut={handleSignOut}
          isAdmin={isAdmin}
          onOpenAdmin={() => {
            setActiveView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenOrders={() => {
            setActiveView('orders');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenProfile={() => {
            setActiveView('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          setView={setActiveView}
          onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          unreadNotifications={notifications.filter(n => !n.read).length}
        />

        {isNotificationsOpen && (
          <div className="fixed top-24 right-6 z-[60] animate-in fade-in slide-in-from-top-4 duration-300">
            <NotificationInbox 
              notifications={notifications}
              onMarkAsRead={markNotificationAsRead}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>
        )}

        <CartNotification 
          isOpen={showCartNotification}
          product={notificationProduct}
        />

        <AddToCartModal 
          isOpen={isAddToCartModalOpen}
          onClose={() => setIsAddToCartModalOpen(false)}
          product={lastAddedProduct}
          onGoToCart={() => {
            setIsAddToCartModalOpen(false);
            setActiveView('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        
        <Routes>
          <Route path="/" element={
            <main className={`${activeView === 'admin' ? 'w-full' : 'container mx-auto px-4'} py-8 flex-1 flex flex-col`}>
              <AnimatePresence mode="wait">
                {activeView === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Hero Section */}
                    <section className="relative h-[70vh] md:h-[85vh] w-full mb-16 md:mb-24 rounded-3xl md:rounded-[4rem] overflow-hidden group shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=2000" 
                        alt="Luxury Cake" 
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/80 via-emerald-deep/20 to-transparent flex items-center px-8 md:px-24">
                        <div className="max-w-3xl">
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                          >
                            <h2 className="text-5xl sm:text-7xl md:text-[10rem] font-heading font-medium text-white mb-6 md:mb-10 leading-[0.8] tracking-tighter">
                              in Every <br /> <span className="italic text-champagne">Bite.</span>
                            </h2>
                            <p className="text-white/90 text-lg md:text-2xl font-light mb-10 md:mb-14 max-w-xl leading-relaxed">
                              Where single-origin chocolate meets centuries-old craftsmanship. Hand-delivered to your doorstep in Kathmandu.
                            </p>
                            <div className="flex flex-wrap gap-4 md:gap-8">
                              <Button 
                                className="bg-champagne hover:bg-white text-emerald-deep h-14 md:h-20 px-8 md:px-14 rounded-full font-bold text-sm md:text-base uppercase tracking-widest shadow-2xl shadow-champagne/30 transition-all hover:scale-105 active:scale-95"
                                onClick={() => document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' })}
                              >
                                Shop Collection
                              </Button>
                              <Button 
                                variant="outline"
                                className="border-white/40 text-white hover:bg-white/10 h-14 md:h-20 px-8 md:px-14 rounded-full font-bold text-sm md:text-base uppercase tracking-widest backdrop-blur-md transition-all hover:border-white"
                              >
                                Our Heritage
                              </Button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </section>

                    <VisualNav activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setActiveView('home'); }} />
                    
                    {/* Product Section */}
                    <section id="cakes" className="px-0 md:px-0">
                      <div className="mb-12 md:mb-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                          <h3 className="text-4xl md:text-8xl font-heading font-medium text-emerald-deep leading-none">Signature <br /><span className="italic text-champagne">Creations</span></h3>
                          <p className="text-[10px] md:text-xs font-bold text-emerald-deep/30 uppercase tracking-[0.5em]">Curated for your finest moments</p>
                        </div>
                        <div className="relative w-full md:w-[400px]">
                          <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-deep/20" />
                          <Input 
                            placeholder="Search our collection..." 
                            className="pl-16 w-full bg-[#f3f3f0] border-none shadow-none h-16 md:h-20 rounded-3xl focus:ring-emerald-deep/10 text-lg font-medium text-emerald-deep placeholder:text-emerald-deep/20" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={addToCart} 
                            isWishlisted={wishlist.includes(product.id)}
                            onToggleWishlist={toggleWishlist}
                          />
                        ))}
                      </div>
                    </section>

                    {/* The Process Section */}
                    <section className="mt-32 mb-20">
                      <div className="text-center mb-20 space-y-4">
                        <p className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-[0.6em]">The Process</p>
                        <h3 className="text-5xl md:text-7xl font-heading font-medium text-emerald-deep italic">Crafted with <br /> Obsessive Care</h3>
                      </div>
                      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          { title: 'You Envision', desc: 'Share your dream - the occasion, theme, flavour, and any special touches you have in mind.', icon: ImageIcon },
                          { title: 'We Design', desc: 'Our master bakers sketch and propose a bespoke design tailored to your vision.', icon: Edit3 },
                          { title: 'Baked Fresh', desc: 'Every layer is baked fresh on the morning of delivery, using organic, locally sourced ingredients.', icon: CakeIcon },
                          { title: 'Delivered Perfectly', desc: 'White-glove, temperature-controlled delivery ensures your cake arrives in pristine condition.', icon: Truck },
                        ].map((step, i) => (
                          <div key={i} className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-emerald-deep/5 shadow-sm flex flex-col gap-6 group hover:shadow-xl transition-all duration-500">
                            <div className="h-16 w-16 rounded-2xl bg-[#f3f3f0] flex items-center justify-center text-emerald-deep group-hover:bg-emerald-deep group-hover:text-white transition-all duration-500">
                              <step.icon className="h-8 w-8" strokeWidth={1} />
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-xl font-heading font-bold text-emerald-deep">{step.title}</h4>
                              <p className="text-xs text-emerald-deep/50 leading-relaxed font-medium">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Features & Trust Section */}
                    <section className="mt-20 md:mt-32 mb-16 md:mb-20">
                      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
                        <div className="bg-[#f3f3f0] p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-emerald-deep/5 shadow-sm flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl group">
                          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                            <Truck className="h-10 w-10 text-emerald-deep" strokeWidth={1} />
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-bold text-emerald-deep">Concierge Delivery</h3>
                            <p className="text-xs text-emerald-deep/50 mt-3 leading-relaxed font-medium">Hand-delivered with white-glove care to preserve every delicate detail.</p>
                          </div>
                        </div>
                        <div className="bg-[#f3f3f0] p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-emerald-deep/5 shadow-sm flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl group">
                          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                            <Star className="h-10 w-10 text-emerald-deep" strokeWidth={1} />
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-bold text-emerald-deep">Artisan Ingredients</h3>
                            <p className="text-xs text-emerald-deep/50 mt-3 leading-relaxed font-medium">We source single-origin cocoa and organic dairy for an unparalleled taste.</p>
                          </div>
                        </div>
                        <div className="bg-[#f3f3f0] p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-emerald-deep/5 shadow-sm flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl group">
                          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                            <CheckCircle2 className="h-10 w-10 text-emerald-deep" strokeWidth={1} />
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-bold text-emerald-deep">Satisfaction Guaranteed</h3>
                            <p className="text-xs text-emerald-deep/50 mt-3 leading-relaxed font-medium">Not happy? We'll make it right. Your perfect celebration moment is our promise.</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="mt-20 md:mt-32 mb-16 md:mb-20">
                      <div className="text-center mb-12 md:mb-20 space-y-4">
                        <p className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-[0.6em]">Testimonials</p>
                        <h3 className="text-3xl md:text-7xl font-heading font-medium text-emerald-deep italic">Words From Our <br /> Happy Clients</h3>
                      </div>
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {[
                          { name: 'Priya Sharma', loc: 'Lazimpat, KTM', text: 'Absolutely stunning wedding cake. Every guest kept complimenting it. The craftsmanship was beyond anything I could have imagined – worth every paisa.' },
                          { name: 'Rohan Thapa', loc: 'Patan, Lalitpur', text: 'Ordered a birthday cake for my mother. Arrived perfectly on time, tasted incredible, and looked exactly like the design I requested. Will order again!' },
                          { name: 'Sujata Rai', loc: 'Baneshwor, KTM', text: 'The anniversary cake was a masterpiece. My husband was moved to tears. Koseli has become our family\'s go-to for every occasion.' },
                          { name: 'Arjun K.C.', loc: 'Thamel, KTM', text: 'The Celebration Combo Box was an absolute hit at our office party. Premium presentation, rich flavours. Highly recommend the dark chocolate truffle.' },
                          { name: 'Nisha Bajracharya', loc: 'Jhamsikhel, Lalitpur', text: 'I\'ve ordered four times now and every cake has been perfect. The custom ordering process is so elegant. Koseli has a customer for life.' },
                          { name: 'Bikash Gurung', loc: 'Pokhara (Delivery to KTM)', text: 'Delivered all the way to Pokhara in perfect condition. The Red Velvet was the best I\'ve ever had. Koseli\'s service is truly world-class.' },
                        ].map((t, i) => (
                          <div key={i} className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-emerald-deep/5 shadow-sm space-y-6 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
                            <div className="space-y-4">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-champagne text-champagne" />)}
                              </div>
                              <p className="text-sm text-emerald-deep/70 leading-relaxed font-medium italic">"{t.text}"</p>
                            </div>
                            <div className="flex items-center gap-4 pt-6 border-t border-emerald-deep/5">
                              <div className="h-12 w-12 rounded-full bg-emerald-deep/5 flex items-center justify-center font-bold text-emerald-deep">{t.name[0]}</div>
                              <div>
                                <h4 className="text-sm font-bold text-emerald-deep">{t.name}</h4>
                                <p className="text-[10px] text-emerald-deep/40 font-bold uppercase tracking-widest">{t.loc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Brand Story Section */}
                    <section className="bg-emerald-deep text-white p-8 md:p-24 rounded-3xl md:rounded-[4rem] my-20 md:my-32 relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
                      <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div>
                          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.6em] mb-6 md:mb-8">Our Philosophy</p>
                          <h2 className="text-4xl md:text-8xl font-heading font-light text-white mb-8 md:mb-10 leading-[0.9] italic">Baking Memories, <br /> One Masterpiece <br /> at a Time.</h2>
                          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 md:mb-14 font-light max-w-lg">
                            At Koseli, we believe every celebration deserves a centerpiece as unique as the moment itself. Our master bakers craft each cake with precision, passion, and the finest ingredients sourced from around the globe.
                          </p>
                          <div className="grid grid-cols-2 sm:flex sm:gap-16 gap-8">
                            <div>
                              <p className="text-4xl md:text-6xl font-heading font-bold text-white">5k+</p>
                              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mt-3">Cakes Baked</p>
                            </div>
                            <div>
                              <p className="text-4xl md:text-6xl font-heading font-bold text-white">4.9</p>
                              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mt-3">Avg. Rating</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <p className="text-4xl md:text-6xl font-heading font-bold text-white">6yrs</p>
                              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mt-3">Of Excellence</p>
                            </div>
                          </div>
                        </div>
                        <div className="relative aspect-[4/5] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
                          <img 
                            src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1000" 
                            alt="Bakery Process" 
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeView === 'cart' && (
                  <CartPage 
                    cart={cart}
                    products={products}
                    removeFromCart={removeFromCart}
                    updateCartQuantity={updateCartQuantity}
                    totalAmount={totalAmount}
                    onCheckout={handleCheckout}
                    onExplore={() => setActiveView('home')}
                    addToCart={addToCart}
                    clearCart={() => {
                      setCart([]);
                      toast.success('Cart cleared');
                    }}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                )}

                {activeView === 'profile' && user && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-2xl mx-auto pt-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <Button variant="ghost" size="sm" onClick={() => setActiveView('home')} className="text-maroon font-bold flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back to Shop
                      </Button>
                      <h2 className="text-xl font-heading text-maroon font-bold">My Profile</h2>
                      <div className="w-20" /> {/* Spacer */}
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-maroon/5">
                      <div className="flex flex-col items-center text-center gap-4 mb-8">
                        <div className="relative">
                          <img src={user.photoURL} alt={user.displayName} className="h-28 w-28 rounded-full border-4 border-maroon/10 shadow-md object-cover" />
                          <div className="absolute bottom-0 right-0 bg-gold text-white p-1.5 rounded-full border-2 border-white">
                            <Star className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="w-full overflow-hidden">
                          <h2 className="text-2xl font-heading text-maroon font-bold truncate">{user.displayName}</h2>
                          <p className="text-muted-foreground text-sm break-all">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        {isAdmin && (
                          <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl border-maroon/10 hover:bg-maroon/5 hover:text-maroon text-base font-semibold" onClick={() => setActiveView('admin')}>
                            <LayoutDashboard className="h-5 w-5 text-gold" /> Admin Dashboard
                          </Button>
                        )}
                        <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl border-maroon/10 hover:bg-maroon/5 hover:text-maroon text-base font-semibold" onClick={() => setActiveView('orders')}>
                          <Package className="h-5 w-5 text-gold" /> My Orders
                        </Button>
                      </div>

                      {/* Wishlist Section in Profile */}
                      <div className="mt-12">
                        <div className="flex items-center gap-3 mb-6">
                          <Heart className="h-6 w-6 text-maroon fill-maroon" />
                          <h3 className="text-xl font-heading text-maroon font-bold">My Wishlist</h3>
                        </div>
                        
                        {wishlist.length === 0 ? (
                          <div className="bg-maroon/5 p-12 rounded-3xl text-center border border-dashed border-maroon/20">
                            <Heart className="h-10 w-10 text-maroon/20 mx-auto mb-3" />
                            <p className="text-maroon/60 font-medium">Your wishlist is empty</p>
                            <Button variant="link" className="text-maroon font-bold mt-2" onClick={() => setActiveView('home')}>
                              Discover something sweet
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4">
                            {products.filter(p => wishlist.includes(p.id)).map(product => (
                              <div key={product.id} className="relative group">
                                <ProductCard 
                                  product={product} 
                                  onAddToCart={addToCart} 
                                  isWishlisted={true}
                                  onToggleWishlist={toggleWishlist}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Separator className="my-8" />
                      <Button variant="destructive" className="w-full justify-start gap-4 h-14 rounded-2xl text-base font-semibold" onClick={handleSignOut}>
                        <LogOut className="h-5 w-5" /> Sign Out
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeView === 'orders' && user && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-4xl mx-auto pt-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <Button variant="ghost" size="sm" onClick={() => setActiveView('home')} className="text-maroon font-bold flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back to Shop
                      </Button>
                      <h2 className="text-xl font-heading text-maroon font-bold">My Orders</h2>
                      <div className="w-20" /> {/* Spacer */}
                    </div>
                    
                    <div className="grid gap-6">
                      {orders.length === 0 ? (
                        <div className="bg-white p-20 rounded-3xl text-center border border-maroon/5 shadow-sm">
                          <Package className="h-16 w-16 text-maroon/10 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                          <p className="text-muted-foreground mb-6">Your sweet journey starts with your first order!</p>
                          <Button className="bg-maroon hover:bg-maroon/90" onClick={() => setActiveView('home')}>Browse Cakes</Button>
                        </div>
                      ) : (
                        orders.map((order) => (
                          <Card key={order.id} className="overflow-hidden border-maroon/10 shadow-sm rounded-2xl">
                            <div className="bg-maroon h-1.5 w-full" />
                            <CardHeader className="flex flex-row items-center justify-between bg-maroon/5 py-4">
                              <div>
                                <CardTitle className="text-sm font-bold">Order #{order.id.slice(-6)}</CardTitle>
                                <CardDescription className="text-[10px] uppercase tracking-wider font-semibold">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</CardDescription>
                              </div>
                              <Badge className={
                                order.status === 'delivered' ? 'bg-green-600' : 
                                order.status === 'pending' ? 'bg-amber-500' : 
                                order.status === 'ready' ? 'bg-maroon' : 
                                order.status === 'cancelled' ? 'bg-red-600' : 'bg-blue-600'
                              }>
                                {order.status.toUpperCase()}
                              </Badge>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="grid gap-8 lg:grid-cols-3">
                                <div className="lg:col-span-2 space-y-8">
                                  {/* Map Integration */}
                                  {order.status !== 'delivered' && (
                                    <div className="space-y-4">
                                      <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold flex items-center gap-2 text-maroon uppercase tracking-widest">
                                          <MapPin className="h-4 w-4 text-gold" /> Live Tracking
                                        </p>
                                        <Badge variant="outline" className="animate-pulse bg-red-50 text-red-600 border-red-200 text-[9px] font-bold">LIVE</Badge>
                                      </div>
                                      <div className="h-48 w-full rounded-2xl overflow-hidden border border-maroon/10 shadow-inner bg-gray-100 relative">
                                        <iframe
                                          width="100%"
                                          height="100%"
                                          style={{ border: 0 }}
                                          loading="lazy"
                                          src={`https://maps.google.com/maps?q=${encodeURIComponent(order.deliveryDetails.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                          referrerPolicy="no-referrer"
                                        ></iframe>
                                        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-maroon/5 shadow-sm">
                                          <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-maroon flex items-center justify-center text-white">
                                              <Truck className="h-4 w-4" />
                                            </div>
                                            <div>
                                              <p className="text-[10px] font-bold text-maroon uppercase tracking-wider">Delivery to</p>
                                              <p className="text-xs font-medium line-clamp-1">{order.deliveryDetails.address}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="space-y-6">
                                    <p className="text-xs font-bold flex items-center gap-2 text-maroon uppercase tracking-widest">
                                      <Clock className="h-4 w-4 text-gold" /> Delivery Timeline
                                    </p>
                                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-maroon before:via-maroon/20 before:to-transparent">
                                      {order.timeline.map((event, i) => (
                                        <div key={i} className="relative flex items-start gap-6 pl-10">
                                          <div className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-md transition-all ${i === 0 ? 'bg-maroon text-white scale-110' : 'bg-maroon/10 text-maroon'}`}>
                                            {i === 0 ? <Sparkles className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                                          </div>
                                          <div className="flex-1 bg-white p-4 rounded-2xl border border-maroon/5 shadow-sm">
                                            <div className="flex justify-between items-center mb-1">
                                              <p className="text-xs font-bold text-maroon uppercase tracking-wider">{event.status}</p>
                                              <p className="text-[10px] text-muted-foreground font-medium">{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-700">{event.message}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div className="bg-maroon/5 p-6 rounded-3xl border border-maroon/10 shadow-sm h-fit">
                                    <h4 className="font-bold text-maroon text-xs uppercase tracking-[0.2em] mb-6 border-b border-maroon/10 pb-3">Order Summary</h4>
                                    <div className="space-y-4">
                                      {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                          <div className="flex flex-col">
                                            <span className="font-bold text-maroon">{item.cakeName}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</span>
                                          </div>
                                          <span className="font-bold">Rs. {item.price * item.quantity}</span>
                                        </div>
                                      ))}
                                      <Separator className="bg-maroon/10" />
                                      <div className="flex justify-between font-bold text-maroon text-lg">
                                        <span>Total</span>
                                        <span className="text-gold">Rs. {order.totalAmount}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {order.status === 'pending' && (
                                    (() => {
                                      const orderTime = order.createdAt?.seconds ? order.createdAt.seconds * 1000 : Date.now();
                                      const diffMinutes = (Date.now() - orderTime) / (1000 * 60);
                                      if (diffMinutes <= 30) {
                                        return (
                                          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-4">
                                            <div className="flex items-center gap-3 text-red-600">
                                              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                                <Clock className="h-4 w-4" />
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold uppercase tracking-wider">Cancellation Window</p>
                                                <p className="text-[10px] font-medium">You can cancel this order within {Math.ceil(30 - diffMinutes)} minutes.</p>
                                              </div>
                                            </div>
                                            <Button 
                                              variant="destructive" 
                                              className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-red-200"
                                              onClick={() => {
                                                setOrderToCancel(order.id);
                                                setIsCancelModalOpen(true);
                                              }}
                                            >
                                              Cancel Order
                                            </Button>
                                          </div>
                                        );
                                      }
                                      return null;
                                    })()
                                  )}

                                  <div className="bg-gold/10 p-6 rounded-3xl border border-gold/20">
                                    <h4 className="font-bold text-maroon text-[10px] uppercase tracking-widest mb-3">Delivery Details</h4>
                                    <div className="space-y-2 text-xs">
                                      <p className="flex items-center gap-2 font-medium"><UserIcon className="h-3 w-3 text-maroon" /> {order.deliveryDetails.fullName}</p>
                                      <p className="flex items-center gap-2 font-medium"><Phone className="h-3 w-3 text-maroon" /> {order.deliveryDetails.phone}</p>
                                      <p className="flex items-center gap-2 font-medium"><Calendar className="h-3 w-3 text-maroon" /> {new Date(order.deliveryDetails.deliveryDate).toLocaleDateString()}</p>
                                      <p className="flex items-center gap-2 font-medium"><Clock className="h-3 w-3 text-maroon" /> {order.deliveryDetails.deliveryTime}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {activeView === 'admin' && isAdmin && (
                  <motion.div
                    key="admin"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <AdminDashboard 
                      products={products}
                      orders={allOrders}
                      users={allUsers}
                      onAddProduct={() => {
                        setEditingProduct(null);
                        setProductFormData({
                          name: '',
                          description: '',
                          price: 0,
                          category: 'Birthday',
                          imageUrl: '',
                          characteristics: [],
                          inStock: true
                        });
                        setIsProductFormOpen(true);
                      }}
                      onEditProduct={(p) => {
                        setEditingProduct(p);
                        setProductFormData({
                          name: p.name,
                          description: p.description,
                          price: p.price,
                          category: p.category,
                          imageUrl: p.imageUrl,
                          characteristics: p.characteristics,
                          inStock: p.inStock
                        });
                        setIsProductFormOpen(true);
                      }}
                      onDeleteProduct={handleDeleteProduct}
                      onToggleStock={toggleStock}
                      onUpdateOrderStatus={updateOrderStatus}
                      onUpdatePaymentStatus={updatePaymentStatus}
                      onSendNotification={sendNotification}
                      onBack={() => setActiveView('home')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          } />
          <Route path="/product/:id" element={
            <ProductDetailsPage 
              products={products} 
              onAddToCart={handlePageAddToCart} 
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          } />
          <Route path="/payment-test" element={<PaymentTest />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
        </Routes>

        {activeView === 'home' && (
          <footer className="bg-emerald-deep text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
              {/* Newsletter Section */}
              <div className="bg-white/5 rounded-3xl md:rounded-[3rem] p-8 md:p-20 mb-16 md:mb-24 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
                  <div className="max-w-xl text-center lg:text-left space-y-4">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.6em]">Exclusive Updates</p>
                    <h3 className="text-3xl md:text-6xl font-heading font-medium text-white italic">Be First to Know About <br /> Seasonal Collections</h3>
                  </div>
                  <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                    <Input 
                      placeholder="your@email.com" 
                      className="bg-white/10 border-white/10 h-14 md:h-20 px-6 md:px-8 rounded-xl md:rounded-full min-w-full sm:min-w-[300px] text-base md:text-lg focus:ring-white/20 text-white placeholder:text-white/20" 
                    />
                    <Button className="bg-white text-emerald-deep hover:bg-champagne h-14 md:h-20 px-10 md:px-12 rounded-xl md:rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24">
                <div className="space-y-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold tracking-[-0.05em] font-heading text-white leading-none">KOSELI</span>
                    <span className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase mt-3 italic">Artisan Bakery</span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-light">
                    Handcrafting celebration cakes for Kathmandu\'s most cherished moments since 2020.
                  </p>
                  <div className="flex gap-6">
                    {['IG', 'FB', 'TW'].map(s => (
                      <a key={s} href="#" className="text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest">{s}</a>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Navigate</h4>
                  <nav className="flex flex-col gap-4">
                    <button onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm font-medium text-white/60 hover:text-white transition-colors text-left">Home</button>
                    <button onClick={() => document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-white/60 hover:text-white transition-colors text-left">Collection</button>
                    <button onClick={() => user ? setActiveView('orders') : setIsAuthOpen(true)} className="text-sm font-medium text-white/60 hover:text-white transition-colors text-left">My Orders</button>
                    <button onClick={() => user ? setActiveView('profile') : setIsAuthOpen(true)} className="text-sm font-medium text-white/60 hover:text-white transition-colors text-left">My Account</button>
                  </nav>
                </div>

                <div className="space-y-8">
                  <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Contact</h4>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 text-white/20 shrink-0" />
                      <p className="text-sm text-white/60 font-medium">Thamel Marg, Kathmandu <br /> Bagmati Province, Nepal</p>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="h-5 w-5 text-white/20 shrink-0" />
                      <p className="text-sm text-white/60 font-medium">+977 98-0000-0000</p>
                    </div>
                    <div className="flex gap-4">
                      <Clock className="h-5 w-5 text-white/20 shrink-0" />
                      <p className="text-sm text-white/60 font-medium">Daily 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Order Directly</h4>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-16 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/10">
                    <Phone className="h-5 w-5" />
                    <div className="text-left">
                      <p className="text-[8px] uppercase tracking-widest opacity-60">Order via</p>
                      <p className="text-sm">WhatsApp</p>
                    </div>
                  </Button>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-white/40 font-medium leading-relaxed">
                      Make, test, locate... <br /> Delivery Policy linked
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">© 2026 KOSELI ARTISAN BAKERY</p>
                <div className="flex gap-8">
                  {['Privacy Policy', 'Terms of Service', 'Delivery Policy'].map(p => (
                    <a key={p} href="#" className="text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">{p}</a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        )}

      <BottomNav 
        cartCount={cart.length} 
        onOpenCart={() => setActiveView('cart')} 
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onOpenOrders={() => setActiveView('orders')}
        onOpenProfile={() => setActiveView('profile')}
        activeView={activeView}
        setView={setActiveView}
        isAdmin={isAdmin}
      />

      {/* Floating Action Button (FAB) - Distinct Hover Feature */}
      <div className="fixed bottom-32 right-6 md:right-12 z-50 flex flex-col gap-4">
        <AnimatePresence>
          {cart.length > 0 && activeView !== 'cart' && (
            <motion.button
              initial={{ scale: 0, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0, opacity: 0, x: 50 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveView('cart')}
              className="h-14 w-14 md:h-16 md:w-16 bg-coral text-white rounded-full shadow-[0_20px_40px_rgba(255,107,107,0.4)] flex items-center justify-center relative group border-4 border-white"
            >
              <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" />
              <span className="absolute -top-2 -right-2 bg-emerald-deep text-white text-[10px] font-bold h-6 w-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                {cart.length}
              </span>
              <div className="absolute right-full mr-4 bg-emerald-deep text-white text-[10px] font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl translate-x-4 group-hover:translate-x-0">
                View Collection ({cart.length})
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-14 w-14 md:h-16 md:w-16 bg-white text-emerald-deep rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center border border-emerald-deep/5 group"
        >
          <ChevronUp className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:-translate-y-1" />
          <div className="absolute right-full mr-4 bg-emerald-deep text-white text-[10px] font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl translate-x-4 group-hover:translate-x-0">
            Scroll to Top
          </div>
        </motion.button>
      </div>

      {/* Auth Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Welcome to Koseli</DialogTitle>
            <DialogDescription className="text-center">
              Sign in to place orders and track your deliveries.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" className="flex items-center gap-2 py-6" onClick={handleSignIn}>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-maroon font-bold">Cancel Order?</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              variant="destructive" 
              className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-red-200"
              onClick={handleCancelOrder}
            >
              Yes, Cancel Order
            </Button>
            <Button 
              variant="ghost" 
              className="w-full h-12 rounded-2xl font-bold text-maroon"
              onClick={() => setIsCancelModalOpen(false)}
            >
              No, Keep Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Details Dialog */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col overflow-hidden rounded-3xl">
          <DialogHeader>
            <DialogTitle>Customize Your Cake</DialogTitle>
            <DialogDescription>Add a special touch to your {selectedProduct?.name}.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1">
            <div className="grid gap-4 py-4 pr-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name on Cake</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Happy Birthday John" 
                  value={customDetails.name}
                  onChange={(e) => setCustomDetails({...customDetails, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="design">Design Instructions</Label>
                <Input 
                  id="design" 
                  placeholder="e.g. Add extra flowers, blue theme" 
                  value={customDetails.design}
                  onChange={(e) => setCustomDetails({...customDetails, design: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-4 bg-maroon/5 w-fit p-1 rounded-xl">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg hover:bg-white text-maroon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold text-lg min-w-[20px] text-center text-maroon">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg hover:bg-white text-maroon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>Cancel</Button>
            <Button className="bg-pink-600 hover:bg-pink-700" onClick={confirmAddToCart}>Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] flex flex-col overflow-hidden rounded-3xl p-0 border-none">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Delivery Details</DialogTitle>
            <DialogDescription>Please provide your delivery information.</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Delivery Method</Label>
                <div className="flex gap-2 p-1 bg-maroon/5 rounded-2xl border border-maroon/5">
                  <Button 
                    variant="ghost"
                    className={`flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all h-10 ${deliveryDetails.deliveryMethod === 'delivery' ? 'bg-white text-maroon shadow-sm' : 'text-maroon/40 hover:text-maroon'}`}
                    onClick={() => setDeliveryDetails({...deliveryDetails, deliveryMethod: 'delivery'})}
                  >
                    <Truck className="h-3 w-3 mr-2" /> Delivery
                  </Button>
                  <Button 
                    variant="ghost"
                    className={`flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all h-10 ${deliveryDetails.deliveryMethod === 'pickup' ? 'bg-white text-maroon shadow-sm' : 'text-maroon/40 hover:text-maroon'}`}
                    onClick={() => setDeliveryDetails({...deliveryDetails, deliveryMethod: 'pickup'})}
                  >
                    <MapPin className="h-3 w-3 mr-2" /> Shop Pickup
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={deliveryDetails.fullName}
                  onChange={(e) => {
                    setDeliveryDetails({...deliveryDetails, fullName: e.target.value});
                    if (formErrors.fullName) setFormErrors({...formErrors, fullName: ''});
                  }}
                  className={`rounded-xl border-maroon/10 focus:ring-maroon ${formErrors.fullName ? "border-red-500" : ""}`}
                />
                {formErrors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{formErrors.fullName}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={deliveryDetails.phone}
                  onChange={(e) => {
                    setDeliveryDetails({...deliveryDetails, phone: e.target.value});
                    if (formErrors.phone) setFormErrors({...formErrors, phone: ''});
                  }}
                  className={`rounded-xl border-maroon/10 focus:ring-maroon ${formErrors.phone ? "border-red-500" : ""}`}
                />
                {formErrors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{formErrors.phone}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">
                  {deliveryDetails.deliveryMethod === 'pickup' ? 'Pickup Location' : 'Delivery Address'}
                </Label>
                {deliveryDetails.deliveryMethod === 'pickup' ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-maroon/5 rounded-xl border border-maroon/10 text-xs text-maroon leading-relaxed">
                      <p className="font-bold mb-1">Koseli Artisan Bakery</p>
                      <p className="opacity-70">Airy Chauraha, Dhangadhi, Nepal</p>
                      <p className="opacity-70 mt-1">Contact: +977-9800000000</p>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-maroon/10 h-40 w-full shadow-inner">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d601.7841111984694!2d80.12693025383912!3d28.96202918741089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ab006ca049cd%3A0xdae0567f45a5bbf4!2skoseli%20cake%20shop!5e0!3m2!1sen!2sus!4v1776066286313!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <Input 
                    id="address" 
                    placeholder="e.g. Airy Chauraha, House No. 12"
                    value={deliveryDetails.address}
                    onChange={(e) => {
                      setDeliveryDetails({...deliveryDetails, address: e.target.value});
                      if (formErrors.address) setFormErrors({...formErrors, address: ''});
                    }}
                    className={`rounded-xl border-maroon/10 focus:ring-maroon ${formErrors.address ? "border-red-500" : ""}`}
                  />
                )}
                {formErrors.address && deliveryDetails.deliveryMethod !== 'pickup' && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{formErrors.address}</p>}
              </div>
              <div className="grid gap-4">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Delivery Date</Label>
                <div className="flex gap-2">
                  <Button 
                    variant={deliveryDetails.deliveryDate === new Date().toISOString().split('T')[0] ? "default" : "outline"}
                    className={`flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${deliveryDetails.deliveryDate === new Date().toISOString().split('T')[0] ? 'bg-maroon text-white shadow-lg' : 'border-maroon/10 text-maroon hover:bg-maroon/5'}`}
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0];
                      setDeliveryDetails({...deliveryDetails, deliveryDate: today});
                    }}
                  >
                    Today
                  </Button>
                  <Button 
                    variant={deliveryDetails.deliveryDate === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? "default" : "outline"}
                    className={`flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${deliveryDetails.deliveryDate === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? 'bg-maroon text-white shadow-lg' : 'border-maroon/10 text-maroon hover:bg-maroon/5'}`}
                    onClick={() => {
                      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                      setDeliveryDetails({...deliveryDetails, deliveryDate: tomorrow});
                    }}
                  >
                    Tomorrow
                  </Button>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[...Array(7)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const isSelected = deliveryDetails.deliveryDate === dateStr;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setDeliveryDetails({...deliveryDetails, deliveryDate: dateStr});
                        }}
                        className={`flex flex-col items-center justify-center min-w-[60px] h-16 rounded-xl border transition-all ${
                          isSelected 
                          ? 'bg-maroon border-maroon text-white shadow-md scale-105' 
                          : 'bg-white border-maroon/10 text-gray-600 hover:border-maroon/30'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold opacity-70">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-bold">
                          {date.getDate()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-maroon/60">Delivery Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'].map((time) => {
                    const isSelected = deliveryDetails.deliveryTime === time;
                    const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    });
                    return (
                      <Button
                        key={time}
                        variant={isSelected ? "default" : "outline"}
                        className={`h-10 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                          isSelected 
                          ? 'bg-gold text-white hover:bg-gold/90 shadow-md' 
                          : 'border-maroon/10 text-maroon hover:bg-maroon/5'
                        }`}
                        onClick={() => {
                          setDeliveryDetails({...deliveryDetails, deliveryTime: time});
                        }}
                      >
                        {displayTime}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-maroon/5 p-5 rounded-2xl space-y-3 mt-4 border border-maroon/10">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-maroon/60">
                  <span>Items ({cart.length})</span>
                  <span>Rs. {totalAmount}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-maroon/60">
                  <span>{deliveryDetails.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery Fee'}</span>
                  <span className="text-green-600 font-bold">{deliveryDetails.deliveryMethod === 'pickup' ? 'AT SHOP' : 'FREE'}</span>
                </div>
                <Separator className="bg-maroon/10" />
                <div className="flex items-center justify-between font-bold text-maroon">
                  <span className="text-xs uppercase tracking-widest">Grand Total</span>
                  <span className="text-xl font-heading italic">Rs. {totalAmount}</span>
                </div>
              </div>
              
              <Separator className="my-2 bg-maroon/10" />
              <Button 
                className="w-full bg-emerald-deep hover:bg-emerald-deep/90 text-white h-16 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-emerald-deep/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  const errors: { [key: string]: string } = {};
                  if (!deliveryDetails.fullName.trim()) errors.fullName = 'Full Name is required';
                  if (!deliveryDetails.phone.trim()) errors.phone = 'Phone Number is required';
                  if (deliveryDetails.deliveryMethod !== 'pickup' && !deliveryDetails.address.trim()) errors.address = 'Delivery Address is required';

                  if (Object.keys(errors).length > 0) {
                    setFormErrors(errors);
                    toast.error('Please fill in all required fields');
                    return;
                  }
                  setFormErrors({});
                  setIsOrderModalOpen(false);
                  setIsConfirmationOpen(true);
                }}
              >
                Review Order Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] flex flex-col overflow-hidden rounded-[2.5rem] p-0 border-none shadow-2xl">
          <div className="bg-emerald-deep p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <DialogHeader className="relative z-10">
              <DialogTitle className="text-xl md:text-2xl font-heading italic">Review Your Order</DialogTitle>
              <DialogDescription className="text-white/60 text-xs">Please confirm your details before proceeding.</DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-6 md:space-y-8">
            {/* Items Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-deep uppercase tracking-[0.2em]">
                <ShoppingBag className="h-3 w-3" />
                <span>Order Summary</span>
              </div>
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-deep/5 flex items-center justify-center text-emerald-deep font-bold text-xs">
                        {item.quantity}x
                      </div>
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-emerald-deep">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-emerald-deep/5" />

            {/* Delivery Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-deep uppercase tracking-[0.2em]">
                <Truck className="h-3 w-3" />
                <span>Delivery Information</span>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 bg-emerald-deep/5 p-4 md:p-6 rounded-2xl border border-emerald-deep/10">
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/40 uppercase tracking-widest">Customer</p>
                  <p className="text-sm font-bold text-emerald-deep">{deliveryDetails.fullName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/40 uppercase tracking-widest">Contact</p>
                  <p className="text-sm font-bold text-emerald-deep">{deliveryDetails.phone}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/40 uppercase tracking-widest">
                    {deliveryDetails.deliveryMethod === 'pickup' ? 'Pickup Location' : 'Delivery Address'}
                  </p>
                  <p className="text-sm font-bold text-emerald-deep">
                    {deliveryDetails.deliveryMethod === 'pickup' ? 'Koseli Artisan Bakery, Thamel' : deliveryDetails.address}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/40 uppercase tracking-widest">Scheduled Date</p>
                  <p className="text-sm font-bold text-emerald-deep">{deliveryDetails.deliveryDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/40 uppercase tracking-widest">Preferred Time</p>
                  <p className="text-sm font-bold text-emerald-deep">{deliveryDetails.deliveryTime}</p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-emerald-deep text-white p-4 md:p-6 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-deep/20">
              <div className="space-y-1">
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Total Payable</p>
                <p className="text-2xl font-heading italic">Rs. {totalAmount}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Status</p>
                <p className="text-xs font-bold uppercase tracking-widest">Ready to Order</p>
              </div>
            </div>

            {/* Payment Selection */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-deep uppercase tracking-[0.2em]">
                <Shield className="h-3 w-3" />
                <span>Secure Payment</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-3 rounded-2xl border-emerald-deep/10 hover:border-emerald-deep/30 hover:bg-emerald-deep/5 transition-all group"
                  onClick={() => {
                    setIsConfirmationOpen(false);
                    processPayment('esewa');
                  }}
                >
                  <div className="h-10 w-16 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                    <img src="https://picsum.photos/seed/esewa/40/40" alt="eSewa" className="h-6 rounded" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">eSewa</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-3 rounded-2xl border-emerald-deep/10 hover:border-emerald-deep/30 hover:bg-emerald-deep/5 transition-all group"
                  onClick={() => {
                    setIsConfirmationOpen(false);
                    processPayment('khalti');
                  }}
                >
                  <div className="h-10 w-16 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                    <img src="https://picsum.photos/seed/khalti/40/40" alt="Khalti" className="h-6 rounded" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Khalti</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-2 h-16 rounded-2xl border-emerald-deep/10 hover:border-emerald-deep/30 hover:bg-emerald-deep/5 transition-all flex items-center justify-center gap-3"
                  onClick={() => {
                    setIsConfirmationOpen(false);
                    processPayment('cod');
                  }}
                >
                  <Truck className="h-4 w-4 text-emerald-deep" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Cash on Delivery</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 flex gap-4">
            <Button 
              variant="ghost" 
              className="flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] text-gray-400 hover:text-emerald-deep"
              onClick={() => {
                setIsConfirmationOpen(false);
                setIsOrderModalOpen(true);
              }}
            >
              Back to Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* My Account Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-maroon">My Account</DialogTitle>
            <DialogDescription>Manage your profile and track your sweet orders.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1">
            {user && (
              <div className="grid gap-6 py-6 pr-4">
                <div className="flex items-center gap-4 bg-maroon/5 p-4 rounded-2xl">
                  <img src={user.photoURL} alt={user.displayName} className="h-16 w-16 rounded-full border-2 border-maroon/10" />
                  <div>
                    <h3 className="font-bold text-lg text-maroon">{user.displayName}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  {isAdmin && (
                    <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl border-maroon/10 hover:bg-maroon/5 hover:text-maroon" onClick={() => { setActiveView('admin'); setIsProfileOpen(false); }}>
                      <LayoutDashboard className="h-5 w-5 text-gold" /> Admin Dashboard
                    </Button>
                  )}
                  <Button variant="outline" className="justify-start gap-3 h-12 rounded-xl border-maroon/10 hover:bg-maroon/5 hover:text-maroon" onClick={() => { setIsOrdersOpen(true); setIsProfileOpen(false); }}>
                    <Package className="h-5 w-5 text-gold" /> My Orders
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="destructive" className="justify-start gap-3 h-12 rounded-xl" onClick={() => { handleSignOut(); setIsProfileOpen(false); }}>
                    <LogOut className="h-5 w-5" /> Sign Out
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* My Orders Dialog */}
      <Dialog open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-maroon">My Orders</DialogTitle>
            <DialogDescription>Track your current and past cake orders.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-4">
            <div className="grid gap-6 pr-4 pb-6">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                  <div className="bg-maroon/5 p-6 rounded-full">
                    <Package className="h-12 w-12 text-maroon/20" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">No orders yet</h3>
                    <p className="text-sm text-muted-foreground">Your sweet journey starts with your first order!</p>
                  </div>
                  <Button className="bg-maroon hover:bg-maroon/90" onClick={() => setIsOrdersOpen(false)}>Browse Cakes</Button>
                </div>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden border-maroon/10 shadow-sm">
                    <div className="bg-maroon h-1.5 w-full" />
                    <CardHeader className="flex flex-row items-center justify-between bg-maroon/5 py-4">
                      <div>
                        <CardTitle className="text-sm font-bold">Order #{order.id.slice(-6)}</CardTitle>
                        <CardDescription className="text-[10px] uppercase tracking-wider font-semibold">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</CardDescription>
                      </div>
                      <Badge className={
                        order.status === 'delivered' ? 'bg-green-600' : 
                        order.status === 'pending' ? 'bg-amber-500' : 
                        order.status === 'ready' ? 'bg-maroon' : 'bg-blue-600'
                      }>
                        {order.status.toUpperCase()}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                          <p className="text-xs font-bold mb-6 flex items-center gap-2 text-maroon uppercase tracking-widest">
                            <Clock className="h-4 w-4 text-gold" /> Delivery Timeline
                          </p>
                          <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-maroon/10">
                            {order.timeline.map((t, i) => (
                              <div key={i} className="relative pl-8">
                                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-white bg-maroon shadow-md" />
                                <div className="flex flex-col gap-1.5 bg-white p-3 rounded-xl border border-maroon/5 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold uppercase tracking-wider text-maroon">{t.status}</p>
                                    <p className="text-[10px] font-medium text-muted-foreground">{new Date(t.timestamp).toLocaleString()}</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{t.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-5 bg-maroon/[0.02] p-5 rounded-2xl border border-maroon/5">
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-maroon">Rs. {order.totalAmount}</p>
                          </div>
                          <Separator className="bg-maroon/10" />
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Delivery Schedule</p>
                            <p className="text-sm font-bold text-maroon">{new Date(order.deliveryDetails.deliveryDate).toLocaleDateString()} at {new Date(`2000-01-01T${order.deliveryDetails.deliveryTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
                          </div>
                          <Separator className="bg-maroon/10" />
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Delivery Address</p>
                            <p className="text-sm font-medium text-gray-700">{order.deliveryDetails.address}</p>
                          </div>
                          <Separator className="bg-maroon/10" />
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Items</p>
                            <ul className="text-xs space-y-2">
                              {order.items.map((item, i) => (
                                <li key={i} className="flex justify-between items-center bg-white p-2 rounded-lg border border-maroon/5">
                                  <span className="font-medium">{item.cakeName}</span>
                                  <span className="bg-maroon/5 px-2 py-0.5 rounded-md font-bold text-maroon">x{item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Product Form Dialog */}
      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-maroon/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading text-maroon font-bold">{editingProduct ? 'Edit Cake' : 'Add New Cake'}</DialogTitle>
            <DialogDescription>Fill in the details for your sweet creation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="p-name" className="text-xs font-bold uppercase tracking-widest text-maroon/60">Cake Name</Label>
              <Input id="p-name" value={productFormData.name} onChange={(e) => setProductFormData({...productFormData, name: e.target.value})} className="rounded-xl border-maroon/10 focus:ring-maroon" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-desc" className="text-xs font-bold uppercase tracking-widest text-maroon/60">Description</Label>
              <Input id="p-desc" value={productFormData.description} onChange={(e) => setProductFormData({...productFormData, description: e.target.value})} className="rounded-xl border-maroon/10 focus:ring-maroon" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="p-price" className="text-xs font-bold uppercase tracking-widest text-maroon/60">Price (Rs.)</Label>
                <Input id="p-price" type="number" value={productFormData.price} onChange={(e) => setProductFormData({...productFormData, price: Number(e.target.value)})} className="rounded-xl border-maroon/10 focus:ring-maroon" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-cat" className="text-xs font-bold uppercase tracking-widest text-maroon/60">Category</Label>
                <select 
                  id="p-cat" 
                  value={productFormData.category} 
                  onChange={(e) => setProductFormData({...productFormData, category: e.target.value as any})}
                  className="flex h-10 w-full rounded-xl border border-maroon/10 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {['Birthday', 'Anniversary', 'Wedding', 'Cupcakes', 'Pastries', 'Accessories', 'Combos'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-img" className="text-xs font-bold uppercase tracking-widest text-maroon/60">Image URL</Label>
              <Input id="p-img" value={productFormData.imageUrl} onChange={(e) => setProductFormData({...productFormData, imageUrl: e.target.value})} className="rounded-xl border-maroon/10 focus:ring-maroon" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-char" className="text-xs font-bold uppercase tracking-widest text-maroon/60">Characteristics (comma separated)</Label>
              <Input id="p-char" value={productFormData.characteristics.join(', ')} onChange={(e) => setProductFormData({...productFormData, characteristics: e.target.value.split(',').map(s => s.trim())})} className="rounded-xl border-maroon/10 focus:ring-maroon" />
            </div>
            <div className="flex items-center gap-3 bg-maroon/5 p-4 rounded-2xl border border-maroon/5">
              <input 
                type="checkbox" 
                id="p-stock" 
                checked={productFormData.inStock} 
                onChange={(e) => setProductFormData({...productFormData, inStock: e.target.checked})}
                className="h-5 w-5 rounded border-maroon/20 text-maroon focus:ring-maroon"
              />
              <Label htmlFor="p-stock" className="text-xs font-bold uppercase tracking-widest text-maroon cursor-pointer">Product is In Stock</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl font-bold uppercase tracking-widest text-[10px]" onClick={() => setIsProductFormOpen(false)}>Cancel</Button>
            <Button className="bg-maroon hover:bg-maroon/90 rounded-xl font-bold uppercase tracking-widest text-[10px] px-8" onClick={handleSaveProduct}>Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
  );
}
