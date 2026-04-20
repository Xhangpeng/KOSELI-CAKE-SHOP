import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
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
  AlertTriangle,
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
  BarChart3,
  Users,
  Settings,
  MoreVertical,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUp,
  Play,
  Box,
  ChefHat,
  Camera
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
  TimelineEvent,
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

const Navbar = ({ user, cartCount, onOpenCart, onOpenAuth, onSignOut, isAdmin, onOpenAdmin, onOpenOrders, onOpenProfile, setView }: { 
  user: any, 
  cartCount: number, 
  onOpenCart: () => void, 
  onOpenAuth: () => void, 
  onSignOut: () => void,
  isAdmin: boolean,
  onOpenAdmin: () => void,
  onOpenOrders: () => void,
  onOpenProfile: () => void,
  setView: (view: any) => void
}) => (
  <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-emerald-deep/5">
    <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
      <div className="flex items-center gap-8 md:gap-12">
        <button 
          onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="h-12 w-12 md:h-14 md:w-14 bg-emerald-deep rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-deep/20 group-hover:bg-emerald-deep/90 transition-all duration-500 rotate-3 group-hover:rotate-0">
            <Cake className="h-7 w-7 md:h-8 md:w-8 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-heading font-bold tracking-[-0.05em] text-emerald-deep leading-none group-hover:text-emerald-deep/80 transition-colors duration-500 italic">KOSELI</span>
            <span className="text-[7px] md:text-[8px] font-bold tracking-[0.5em] text-emerald-deep/30 uppercase mt-1 group-hover:text-emerald-deep/50 transition-colors duration-500">Artisan Bakery</span>
          </div>
        </button>
        
        <div className="hidden lg:flex items-center gap-10">
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex items-center gap-2 bg-emerald-deep/5 px-4 py-2 rounded-full border border-emerald-deep/5">
          <MapPin className="h-3.5 w-3.5 text-emerald-deep" />
          <span className="text-[9px] font-bold text-emerald-deep/60 uppercase tracking-widest">Bheemdatt-12, Airy, Kanchanpur</span>
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
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-emerald-deep text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg">
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
                <div className="h-8 w-8 rounded-full bg-emerald-deep/10 flex items-center justify-center border border-emerald-deep/5 group-hover:border-emerald-deep/30 transition-all">
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
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep hover:text-white transition-all shadow-lg shadow-emerald-deep/10"
                  onClick={onOpenAdmin}
                >
                  <Shield className="h-5 w-5" />
                </Button>
              )}
            </div>
          ) : (
            <Button 
              className="bg-emerald-deep text-white hover:bg-emerald-deep/90 rounded-full px-6 md:px-8 h-10 md:h-12 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-emerald-deep/10 transition-all"
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
    { id: 'Birthday', name: 'Birthday Cakes', icon: CakeIcon },
    { id: 'Wedding', name: 'Wedding Cakes', icon: Heart },
    { id: 'Custom', name: 'Custom Cakes', icon: Edit3 },
    { id: 'Cupcakes', name: 'Luxury Cupcakes', icon: CakeIcon },
    { id: 'Pastries', name: 'Artisan Pastries', icon: Coffee },
    { id: 'Accessories', name: 'Celebration Extras', icon: Gift },
  ];

  return (
    <div className="w-full mb-16 md:mb-24 overflow-hidden">
      <div className="flex items-center justify-start md:justify-center gap-6 md:gap-14 overflow-x-auto no-scrollbar py-10 px-8">
        {items.map((item, idx) => {
          const isActive = activeTab === item.id;
          return (
            <button 
              key={idx}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-6 min-w-[80px] md:min-w-[120px] group transition-all"
            >
            <div className={`h-16 w-16 md:h-28 md:w-28 rounded-full flex items-center justify-center transition-all duration-1000 border-2 relative ${isActive ? 'bg-emerald-deep text-white border-white shadow-lg scale-110' : 'bg-white text-emerald-deep/30 border-emerald-deep/5 shadow-xl group-hover:border-emerald-deep/40 group-hover:text-emerald-deep group-hover:-translate-y-3'}`}>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-full bg-emerald-deep/20 blur-2xl -z-10"
                  />
                )}
                <item.icon className="h-7 w-7 md:h-12 md:w-12" strokeWidth={0.75} />
              </div>
              <span className={`text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-700 ${isActive ? 'text-emerald-deep translate-y-2' : 'text-emerald-deep/20 group-hover:text-emerald-deep'}`}>
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
            <ShoppingBag className="h-8 w-8 md:h-12 md:w-12 text-emerald-deep/20" strokeWidth={1} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-emerald-deep italic mb-4">Your collection is empty</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-12 font-medium">Begin your journey through our exquisite selection of artisanal masterpieces.</p>
          <Button 
            className="bg-emerald-deep text-white rounded-full px-8 md:px-12 h-14 md:h-16 font-bold uppercase tracking-widest hover:bg-emerald-deep/90 transition-all shadow-2xl shadow-emerald-deep/20"
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
              className="text-[10px] font-bold text-emerald-deep hover:text-emerald-deep/80 uppercase tracking-widest flex items-center gap-2"
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
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-xl space-y-8">
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
                  <span className="text-emerald-deep font-bold uppercase tracking-widest text-[10px]">COMPLIMENTARY</span>
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
              className="w-full h-14 bg-emerald-deep text-white hover:bg-emerald-deep/90 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-deep/20 transition-all flex items-center justify-center gap-3 group"
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
  const navigate = useNavigate();
  const NavItem = ({ icon: Icon, view, onClick, badge }: any) => {
    const isActive = activeView === view;
    return (
      <button 
        className={`h-14 w-14 rounded-full flex items-center justify-center transition-all relative ${isActive ? 'bg-white text-emerald-deep shadow-lg scale-110' : 'text-white/60 hover:text-white'}`} 
        onClick={() => {
          if (onClick) onClick();
          else setView(view);
        }}
      >
        <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 1.5} />
        {badge > 0 && (
          <span className="absolute top-2 right-2 h-5 w-5 bg-white text-emerald-deep text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-emerald-deep">
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px] h-20 bg-emerald-deep/80 backdrop-blur-2xl border border-white/20 flex items-center justify-around px-4 rounded-full shadow-[0_20px_50px_rgba(0,174,239,0.3)]">
      <NavItem icon={HomeIcon} view="home" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      <NavItem icon={Grid} view="menu" onClick={() => { navigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      <NavItem icon={ShoppingBag} view="cart" badge={cartCount} onClick={() => { navigate('/cart'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      <NavItem icon={User} view="profile" onClick={() => user ? navigate('/profile') : onOpenAuth()} />
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
    <Card className={`group overflow-hidden border border-emerald-deep/5 hover:border-emerald-deep/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-2xl bg-white flex flex-col h-full relative ${!product.inStock ? 'opacity-80 grayscale-[0.3]' : ''}`}>
      <div 
        className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-emerald-deep/40 backdrop-blur-[2px] flex items-center justify-center z-20">
            <Badge className="bg-white text-emerald-deep border-none px-4 py-1 rounded-sm font-bold text-[8px] uppercase tracking-widest">
              Out of Stock
            </Badge>
          </div>
        )}
        <button 
          className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 z-30 ${isWishlisted ? 'bg-emerald-deep text-white' : 'bg-white/80 text-emerald-deep hover:bg-emerald-deep hover:text-white border border-emerald-deep/5'}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div className="space-y-1">
          <h4 
            className="font-medium text-sm text-emerald-deep line-clamp-2 leading-tight cursor-pointer hover:text-emerald-deep/80 transition-colors"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.name}
          </h4>
          <p className="text-[10px] text-emerald-deep/40 font-bold uppercase tracking-widest">{product.category}</p>
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[10px] font-bold text-emerald-deep/60">Rs.</span>
            <span className="text-lg font-bold text-emerald-deep">{product.price}</span>
          </div>
          
          <Button 
            size="icon"
            className={`h-8 w-8 rounded-lg transition-all ${
              product.inStock 
                ? 'bg-emerald-deep text-white hover:bg-emerald-deep/90' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            onClick={() => product.inStock && onAddToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4" />
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
        <Button className="mt-8 bg-emerald-deep text-white hover:bg-emerald-deep/90 rounded-full px-10 h-14 font-bold text-xs uppercase tracking-widest shadow-xl" onClick={() => navigate('/')}>Back to Shop</Button>
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
          className={`rounded-full h-16 w-16 shadow-2xl transition-all duration-700 ${isWishlisted ? 'bg-emerald-deep text-white border-emerald-deep' : 'bg-white text-emerald-deep border-emerald-deep/5 hover:bg-emerald-deep hover:text-white'}`}
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

          <div className="grid gap-8 bg-emerald-deep/5 p-10 rounded-[3rem] border border-emerald-deep/5 relative overflow-hidden">
            {!product.inStock && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex items-center justify-center p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-emerald-deep/10 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-emerald-deep" />
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-emerald-deep italic">Currently Unavailable</h4>
                  <p className="text-sm text-muted-foreground font-medium">This masterpiece is currently out of stock. Please check back later or explore our other creations.</p>
                  <Button variant="outline" className="rounded-full border-emerald-deep/20 text-emerald-deep font-bold uppercase tracking-widest text-[10px] mt-2" onClick={() => navigate('/')}>Return to Collection</Button>
                </div>
              </div>
            )}
            <div className="grid gap-4">
              <Label htmlFor="page-name" className="text-emerald-deep font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Calligraphy Request</Label>
              <Input 
                id="page-name" 
                placeholder="e.g. Happy Birthday Isabella" 
                className="h-16 rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep bg-white shadow-sm"
                value={custom.name}
                onChange={(e) => setCustom({...custom, name: e.target.value})}
              />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="page-design" className="text-emerald-deep font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Bespoke Instructions</Label>
              <Input 
                id="page-design" 
                placeholder="e.g. Blue and white theme" 
                className="h-16 rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep bg-white shadow-sm"
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
                className="flex-1 bg-emerald-deep hover:bg-emerald-deep/90 text-white h-16 md:h-20 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest shadow-2xl shadow-emerald-deep/20 transition-all active:scale-95 flex items-center justify-center gap-4"
                onClick={() => {
                  onAddToCart(product, qty, custom);
                  toast.success('Added to your collection');
                }}
              >
                Add <ShoppingBag className="h-5 w-5" strokeWidth={1} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 rounded-[2rem] border border-emerald-deep/5 bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-emerald-deep/5 flex items-center justify-center">
                <Clock className="h-6 w-6 text-emerald-deep" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.2em]">Preparation</p>
                <p className="text-xs text-muted-foreground font-medium">4-6 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-[2rem] border border-emerald-deep/5 bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-emerald-deep/5 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-emerald-deep" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.2em]">Delivery</p>
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
      <div className="min-h-screen flex items-center justify-center bg-emerald-deep/5 p-4">
        <Card className="max-w-md w-full text-center p-8 rounded-3xl border-emerald-deep/10 shadow-xl">
          <div className="flex justify-center mb-6">
            <Loader2 className="h-12 w-12 text-emerald-deep animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-deep mb-2">Verifying Payment...</h2>
          <p className="text-muted-foreground">Please wait while we confirm your transaction with the bank.</p>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-deep/5 p-4">
        <Card className="max-w-md w-full text-center p-8 rounded-3xl border-emerald-deep/10 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-deep/10 p-4 rounded-full">
              <X className="h-12 w-12 text-emerald-deep" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-emerald-deep mb-2">Verification Failed</h2>
          <p className="text-muted-foreground mb-8">We couldn't verify your payment. If you've been charged, please contact our support team.</p>
          <Button className="w-full bg-emerald-deep hover:bg-emerald-deep/90 h-12 rounded-xl" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-deep/5 p-4">
      <Card className="max-w-md w-full text-center p-8 rounded-3xl border-emerald-deep/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-deep/10 p-4 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-emerald-deep" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-emerald-deep mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8">Your order #{orderId?.slice(-6)} has been confirmed and is being prepared with love.</p>
        <Button className="w-full bg-emerald-deep hover:bg-emerald-deep/90 h-12 rounded-xl" onClick={() => navigate('/')}>
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
    <div className="min-h-screen flex items-center justify-center bg-emerald-deep/5 p-4">
      <Card className="max-w-md w-full text-center p-8 rounded-3xl border-emerald-deep/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-deep/10 p-4 rounded-full">
            <X className="h-12 w-12 text-emerald-deep" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-emerald-deep mb-2">Payment Failed</h2>
        <p className="text-muted-foreground mb-8">We couldn't process your payment for order #{orderId?.slice(-6)}. Please try again or contact support.</p>
        <Button className="w-full bg-emerald-deep hover:bg-emerald-deep/90 h-12 rounded-xl" onClick={() => navigate('/')}>
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
      <div className="p-6 bg-white border-b border-emerald-deep/5 text-emerald-deep flex items-center justify-between">
        <h3 className="font-heading font-bold text-xl">Notifications</h3>
        <Button variant="ghost" size="icon" className="text-emerald-deep/40 hover:text-emerald-deep hover:bg-emerald-deep/5" onClick={onClose}>
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
                  <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${notif.read ? 'bg-transparent' : 'bg-emerald-deep'}`} />
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

const CartNotification = ({ product, isOpen, onClick }: { product: Product | null, isOpen: boolean, onClick: () => void }) => {
  if (!product) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md focus:outline-none group"
        >
          <div className="bg-emerald-deep/95 backdrop-blur-xl border border-white/20 rounded-[3rem] p-3 shadow-[0_40px_80px_rgba(0,174,239,0.4)] flex items-center justify-between transition-all group-hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex items-center gap-5 pl-5">
              <div className="h-14 w-14 rounded-[1.5rem] bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-emerald-deep transition-all duration-500">
                <ShoppingBag className="h-7 w-7 transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-heading font-bold text-xl leading-tight italic">{product.name}</span>
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Added to collection • Tap to view</span>
              </div>
            </div>
            <div className="h-14 w-14 rounded-[1.5rem] bg-white/10 flex items-center justify-center mr-1 group-hover:bg-white group-hover:text-emerald-deep transition-all duration-500">
              <ArrowRight className="h-7 w-7 transition-colors" />
            </div>
          </div>
        </motion.button>
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
        className="sm:max-w-[500px] w-[95vw] rounded-[4rem] border-none shadow-[0_50px_100px_rgba(0,0,0,0.2)] p-0 overflow-hidden cursor-pointer group"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          onGoToCart();
        }}
      >
        <div className="bg-emerald-deep p-12 md:p-16 text-white text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="h-24 w-24 md:h-32 md:w-32 bg-white/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-2xl"
          >
            <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-white" strokeWidth={1.5} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading font-bold italic tracking-tight uppercase">Exquisite Choice</h2>
            <p className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em]">This masterpiece was added to cart</p>
          </div>
        </div>
        
        <div className="p-10 md:p-12 space-y-12 bg-white">
          <div className="flex items-center gap-8 bg-emerald-deep/[0.03] p-8 rounded-[3.5rem] border border-emerald-deep/5 shadow-inner">
            <div className="h-28 w-28 md:h-40 md:w-40 rounded-[2.5rem] overflow-hidden shrink-0 border border-emerald-deep/10 shadow-2xl">
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-heading font-bold text-emerald-deep text-2xl md:text-3xl leading-tight italic">{product.name}</h4>
              <p className="text-[10px] md:text-xs text-emerald-deep/40 font-bold uppercase tracking-[0.3em]">{product.category}</p>
              <div className="pt-4 flex items-baseline gap-2">
                <span className="text-sm font-bold text-emerald-deep/20 uppercase tracking-widest leading-none">Value</span>
                <span className="font-heading font-bold text-3xl md:text-4xl text-emerald-deep tracking-tighter leading-none italic">Rs. {product.price}</span>
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
              className="h-14 md:h-16 rounded-2xl bg-emerald-deep text-white font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-deep/90 shadow-xl shadow-emerald-deep/10 transition-all"
              onClick={onGoToCart}
            >
              Go to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SearchOverlay = ({ isOpen, onClose, searchQuery, onSearchChange, products }: { 
  isOpen: boolean, 
  onClose: () => void, 
  searchQuery: string, 
  onSearchChange: (q: string) => void,
  products: Product[]
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-emerald-deep/95 backdrop-blur-2xl flex flex-col p-8 md:p-24"
      >
        <div className="container mx-auto max-w-5xl flex flex-col h-full">
          <div className="flex justify-between items-center mb-16 md:mb-24">
            <div className="flex flex-col">
              <span className="text-3xl md:text-5xl font-heading font-bold text-white italic tracking-tighter">Search Collection</span>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mt-2">Find your perfect masterpiece</span>
            </div>
            <Button variant="ghost" size="icon" className="h-16 w-16 rounded-full text-white/40 hover:text-white hover:bg-white/10" onClick={onClose}>
              <X className="h-8 w-8" />
            </Button>
          </div>

          <div className="relative mb-16 md:mb-24">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 text-emerald-deep" strokeWidth={1.5} />
            <input 
              autoFocus
              placeholder="Type to explore..." 
              className="w-full bg-transparent border-b-2 border-white/10 focus:border-emerald-deep outline-none py-8 pl-16 text-3xl md:text-6xl font-heading font-bold text-white placeholder:text-white/10 transition-all"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <ScrollArea className="flex-1">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {searchQuery && products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => { onClose(); /* navigate to product */ }}
                >
                  <div className="h-20 w-20 rounded-2xl overflow-hidden bg-white/10 shrink-0">
                    <img src={product.imageUrl} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold text-white italic">{product.name}</h4>
                    <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-widest mt-1">Rs. {product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {!searchQuery && (
              <div className="grid gap-12 grid-cols-2 md:grid-cols-4">
                {['Birthday', 'Wedding', 'Cupcakes', 'Pastries'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => { onSearchChange(cat); }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-deep group-hover:text-white transition-all duration-500">
                      <Cake className="h-8 w-8" />
                    </div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white">{cat}</span>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const QuickSidebar = ({ 
  cart, 
  onClose, 
  onRemove, 
  onUpdateQuantity, 
  totalAmount, 
  onCheckout 
}: { 
  cart: OrderItem[], 
  onClose: () => void, 
  onRemove: (i: number) => void, 
  onUpdateQuantity: (i: number, d: number) => void,
  totalAmount: number,
  onCheckout: () => void
}) => (
  <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[100] shadow-[-20px_0_80px_rgba(0,0,0,0.15)] flex flex-col border-l border-emerald-deep/5"
  >
    <div className="p-8 md:p-10 border-b border-emerald-deep/5 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-emerald-deep italic">Your Collection</h3>
        <p className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-[0.3em] mt-1">{cart.length} Masterpieces selected</p>
      </div>
      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-emerald-deep/5" onClick={onClose}>
        <X className="h-6 w-6 text-emerald-deep/40" />
      </Button>
    </div>

    <ScrollArea className="flex-1 p-8 md:p-10">
      {cart.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6">
          <div className="h-20 w-20 rounded-full bg-emerald-deep/5 flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-emerald-deep/20" />
          </div>
          <p className="text-sm font-medium text-emerald-deep/40 italic">Your collection awaits its first masterpiece.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {cart.map((item, idx) => (
            <div key={idx} className="flex gap-6 group">
              <div className="h-24 w-24 rounded-2xl overflow-hidden bg-muted shrink-0 border border-emerald-deep/5 shadow-sm">
                <img src={item.imageUrl} alt={item.cakeName} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-heading font-bold text-lg text-emerald-deep italic leading-tight">{item.cakeName}</h4>
                    <p className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest mt-1">Rs. {item.price}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-emerald-deep/40 hover:text-emerald-deep hover:bg-emerald-deep/5" onClick={() => onRemove(idx)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-emerald-deep/5 rounded-full px-3 py-1">
                    <button onClick={() => onUpdateQuantity(idx, -1)} className="text-emerald-deep/40 hover:text-emerald-deep transition-colors"><Minus className="h-3 w-3" /></button>
                    <span className="text-xs font-bold text-emerald-deep w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(idx, 1)} className="text-emerald-deep/40 hover:text-emerald-deep transition-colors"><Plus className="h-3 w-3" /></button>
                  </div>
                  <span className="text-sm font-bold text-emerald-deep/60">Rs. {item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>

    <div className="p-8 md:p-10 bg-white border-t border-emerald-deep/5 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-[0.3em] mb-1">Total Investment</p>
          <p className="text-3xl md:text-4xl font-heading font-bold text-emerald-deep italic">Rs. {totalAmount}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-emerald-deep/20 uppercase tracking-widest">Incl. all taxes</p>
        </div>
      </div>
      <Button 
        disabled={cart.length === 0}
        className="w-full h-16 md:h-20 bg-emerald-deep text-white hover:bg-emerald-deep/90 rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.4em] transition-all shadow-2xl shadow-emerald-deep/20 flex items-center justify-center gap-4"
        onClick={onCheckout}
      >
        Checkout Now <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  </motion.div>
);

const ArtisanSelect = ({ 
  value, 
  options, 
  onSelect,
  className = "",
  renderIcon
}: { 
  value: string, 
  options: { label: string, value: string, icon?: any, color?: string }[], 
  onSelect: (v: string) => void,
  className?: string,
  renderIcon?: (v: string) => any
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption = options.find(o => o.value === value) || options[0];

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full group bg-emerald-deep/5 border border-emerald-deep/5 hover:border-emerald-deep/10 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 min-w-[160px]"
      >
        <div className="flex items-center gap-3">
          {activeOption.icon && <activeOption.icon className="h-3.5 w-3.5 text-emerald-deep/40" />}
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep">
            {activeOption.label}
          </span>
        </div>
        <ChevronRight className={`h-4 w-4 text-emerald-deep/20 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-emerald-deep/10 rounded-3xl shadow-2xl shadow-emerald-deep/10 overflow-hidden p-2"
            >
              <div className="space-y-1">
                {options.map((opt, i) => {
                  const Icon = opt.icon;
                  const isCurrent = opt.value === value;

                  return (
                    <motion.button
                      key={opt.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { onSelect(opt.value); setIsOpen(false); }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group relative ${
                        isCurrent ? 'bg-emerald-deep text-white shadow-lg' : 
                        'hover:bg-emerald-deep/5 text-emerald-deep/60 hover:text-emerald-deep'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className={`h-4 w-4 ${isCurrent ? 'text-white' : 'text-current'}`} />}
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                          {opt.label}
                        </span>
                      </div>
                      {isCurrent && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatusPicker = ({ 
  currentStatus, 
  timeline, 
  onUpdate 
}: { 
  currentStatus: OrderStatus, 
  timeline: TimelineEvent[], 
  onUpdate: (s: OrderStatus) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'picked', 'ready', 'delivered'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  const lastEvent = timeline[timeline.length - 1];
  const previousStatus = timeline.length > 1 ? timeline[timeline.length - 2]?.status : null;
  const canReverse = useMemo(() => {
    if (!lastEvent || !previousStatus) return false;
    const updateTime = new Date(lastEvent.timestamp).getTime();
    const now = new Date().getTime();
    const diff = (now - updateTime) / 1000 / 60;
    return diff < 5;
  }, [lastEvent, previousStatus, currentStatus]);

  useEffect(() => {
    if (!canReverse || !lastEvent) {
      setTimeLeft(null);
      return;
    }
    
    const interval = setInterval(() => {
      const updateTime = new Date(lastEvent.timestamp).getTime();
      const now = new Date().getTime();
      const diffMs = 5 * 60 * 1000 - (now - updateTime);
      if (diffMs <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        setTimeLeft(Math.floor(diffMs / 1000));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [canReverse, lastEvent]);

  const getStatusIcon = (s: OrderStatus) => {
    switch(s) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle2;
      case 'picked': return Package;
      case 'ready': return Cake;
      case 'delivered': return Truck;
      case 'cancelled': return AlertTriangle;
      default: return Clock;
    }
  };

  const isStatusDisabled = (s: OrderStatus) => {
    if (s === 'cancelled') return false; 
    if (s === currentStatus) return false;
    
    const targetIndex = statusOrder.indexOf(s);
    if (targetIndex > currentIndex) return false; 
    
    if (s === previousStatus && timeLeft !== null) return false;
    
    return true;
  };

  const options = ['pending', 'confirmed', 'picked', 'ready', 'delivered', 'cancelled'].map(s => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
    icon: getStatusIcon(s as OrderStatus),
    isDisabled: isStatusDisabled(s as OrderStatus),
    isUndo: s === previousStatus && timeLeft !== null
  }));

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group border rounded-2xl px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 min-w-[200px] ${
          currentStatus === 'cancelled' 
            ? 'bg-red-50 border-red-200 text-red-600 shadow-lg shadow-red-500/10' 
            : 'bg-emerald-deep/5 border-emerald-deep/5 hover:border-emerald-deep/10 text-emerald-deep'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`h-2 w-2 rounded-full animate-pulse ${currentStatus === 'cancelled' ? 'bg-red-500' : 'bg-emerald-deep'}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {currentStatus}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {timeLeft !== null && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-deep/10 rounded-full animate-in fade-in zoom-in duration-300">
               <History className="h-2.5 w-2.5 text-emerald-deep/60" />
               <span className="text-[8px] font-bold text-emerald-deep tabular-nums">
                 {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
               </span>
            </div>
          )}
          <ChevronRight className={`h-4 w-4 text-emerald-deep/20 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-emerald-deep/10 rounded-3xl shadow-2xl shadow-emerald-deep/10 overflow-hidden p-2"
            >
              <div className="space-y-1">
                {options.map((opt, i) => {
                  const isCancelled = opt.value === 'cancelled';
                  
                  return (
                    <React.Fragment key={opt.value}>
                      {isCancelled && <div className="h-px bg-emerald-deep/5 my-2 mx-2" />}
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        disabled={opt.isDisabled}
                        onClick={() => { onUpdate(opt.value as OrderStatus); setIsOpen(false); }}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group relative ${
                          opt.isDisabled ? 'opacity-20 grayscale cursor-not-allowed' : 
                          opt.value === currentStatus ? (isCancelled ? 'bg-red-500 text-white shadow-lg' : 'bg-emerald-deep text-white shadow-lg') : 
                          isCancelled ? 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700' :
                          opt.isUndo ? 'bg-amber-50 text-amber-700' :
                          'hover:bg-emerald-deep/5 text-emerald-deep/60 hover:text-emerald-deep'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <opt.icon className={`h-4 w-4 ${opt.value === currentStatus ? 'text-white' : 'text-current'} ${isCancelled && opt.value !== currentStatus ? 'animate-pulse' : ''}`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                            {opt.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {opt.isUndo && (
                              <span className="text-[8px] font-bold uppercase tracking-widest text-amber-600/60 ring-1 ring-amber-600/20 px-1.5 py-0.5 rounded-full">Undo</span>
                            )}
                            {opt.value === currentStatus && <CheckCircle2 className="h-3 w-3 text-white" />}
                            {isCancelled && opt.value !== currentStatus && <AlertCircle className="h-3 w-3 text-red-400" />}
                          </div>
                      </motion.button>
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
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
  onBack: () => void
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  const [trackId, setTrackId] = useState('');

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);
  
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.totalAmount, 0),
    pendingCount: orders.filter(o => o.status === 'pending').length,
    cancelledCount: orders.filter(o => o.status === 'cancelled').length,
    deliveredCount: orders.filter(o => o.status === 'delivered').length,
    avgOrderValue: orders.length > 0 ? Math.round(orders.reduce((acc, o) => acc + o.totalAmount, 0) / orders.length) : 0
  };

  // Mock data for charts
  const revenueData = [
    { name: 'Mon', revenue: 4500 },
    { name: 'Tue', revenue: 5200 },
    { name: 'Wed', revenue: 4800 },
    { name: 'Thu', revenue: 6100 },
    { name: 'Fri', revenue: 5900 },
    { name: 'Sat', revenue: 7500 },
    { name: 'Sun', revenue: 8200 },
  ];

  const categoryData = [
    { name: 'Cakes', value: 45 },
    { name: 'Cupcakes', value: 25 },
    { name: 'Pastries', value: 20 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#00adef', '#0084b5', '#0054A6', '#FFFFFF'];

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === id ? 'bg-emerald-deep text-white shadow-xl shadow-emerald-deep/20' : 'text-emerald-deep/40 hover:bg-emerald-deep/5 hover:text-emerald-deep'}`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Admin Sidebar */}
      <aside className="w-80 border-r border-emerald-deep/5 p-8 flex flex-col gap-12 sticky top-0 h-screen bg-white hidden lg:flex">
        <div className="flex flex-col">
          <span className="text-3xl font-heading font-bold tracking-tighter text-emerald-deep italic">Admin Panel</span>
          <span className="text-[8px] font-bold tracking-[0.4em] text-emerald-deep/20 uppercase mt-1">Koseli Management</span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem id="dashboard" label="Dashboard" icon={BarChart3} />
          <SidebarItem id="products" label="Products" icon={Grid} />
          <SidebarItem id="orders" label="Orders" icon={ShoppingBag} />
          <SidebarItem id="users" label="Customers" icon={Users} />
          <SidebarItem id="settings" label="Control Panel" icon={Shield} />
        </nav>

        <div className="mt-auto pt-8 border-t border-emerald-deep/5">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start gap-4 px-6 py-4 rounded-2xl text-emerald-deep hover:bg-emerald-deep/5 transition-all"
            onClick={onBack}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Exit Admin</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        {/* Mobile Admin Navigation */}
        <div className="lg:hidden mb-12 flex items-center justify-between bg-white p-4 rounded-2xl border border-emerald-deep/5 shadow-sm">
          <div className="flex flex-col">
            <span className="text-xl font-heading font-bold text-emerald-deep italic">Admin Panel</span>
            <span className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest">{activeTab}</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-emerald-deep/5 text-emerald-deep">
                <LayoutDashboard className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-8 flex flex-col gap-12 bg-white">
              <div className="flex flex-col">
                <span className="text-3xl font-heading font-bold tracking-tighter text-emerald-deep italic">Admin Panel</span>
                <span className="text-[8px] font-bold tracking-[0.4em] text-emerald-deep/20 uppercase mt-1">Koseli Management</span>
              </div>
              <nav className="flex flex-col gap-2">
                <SidebarItem id="dashboard" label="Dashboard" icon={BarChart3} />
                <SidebarItem id="products" label="Products" icon={Grid} />
                <SidebarItem id="orders" label="Orders" icon={ShoppingBag} />
                <SidebarItem id="users" label="Customers" icon={Users} />
                <SidebarItem id="settings" label="Control Panel" icon={Shield} />
              </nav>
              <div className="mt-auto pt-8 border-t border-emerald-deep/5">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-start gap-4 px-6 py-4 rounded-2xl text-emerald-deep hover:bg-emerald-deep/5 transition-all"
                  onClick={onBack}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Exit Admin</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-emerald-deep tracking-tighter italic capitalize">
                {activeTab === 'settings' ? 'Control Panel' : activeTab}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-2 w-2 rounded-full bg-emerald-deep animate-pulse" />
                <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-[0.4em]">Live System Status: Operational</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-14 w-14 rounded-full border-emerald-deep/10 text-emerald-deep">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: `Rs. ${stats.totalRevenue}`, icon: TrendingUp, trend: '+12.5%', isUp: true },
                { label: 'Active Orders', value: stats.pendingCount, icon: ShoppingBag, trend: '+4', isUp: true },
                { label: 'Avg. Order', value: `Rs. ${stats.avgOrderValue}`, icon: Zap, trend: '-2.1%', isUp: false },
                { label: 'Total Customers', value: users.length, icon: Users, trend: '+8', isUp: true },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-sm space-y-4 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-deep/5 flex items-center justify-center text-emerald-deep">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold ${stat.isUp ? 'bg-emerald-deep/10 text-emerald-deep' : 'bg-emerald-deep/5 text-emerald-deep/60'}`}>
                      {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-heading font-bold text-emerald-deep mt-1">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-emerald-deep/5 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-emerald-deep italic">Revenue Overview</h3>
                  <select className="bg-emerald-deep/5 border-none rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-deep outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00adef" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#00adef" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f9ff" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#00adef', opacity: 0.4}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#00adef', opacity: 0.4}} />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#00adef', borderRadius: '16px', border: 'none', color: '#fff'}}
                        itemStyle={{color: '#fff', fontSize: '12px', fontWeight: 700}}
                        labelStyle={{display: 'none'}}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#00adef" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-emerald-deep/5 shadow-sm space-y-8 flex-1">
                  <h3 className="text-xl font-heading font-bold text-emerald-deep italic">Sales by Category</h3>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {categoryData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[i]}} />
                          <span className="text-[10px] font-bold text-emerald-deep/60 uppercase tracking-widest">{item.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-deep uppercase tracking-widest">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-deep p-10 rounded-[3rem] shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold text-emerald-deep uppercase tracking-[0.4em] mb-2">System Health</p>
                    <h4 className="text-2xl font-heading font-bold text-white italic">Artisan Network</h4>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Server Load</span>
                        <span className="text-[10px] text-emerald-deep font-bold uppercase tracking-widest">2.4%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[24%] h-full bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders Table */}
              <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-emerald-deep/5 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-emerald-deep italic">Recent Masterpieces</h3>
                  <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-emerald-deep/40 hover:text-emerald-deep">View All Orders</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-emerald-deep/5">
                        <th className="pb-6 text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest">Order ID</th>
                        <th className="pb-6 text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest">Customer</th>
                        <th className="pb-6 text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest">Status</th>
                        <th className="pb-6 text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest">Amount</th>
                        <th className="pb-6 text-[10px] font-bold text-emerald-deep/30 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-deep/5">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="group hover:bg-emerald-deep/[0.02] transition-colors">
                          <td className="py-6 text-[11px] font-bold text-emerald-deep">#{order.id.slice(-6).toUpperCase()}</td>
                          <td className="py-6">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-emerald-deep italic">{order.deliveryDetails.fullName}</span>
                              <span className="text-[9px] text-emerald-deep/40 font-bold uppercase tracking-widest">{order.deliveryDetails.phone}</span>
                            </div>
                          </td>
                          <td className="py-6">
                            <Badge className={`px-4 py-1.5 rounded-full font-bold text-[9px] uppercase tracking-widest border-none ${
                              order.status === 'delivered' ? 'bg-emerald-deep text-white' :
                              order.status === 'pending' ? 'bg-emerald-deep/60 text-white' :
                              order.status === 'cancelled' ? 'bg-emerald-deep/40 text-white' :
                              'bg-emerald-deep/80 text-white'
                            }`}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-6 text-sm font-bold text-emerald-deep/60">Rs. {order.totalAmount}</td>
                          <td className="py-6">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-emerald-deep/5" onClick={() => { setOrderFilter('all'); setActiveTab('orders'); }}>
                              <Eye className="h-4 w-4 text-emerald-deep/40" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-white p-10 rounded-[3rem] border border-emerald-deep/5 shadow-sm space-y-8">
                <h3 className="text-xl font-heading font-bold text-emerald-deep italic">Live Activity</h3>
                <div className="space-y-8">
                  {orders.slice(0, 6).map((order, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i !== 5 && <div className="absolute left-5 top-10 bottom-0 w-px bg-emerald-deep/5" />}
                      <div className="h-10 w-10 rounded-full bg-emerald-deep/5 flex items-center justify-center shrink-0 text-emerald-deep">
                        {order.status === 'delivered' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-deep">
                          Order <span className="text-emerald-deep">#{order.id.slice(-6).toUpperCase()}</span> {order.status}
                        </p>
                        <p className="text-[9px] text-emerald-deep/40 font-bold uppercase tracking-widest">
                          {order.createdAt ? new Date(order.createdAt?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-sm flex flex-col md:flex-row items-center gap-10 group hover:shadow-2xl transition-all duration-700">
                  <div className="h-32 w-32 rounded-[2rem] overflow-hidden bg-muted shrink-0 border border-emerald-deep/5 shadow-lg">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h4 className="font-heading font-bold text-2xl text-emerald-deep italic">{product.name}</h4>
                    <p className="text-[10px] text-emerald-deep/30 font-bold uppercase tracking-[0.3em]">{product.category}</p>
                    <div className="flex items-baseline gap-1 justify-center md:justify-start mt-4">
                      <span className="text-[10px] font-bold text-emerald-deep/20">Rs.</span>
                      <span className="font-heading font-bold text-2xl text-emerald-deep/60 tracking-tighter">{product.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <div className="flex items-center gap-4 bg-emerald-deep/5 px-6 py-3 rounded-full border border-emerald-deep/5">
                      <div className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-emerald-deep animate-pulse' : 'bg-emerald-deep/20'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${product.inStock ? 'text-emerald-deep' : 'text-emerald-deep/40'}`}>
                        {product.inStock ? 'Available' : 'Sold Out'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-10 px-6 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${product.inStock ? 'bg-emerald-deep text-white hover:bg-emerald-deep/90' : 'bg-emerald-deep/20 text-emerald-deep hover:bg-emerald-deep/30'}`}
                        onClick={() => onToggleStock(product.id, !product.inStock)}
                      >
                        Toggle
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-14 w-14 rounded-full border-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep hover:text-white transition-all shadow-sm"
                        onClick={() => onEditProduct(product)}
                      >
                        <Edit3 className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-14 w-14 rounded-full border-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep hover:text-white transition-all shadow-sm"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-wrap gap-4">
              {['all', 'pending', 'confirmed', 'picked', 'ready', 'delivered', 'cancelled'].map((status) => (
                <Button
                  key={status}
                  variant={orderFilter === status ? 'default' : 'outline'}
                  className={`rounded-full px-8 h-12 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    orderFilter === status ? 'bg-emerald-deep text-white shadow-xl shadow-emerald-deep/20' : 'border-emerald-deep/10 text-emerald-deep hover:bg-emerald-deep/5'
                  }`}
                  onClick={() => setOrderFilter(status as any)}
                >
                  {status} <span className="ml-2 opacity-40">({status === 'all' ? orders.length : orders.filter(o => o.status === status).length})</span>
                </Button>
              ))}
            </div>

            <div className="grid gap-8">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white p-10 rounded-[3.5rem] border border-emerald-deep/5 shadow-sm space-y-10 hover:shadow-2xl transition-all duration-700">
                  <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-emerald-deep/5 pb-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <h4 className="font-heading font-bold text-3xl text-emerald-deep italic">Order #{order.readableId || order.id.slice(-6).toUpperCase()}</h4>
                        <Badge className={`px-4 py-1.5 rounded-full font-bold text-[9px] uppercase tracking-widest border-none ${
                          order.status === 'delivered' ? 'bg-emerald-deep text-white' :
                          order.status === 'cancelled' ? 'bg-emerald-deep/40 text-white' :
                          'bg-emerald-deep text-white'
                        }`}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-emerald-deep/30 font-bold uppercase tracking-[0.4em]">Placed on {new Date(order.createdAt?.toDate?.() || order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-emerald-deep/30 uppercase tracking-widest ml-4">Order Status</span>
                        <StatusPicker 
                          currentStatus={order.status} 
                          timeline={order.timeline} 
                          onUpdate={(s) => onUpdateOrderStatus(order.id, s)}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-emerald-deep/30 uppercase tracking-widest ml-4">Payment</span>
                        <ArtisanSelect 
                          value={order.paymentStatus}
                          options={[
                            { label: 'Unpaid', value: 'unpaid', icon: Clock },
                            { label: 'Paid', value: 'paid', icon: CheckCircle2 }
                          ]}
                          onSelect={(v) => onUpdatePaymentStatus(order.id, v as 'paid' | 'unpaid')}
                          className="min-w-[140px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <UserIcon className="h-4 w-4 text-emerald-deep" />
                        <h5 className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.3em]">Customer Info</h5>
                      </div>
                      <div className="space-y-2 bg-emerald-deep/[0.02] p-6 rounded-3xl border border-emerald-deep/5">
                        <p className="text-lg font-heading font-bold text-emerald-deep italic">{order.deliveryDetails.fullName}</p>
                        <p className="text-sm font-medium text-emerald-deep/60">{order.deliveryDetails.phone}</p>
                        <p className="text-sm text-emerald-deep/40 leading-relaxed italic">{order.deliveryDetails.address}</p>
                        <div className="pt-4 flex items-center gap-2">
                          <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-emerald-deep/10 text-emerald-deep/60">{order.paymentMethod.toUpperCase()}</Badge>
                          <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-emerald-deep/10 text-emerald-deep/60">{order.deliveryDetails.deliveryMethod}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-4 w-4 text-emerald-deep" />
                        <h5 className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.3em]">Collection Items</h5>
                      </div>
                      <div className="space-y-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-deep/[0.02] transition-colors border border-transparent hover:border-emerald-deep/5">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-emerald-deep/5 flex items-center justify-center text-emerald-deep font-heading font-bold italic">
                                {item.quantity}x
                              </div>
                              <span className="font-heading font-bold text-lg text-emerald-deep italic">{item.cakeName}</span>
                            </div>
                            <span className="font-bold text-emerald-deep/40">Rs. {item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="pt-6 border-t border-emerald-deep/5 flex justify-between items-center px-4">
                          <span className="text-[11px] font-bold text-emerald-deep/30 uppercase tracking-[0.4em]">Total Value</span>
                          <span className="text-3xl font-heading font-bold text-emerald-deep italic">Rs. {order.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6 pt-10 border-t border-emerald-deep/5">
                    <div className="flex items-center gap-3">
                      <History className="h-4 w-4 text-emerald-deep" />
                      <h5 className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.3em]">Activity Log</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {order.timeline.map((event, i) => (
                        <div key={i} className="bg-emerald-deep/[0.02] p-6 rounded-3xl border border-emerald-deep/5 space-y-2 relative group overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-deep opacity-20 group-hover:opacity-100 transition-opacity" />
                          <p className="text-xs font-bold text-emerald-deep italic leading-relaxed">"{event.message}"</p>
                          <p className="text-[9px] text-emerald-deep/30 font-bold uppercase tracking-widest">{new Date(event.timestamp).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-[3rem] border border-emerald-deep/5 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-emerald-deep/5">
                  <tr>
                    <th className="px-10 py-8 text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Customer</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Contact</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Role</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-deep/5">
                  {users.map((u) => (
                    <tr key={u.uid} className="group hover:bg-emerald-deep/[0.01] transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-emerald-deep/10 flex items-center justify-center border border-emerald-deep/5 overflow-hidden">
                            {u.photoURL ? <img src={u.photoURL} alt="" className="h-full w-full object-cover" /> : <UserIcon className="h-5 w-5 text-emerald-deep/40" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-emerald-deep italic">{u.displayName || 'Anonymous Artisan'}</span>
                            <span className="text-[10px] text-emerald-deep/30 font-bold uppercase tracking-widest">UID: {u.uid.slice(0, 8)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-emerald-deep/60">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <Badge className={`px-4 py-1 rounded-full font-bold text-[9px] uppercase tracking-widest border-none ${u.role === 'admin' ? 'bg-emerald-deep text-white' : 'bg-emerald-deep/10 text-emerald-deep/60'}`}>
                          {u.role || 'customer'}
                        </Badge>
                      </td>
                      <td className="px-10 py-8">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full cursor-not-allowed opacity-20">
                          <Bell className="h-4 w-4 text-emerald-deep/40" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {activeTab === 'settings' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <div className="bg-white p-10 rounded-[3rem] border border-emerald-deep/5 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-deep/5 flex items-center justify-center text-emerald-deep font-bold">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-emerald-deep italic">Quick Actions</h3>
                </div>
                <div className="grid gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 justify-start px-8 rounded-2xl border-emerald-deep/10 hover:bg-emerald-deep hover:text-white transition-all group"
                    onClick={onAddProduct}
                  >
                    <Plus className="h-5 w-5 mr-4 text-emerald-deep group-hover:text-white" />
                    <span className="font-bold text-[10px] uppercase tracking-widest">Add New Masterpiece</span>
                  </Button>
                </div>
              </div>

              {/* Order Tracking */}
              <div className="bg-white p-10 rounded-[3rem] border border-emerald-deep/5 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-deep/5 flex items-center justify-center text-emerald-deep font-bold">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-emerald-deep italic">Track Order</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest leading-relaxed">
                    Quickly find an order by its unique ID (e.g., ORD-1234 or Firestore ID).
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="ORD-XXXX..." 
                      className="h-14 rounded-xl border-emerald-deep/10"
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const id = trackId.toUpperCase();
                          const found = orders.find(o => (o.readableId && o.readableId === id) || o.id.includes(id) || o.id === id);
                          if (found) {
                            setOrderFilter('all');
                            setActiveTab('orders');
                          } else {
                            toast.error('Order ID not found');
                          }
                        }
                      }}
                    />
                    <Button 
                      className="h-14 bg-emerald-deep rounded-xl px-6"
                      onClick={() => {
                        const id = trackId.toUpperCase();
                        const found = orders.find(o => (o.readableId && o.readableId === id) || o.id.includes(id) || o.id === id);
                        if (found) {
                          setOrderFilter('all');
                          setActiveTab('orders');
                        } else {
                          toast.error('Order ID not found');
                        }
                      }}
                    >
                      Find
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-deep/5 p-12 rounded-[4rem] text-center space-y-6">
              <Shield className="h-12 w-12 text-emerald-deep mx-auto opacity-20" />
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-2xl text-emerald-deep italic">System Integrity</h4>
                <p className="text-xs text-emerald-deep/40 font-medium max-w-md mx-auto">
                  Only administrators have access to this Control Panel. All actions are logged for audit purposes.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isQuickSidebarOpen, setIsQuickSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
    const path = location.pathname;
    if (path === '/') setActiveView('home');
    else if (path === '/shop') setActiveView('menu');
    else if (path === '/cart') setActiveView('cart');
    else if (path === '/profile') setActiveView('profile');
    else if (path === '/orders') setActiveView('orders');
    else if (path === '/admin') setActiveView('admin');
  }, [location.pathname]);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
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
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'details' | 'success'>('details');
  const [simulatedOrder, setSimulatedOrder] = useState<Order | null>(null);
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
    } catch (error: any) {
      console.error('Sign-in Error:', error);
      
      let message = 'Failed to sign in.';
      if (error.code === 'auth/unauthorized-domain') {
        message = `This domain (${window.location.hostname}) is not authorized in Firebase Console. Please add it to "Authorized Domains".`;
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Login popup was blocked by your browser. Please allow popups for this site.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        message = 'Login window was closed before completing sign-in.';
      } else if (error.message) {
        message = `Sign-in Error: ${error.message}`;
      }
      
      toast.error(message, {
        duration: 6000
      });
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

  const generateReadableId = () => {
    return `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  };

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

    // Validation
    if (!productFormData.name.trim() || !productFormData.imageUrl.trim() || productFormData.price <= 0) {
      toast.error('Please provide name, price, and image for the masterpiece');
      return;
    }

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
    if (!isAdmin) {
      toast.error('Admin privileges required for deletion');
      return;
    }
    
    // Ensure we have a valid, trimmed ID
    const productId = id?.trim();
    if (!productId) {
      toast.error('Invalid product ID');
      return;
    }

    setProductToDelete(productId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      const productRef = doc(db, 'products', productToDelete);
      await deleteDoc(productRef);
      toast.success('Masterpiece removed from collection');
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
    } catch (error: any) {
      toast.error(`Delete failed: ${error.message || 'Unknown error'}`);
      handleFirestoreError(error, OperationType.DELETE, `products/${productToDelete}`);
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

    setPaymentMethod(method);

    if (method === 'cod') {
      // Direct order creation for COD
      try {
        const readableId = generateReadableId();
        const orderData: Omit<Order, 'id'> = {
          readableId,
          userId: user.uid,
          items: cart,
          deliveryDetails,
          totalAmount,
          status: 'pending',
          paymentStatus: 'unpaid',
          paymentMethod: 'cod',
          timeline: [
            { 
              status: 'pending', 
              timestamp: new Date().toISOString(), 
              message: 'Order placed with Cash on Delivery.' 
            }
          ],
          createdAt: serverTimestamp()
        };

        const orderRef = await addDoc(collection(db, 'orders'), orderData);
        const fullOrder = { id: orderRef.id, ...orderData } as Order;
        
        setCart([]);
        setIsOrderModalOpen(false);
        setIsConfirmationOpen(false);
        setSimulatedOrder(fullOrder);
        setPaymentStep('success');
        setIsSimulatingPayment(true);
        toast.success('Order placed successfully! Pay on delivery.');

        // Notify Admin
        addDoc(collection(db, 'notifications'), {
          userId: 'admin',
          message: `NEW COD: ${readableId} from ${deliveryDetails.fullName}.`,
          type: 'targeted',
          read: false,
          createdAt: serverTimestamp(),
          senderId: user.uid
        });

      } catch (error) {
        toast.error('Order failed. Check details.');
      }
    } else {
      // Show simulation screen FIRST for online payments
      setIsOrderModalOpen(false);
      setIsConfirmationOpen(false);
      setPaymentStep('details');
      setIsSimulatingPayment(true);
    }
  };

  const finalizeOnlinePayment = async () => {
    if (!user || !paymentMethod) return;

    try {
      const readableId = generateReadableId();
      const orderData: Omit<Order, 'id'> = {
        readableId,
        userId: user.uid,
        items: cart,
        deliveryDetails,
        totalAmount,
        status: 'pending',
        paymentStatus: 'paid',
        paymentMethod: paymentMethod as any,
        timeline: [
          { 
            status: 'pending', 
            timestamp: new Date().toISOString(), 
            message: `Payment successful via ${paymentMethod.toUpperCase()}.` 
          }
        ],
        createdAt: serverTimestamp()
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      const fullOrder = { id: orderRef.id, ...orderData } as Order;
      
      setCart([]);
      setSimulatedOrder(fullOrder);
      setPaymentStep('success');
      
      // Notify Admin
      addDoc(collection(db, 'notifications'), {
        userId: 'admin',
        message: `PAID ORDER: ${readableId} via ${paymentMethod.toUpperCase()}.`,
        type: 'targeted',
        read: false,
        createdAt: serverTimestamp(),
        senderId: user.uid
      });

    } catch (error) {
      toast.error('Payment finalized but order creation failed. Contact support.');
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
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
        <Toaster position="bottom-center" />
        
        <SearchOverlay 
          isOpen={activeView === 'search'}
          onClose={() => setActiveView('home')}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          products={products}
        />

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
        />

        <CartNotification 
          isOpen={showCartNotification}
          product={notificationProduct}
          onClick={() => {
            setShowCartNotification(false);
            setActiveView('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-emerald-deep/40 backdrop-blur-md z-[90]"
              />
              <QuickSidebar 
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
                totalAmount={cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
                onCheckout={() => {
                  setIsCartOpen(false);
                  setActiveView('cart');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </AnimatePresence>

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
          <Route path="*" element={
            <main className={`${activeView === 'admin' ? 'w-full' : 'container mx-auto px-4'} py-8 flex-1 flex flex-col min-h-[90vh]`}>
                <AnimatePresence mode="wait">
                  {activeView === 'menu' && (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full pt-4 md:pt-12"
                  >
                    <div className="text-center mb-16 space-y-6">
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-8 bg-emerald-deep/20" />
                        <span className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.6em]">Explore Our Menu</span>
                        <div className="h-px w-8 bg-emerald-deep/20" />
                      </div>
                      <h2 className="text-5xl md:text-8xl font-heading font-medium text-emerald-deep tracking-tighter italic">
                        The Full <span className="text-emerald-deep/40">Collection</span>
                      </h2>
                    </div>

                    <VisualNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
                    
                    <div className="mt-16 md:mt-24 space-y-24">
                      {/* Products Grid */}
                      <section className="px-4 md:px-0">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-10">
                          <div className="space-y-4">
                            <h3 className="text-2xl md:text-4xl font-heading font-bold text-emerald-deep uppercase tracking-widest">{activeTab === 'all' ? 'Signature Collection' : `${activeTab} Selections`}</h3>
                            <p className="text-xs text-emerald-deep/50 font-medium">Fine-tuned recipes for every celebration.</p>
                          </div>
                          <div className="relative w-full md:w-[400px]">
                            <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-deep/20" />
                            <Input 
                              placeholder="Search favorites..." 
                              className="pl-16 w-full bg-white border-2 border-emerald-deep/5 h-16 rounded-2xl focus:ring-emerald-deep/5 text-lg font-medium text-emerald-deep transition-all" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                          {filteredProducts.map((product, idx) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05, duration: 0.4 }}
                            >
                              <ProductCard 
                                product={product} 
                                onAddToCart={addToCart} 
                                isWishlisted={wishlist.includes(product.id)}
                                onToggleWishlist={toggleWishlist}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </motion.div>
                )}

                {activeView === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Hero Section */}
                    <section className="relative h-[70vh] md:h-[90vh] w-full mb-16 md:mb-24 rounded-3xl md:rounded-[5rem] overflow-hidden group shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=2000" 
                        alt="Luxury Cake" 
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[5s] group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center py-20 md:py-32 px-8 md:px-24">
                        <div className="max-w-4xl relative">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute -top-24 -left-12 hidden lg:flex h-32 w-32 rounded-full border border-emerald-deep/20 items-center justify-center backdrop-blur-xl rotate-12"
                          >
                            <div className="text-center">
                              <p className="text-[8px] font-bold text-emerald-deep uppercase tracking-widest">Est.</p>
                              <p className="text-xl font-heading font-bold text-emerald-deep italic">2024</p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="flex items-center gap-4 mb-8">
                              <div className="h-px w-12 bg-emerald-deep" />
                              <span className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.6em]">The Art of Fine Baking</span>
                            </div>
                            <h2 className="text-6xl sm:text-8xl md:text-[12rem] font-heading font-medium text-emerald-deep mb-8 md:mb-12 leading-[0.75] tracking-tighter">
                              Pure <br /> <span className="italic text-emerald-deep">Artistry.</span>
                            </h2>
                            <p className="text-emerald-deep/90 text-lg md:text-2xl font-light mb-12 md:mb-16 max-w-xl leading-relaxed">
                              Crafting bespoke artisanal masterpieces with single-origin ingredients and centuries-old techniques.
                            </p>
                            <div className="flex flex-wrap gap-6 md:gap-10">
                              <Button 
                                className="bg-emerald-deep hover:bg-emerald-deep/90 text-white h-16 md:h-24 px-10 md:px-16 rounded-full font-bold text-sm md:text-base uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 group"
                                onClick={() => document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' })}
                              >
                                Shop Collection <ArrowRight className="ml-4 h-5 w-5 transition-transform group-hover:translate-x-2" />
                              </Button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                    {/* Daily Special Floating Card */}
                      <motion.div 
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 right-24 hidden xl:block"
                      >
                        <div className="bg-emerald-deep p-10 rounded-[4rem] border border-white/20 shadow-[0_30px_60px_rgba(0,174,239,0.4)] space-y-4 group hover:scale-105 transition-transform duration-500">
                          <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-emerald-deep transition-all duration-500">
                              <Sparkles className="h-8 w-8 text-white transition-colors group-hover:text-emerald-deep" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-white/50 uppercase tracking-[0.4em] mb-1">Daily Special</p>
                              <p className="text-3xl font-heading font-bold text-white italic leading-tight">Velvet Truffle</p>
                              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-2 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" /> Freshly Baked
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </section>

                    <VisualNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
                    
                    {/* Product Section */}
                    <section id="cakes" className="py-24 md:py-48 px-4 md:px-8">
                      <div className="mb-16 md:mb-32 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-emerald-deep/20" />
                            <span className="text-[10px] md:text-xs font-bold text-emerald-deep/40 uppercase tracking-[0.6em]">Collection {activeTab}</span>
                          </div>
                          <h3 className="text-6xl md:text-[10rem] font-heading font-medium text-emerald-deep leading-[0.8] tracking-tighter">
                            Signature <br /><span className="italic text-emerald-deep/60">Creations</span>
                          </h3>
                        </div>
                <div className="relative w-full md:w-[450px]">
                  <Search className="absolute left-8 top-1/2 h-6 w-6 -translate-y-1/2 text-emerald-deep/20" />
                    <Input 
                      placeholder="Search our collection..." 
                      className="pl-20 w-full bg-white border-2 border-emerald-deep/10 shadow-xl h-20 md:h-24 rounded-[2rem] focus:ring-emerald-deep/10 text-xl font-medium text-emerald-deep placeholder:text-emerald-deep/20 focus:border-emerald-deep/20 transition-all" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                      </div>

                      <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {filteredProducts.map((product, idx) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                          >
                            <ProductCard 
                              product={product} 
                              onAddToCart={addToCart} 
                              isWishlisted={wishlist.includes(product.id)}
                              onToggleWishlist={toggleWishlist}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </section>

                    {activeTab === 'all' && (
                      <>
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
                                <div className="h-16 w-16 rounded-2xl bg-emerald-deep/5 flex items-center justify-center text-emerald-deep group-hover:bg-emerald-deep group-hover:text-white transition-all duration-500">
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
                            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-emerald-deep/5 shadow-sm flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl group">
                              <div className="h-20 w-20 rounded-full bg-emerald-deep/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                                <Truck className="h-10 w-10 text-emerald-deep" strokeWidth={1} />
                              </div>
                              <div>
                                <h3 className="text-xl font-heading font-bold text-emerald-deep">Concierge Delivery</h3>
                                <p className="text-xs text-emerald-deep/50 mt-3 leading-relaxed font-medium">Hand-delivered with white-glove care to preserve every delicate detail.</p>
                              </div>
                            </div>
                            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-emerald-deep/5 shadow-sm flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl group">
                              <div className="h-20 w-20 rounded-full bg-emerald-deep/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                                <Star className="h-10 w-10 text-emerald-deep" strokeWidth={1} />
                              </div>
                              <div>
                                <h3 className="text-xl font-heading font-bold text-emerald-deep">Artisan Ingredients</h3>
                                <p className="text-xs text-emerald-deep/50 mt-3 leading-relaxed font-medium">We source single-origin cocoa and organic dairy for an unparalleled taste.</p>
                              </div>
                            </div>
                            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-emerald-deep/5 shadow-sm flex flex-col items-center text-center gap-6 transition-all hover:shadow-xl group">
                              <div className="h-20 w-20 rounded-full bg-emerald-deep/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
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
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-emerald-deep text-emerald-deep" />)}
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
                      </>
                    )}

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
                    onExplore={() => setActiveView('menu')}
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
                      <Button variant="ghost" size="sm" onClick={() => setActiveView('home')} className="text-emerald-deep font-bold flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back to Shop
                      </Button>
                      <h2 className="text-xl font-heading text-emerald-deep font-bold">My Profile</h2>
                      <div className="w-20" /> {/* Spacer */}
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-emerald-deep/5">
                      <div className="flex flex-col items-center text-center gap-4 mb-8">
                        <div className="relative">
                          <img src={user.photoURL} alt={user.displayName} className="h-28 w-28 rounded-full border-4 border-emerald-deep/10 shadow-md object-cover" />
                          <div className="absolute bottom-0 right-0 bg-emerald-deep text-white p-1.5 rounded-full border-2 border-white">
                            <Star className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="w-full overflow-hidden">
                          <h2 className="text-2xl font-heading text-emerald-deep font-bold truncate">{user.displayName}</h2>
                          <p className="text-muted-foreground text-sm break-all">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        {isAdmin && (
                          <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl border-emerald-deep/10 hover:bg-emerald-deep/5 hover:text-emerald-deep text-base font-semibold" onClick={() => setActiveView('admin')}>
                            <LayoutDashboard className="h-5 w-5 text-emerald-deep" /> Admin Dashboard
                          </Button>
                        )}
                        <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl border-emerald-deep/10 hover:bg-emerald-deep/5 hover:text-emerald-deep text-base font-semibold" onClick={() => setActiveView('orders')}>
                          <Package className="h-5 w-5 text-emerald-deep" /> My Orders
                        </Button>
                      </div>

                      {/* Wishlist Section in Profile */}
                      <div className="mt-12">
                        <div className="flex items-center gap-3 mb-6">
                          <Heart className="h-6 w-6 text-emerald-deep fill-emerald-deep" />
                          <h3 className="text-xl font-heading text-emerald-deep font-bold">My Wishlist</h3>
                        </div>
                        
                        {wishlist.length === 0 ? (
                          <div className="bg-emerald-deep/5 p-12 rounded-3xl text-center border border-dashed border-emerald-deep/20">
                            <Heart className="h-10 w-10 text-emerald-deep/20 mx-auto mb-3" />
                            <p className="text-emerald-deep/60 font-medium">Your wishlist is empty</p>
                            <Button variant="link" className="text-emerald-deep font-bold mt-2" onClick={() => setActiveView('home')}>
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
                      <Button variant="ghost" className="w-full justify-start gap-4 h-14 rounded-2xl text-base font-semibold text-emerald-deep hover:bg-emerald-deep/5 transition-all" onClick={handleSignOut}>
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
                      <Button variant="ghost" size="sm" onClick={() => setActiveView('home')} className="text-emerald-deep font-bold flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back to Shop
                      </Button>
                      <h2 className="text-xl font-heading text-emerald-deep font-bold">My Orders</h2>
                      <div className="w-20" /> {/* Spacer */}
                    </div>
                    
                    <div className="grid gap-6">
                      {orders.length === 0 ? (
                        <div className="bg-white p-20 rounded-3xl text-center border border-emerald-deep/5 shadow-sm">
                          <Package className="h-16 w-16 text-emerald-deep/10 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                          <p className="text-muted-foreground mb-6">Your sweet journey starts with your first order!</p>
                          <Button className="bg-emerald-deep hover:bg-emerald-deep/90" onClick={() => setActiveView('home')}>Browse Cakes</Button>
                        </div>
                      ) : (
                        orders.map((order) => (
                          <Card key={order.id} className="overflow-hidden border-emerald-deep/10 shadow-sm rounded-2xl">
                            <div className="bg-emerald-deep h-1.5 w-full" />
                            <CardHeader className="flex flex-row items-center justify-between bg-emerald-deep/5 py-4">
                              <div>
                                <CardTitle className="text-sm font-bold">Order #{order.id.slice(-6)}</CardTitle>
                                <CardDescription className="text-[10px] uppercase tracking-wider font-semibold">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</CardDescription>
                              </div>
                              <Badge className={
                                order.status === 'delivered' ? 'bg-emerald-deep' : 
                                order.status === 'pending' ? 'bg-emerald-deep/60' : 
                                order.status === 'ready' ? 'bg-emerald-deep' : 
                                order.status === 'cancelled' ? 'bg-emerald-deep/40' : 'bg-emerald-deep'
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
                                        <p className="text-xs font-bold flex items-center gap-2 text-emerald-deep uppercase tracking-widest">
                                          <MapPin className="h-4 w-4 text-emerald-deep" /> Live Tracking
                                        </p>
                                        <Badge variant="outline" className="animate-pulse bg-emerald-deep/5 text-emerald-deep border-emerald-deep/20 text-[9px] font-bold">LIVE</Badge>
                                      </div>
                                      <div className="h-48 w-full rounded-2xl overflow-hidden border border-emerald-deep/10 shadow-inner bg-gray-100 relative">
                                        <iframe
                                          width="100%"
                                          height="100%"
                                          style={{ border: 0 }}
                                          loading="lazy"
                                          src={`https://maps.google.com/maps?q=${encodeURIComponent(order.deliveryDetails.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                          referrerPolicy="no-referrer"
                                        ></iframe>
                                        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-emerald-deep/5 shadow-sm">
                                          <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-emerald-deep flex items-center justify-center text-white">
                                              <Truck className="h-4 w-4" />
                                            </div>
                                            <div>
                                              <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-wider">Delivery to</p>
                                              <p className="text-xs font-medium line-clamp-1">{order.deliveryDetails.address}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="space-y-6">
                                    <p className="text-xs font-bold flex items-center gap-2 text-emerald-deep uppercase tracking-widest">
                                      <Clock className="h-4 w-4 text-emerald-deep" /> Delivery Timeline
                                    </p>
                                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-deep before:via-emerald-deep/20 before:to-transparent">
                                      {order.timeline.map((event, i) => (
                                        <div key={i} className="relative flex items-start gap-6 pl-10">
                                          <div className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-md transition-all ${i === 0 ? 'bg-emerald-deep text-white scale-110' : 'bg-emerald-deep/10 text-emerald-deep'}`}>
                                            {i === 0 ? <Sparkles className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                                          </div>
                                          <div className="flex-1 bg-white p-4 rounded-2xl border border-emerald-deep/5 shadow-sm">
                                            <div className="flex justify-between items-center mb-1">
                                              <p className="text-xs font-bold text-emerald-deep uppercase tracking-wider">{event.status}</p>
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
                                  <div className="bg-emerald-deep/5 p-6 rounded-3xl border border-emerald-deep/10 shadow-sm h-fit">
                                    <h4 className="font-bold text-emerald-deep text-xs uppercase tracking-[0.2em] mb-6 border-b border-emerald-deep/10 pb-3">Order Summary</h4>
                                    <div className="space-y-4">
                                      {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                          <div className="flex flex-col">
                                            <span className="font-bold text-emerald-deep">{item.cakeName}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</span>
                                          </div>
                                          <span className="font-bold">Rs. {item.price * item.quantity}</span>
                                        </div>
                                      ))}
                                      <Separator className="bg-emerald-deep/10" />
                                      <div className="flex justify-between font-bold text-emerald-deep text-lg">
                                        <span>Total</span>
                                        <span className="text-emerald-deep">Rs. {order.totalAmount}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {order.status === 'pending' && (
                                    (() => {
                                      const orderTime = order.createdAt?.seconds ? order.createdAt.seconds * 1000 : Date.now();
                                      const now = new Date().getTime();
                                      const diffMinutes = (now - orderTime) / (1000 * 60);
                                      const timeLeft = Math.max(0, Math.ceil(30 - diffMinutes));

                                      if (diffMinutes <= 30) {
                                        return (
                                          <div className="bg-red-50/50 p-6 rounded-[2.5rem] border border-red-100 space-y-4 shadow-sm">
                                            <div className="flex items-center gap-4 text-red-600">
                                              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                                <Clock className="h-5 w-5" />
                                              </div>
                                              <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1">Cancellation Window</p>
                                                <p className="text-sm font-heading font-bold italic">Valid for {timeLeft} more minutes</p>
                                              </div>
                                            </div>
                                            <p className="text-[10px] text-red-600/60 leading-relaxed font-medium">
                                              Changed your mind? You can cancel your order within the first 30 minutes of placement.
                                            </p>
                                            <Button 
                                              variant="outline" 
                                              className="w-full rounded-2xl h-14 font-bold border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
                                              onClick={() => {
                                                setOrderToCancel(order.id);
                                                setIsCancelModalOpen(true);
                                              }}
                                            >
                                              Cancel This Order
                                            </Button>
                                          </div>
                                        );
                                      }
                                      return null;
                                    })()
                                  )}

                                  <div className="bg-emerald-deep/10 p-6 rounded-3xl border border-emerald-deep/20">
                                    <h4 className="font-bold text-emerald-deep text-[10px] uppercase tracking-widest mb-3">Delivery Details</h4>
                                    <div className="space-y-2 text-xs">
                                      <p className="flex items-center gap-2 font-medium"><UserIcon className="h-3 w-3 text-emerald-deep" /> {order.deliveryDetails.fullName}</p>
                                      <p className="flex items-center gap-2 font-medium"><Phone className="h-3 w-3 text-emerald-deep" /> {order.deliveryDetails.phone}</p>
                                      <p className="flex items-center gap-2 font-medium"><Calendar className="h-3 w-3 text-emerald-deep" /> {new Date(order.deliveryDetails.deliveryDate).toLocaleDateString()}</p>
                                      <p className="flex items-center gap-2 font-medium"><Clock className="h-3 w-3 text-emerald-deep" /> {order.deliveryDetails.deliveryTime}</p>
                                      <div className="pt-2 mt-2 border-t border-emerald-deep/10">
                                        <p className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest mb-1">Estimated Arrival</p>
                                        <p className="flex items-center gap-2 font-bold text-emerald-deep">
                                          <Sparkles className="h-3 w-3 text-emerald-deep" />
                                          {(() => {
                                            const orderTime = order.createdAt?.seconds ? order.createdAt.seconds * 1000 : Date.now();
                                            return new Date(orderTime + 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { 
                                              weekday: 'short', 
                                              month: 'short', 
                                              day: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit'
                                            });
                                          })()}
                                        </p>
                                      </div>
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
                      onBack={() => setActiveView('home')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          } />
        </Routes>
        <footer className="bg-emerald-deep text-white pt-16 pb-20 relative overflow-hidden border-t border-white/10">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/5 rounded-full translate-x-1/2 translate-y-1/2 blur-[80px]" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
              {/* Branding Section */}
              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-5xl font-bold tracking-tighter font-heading text-white leading-none italic">Koseli</span>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase mt-3">Artisan House</span>
                </div>
                <p className="text-white text-base font-heading italic leading-relaxed max-w-xs">
                  "Baking memories with the precision of art and the warmth of a home."
                </p>
                <div className="flex gap-4">
                  {['IG', 'FB', 'TW'].map(s => (
                    <a key={s} href="#" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-bold hover:bg-white hover:text-emerald-deep transition-all uppercase tracking-widest">{s}</a>
                  ))}
                </div>
              </div>

              {/* Quick Links & Contact Combined */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-[9px] font-bold text-white uppercase tracking-[0.4em] mb-6">Quick Links</h4>
                  <nav className="flex flex-wrap gap-x-8 gap-y-3">
                    <button onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm font-medium text-white hover:text-white transition-colors">Home</button>
                    <button onClick={() => { setActiveView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm font-medium text-white hover:text-white transition-colors">Shop</button>
                    <button onClick={() => setActiveView('home')} className="text-sm font-medium text-white hover:text-white transition-colors">Story</button>
                  </nav>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-white" />
                    <p className="text-sm font-heading font-medium text-white italic">Kanchanpur, Nepal</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-white" />
                    <p className="text-sm font-heading font-medium text-white italic">+977 98-0000-0000</p>
                  </div>
                </div>
              </div>

              {/* Discovery Section */}
              <div className="space-y-6">
                <h4 className="text-[9px] font-bold text-white uppercase tracking-[0.4em]">Our Discovery</h4>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 group cursor-default">
                  <p className="text-xs font-heading italic text-white leading-relaxed">
                    Explore our single-origin chocolate collection and seasonal fruit tarts.
                  </p>
                  <div className="mt-4 h-px w-0 group-hover:w-full bg-white/20 transition-all duration-500" />
                </div>
              </div>

              {/* Map/Location Section - Scaled Down */}
              <div className="space-y-6">
                <h4 className="text-[9px] font-bold text-white uppercase tracking-[0.4em]">Artisan Spot</h4>
                <div className="rounded-[2rem] overflow-hidden border border-white/10 h-32 bg-white/5 p-1 backdrop-blur-sm group shadow-xl">
                  <div className="h-full w-full rounded-[1.8rem] overflow-hidden bg-white/10 relative">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.876735234127!2d80.1764653!3d28.9667821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a191f6cc7c39ad%3A0x6b6d61f6c466487!2sBheemdatt!5e0!3m2!1sen!2snp!4v1713280000000!5m2!1sen!2snp"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Credits - Tightened */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white text-[9px] font-bold uppercase tracking-[0.4em]">
              <p>© 2026 Koseli Bakeries</p>
              <div className="flex gap-8">
                {['Privacy', 'Legal', 'Press'].map(l => (
                  <a key={l} href="#" className="hover:underline transition-all tracking-widest">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>


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


      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[450px] w-[95vw] rounded-[4rem] border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-emerald-deep p-12 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="relative z-10 space-y-4">
              <div className="h-20 w-20 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <DialogTitle className="text-3xl md:text-5xl font-heading font-bold italic uppercase tracking-tight">Artisan Portal</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">Join the finest bake collection</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-10 md:p-12 space-y-8 bg-white">
            <p className="text-sm text-center text-emerald-deep/60 font-medium leading-relaxed italic">
              Sign in to manage your masterpieces, track orders, and experience the full artisan collection.
            </p>
            <Button 
              className="w-full bg-emerald-deep hover:bg-emerald-deep/90 text-white h-20 rounded-[2rem] font-bold text-xs uppercase tracking-[0.3em] shadow-xl shadow-emerald-deep/20 flex items-center justify-center gap-4 transition-all hover:scale-[1.02]" 
              onClick={handleSignIn}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
              </svg>
              Continue with Google
            </Button>
            <p className="text-[9px] text-center font-bold text-emerald-deep/30 uppercase tracking-widest pb-4">
              Secure authentication via Google Cloud
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[450px] w-[95vw] p-0 overflow-hidden rounded-[4rem] border-none shadow-[0_50px_100px_rgba(239,68,68,0.15)] bg-white">
          <div className="bg-red-600 p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="h-24 w-24 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-2xl">
              <AlertTriangle className="h-12 w-12 text-white" strokeWidth={1.5} />
            </div>
            <div className="space-y-4 relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white italic tracking-tighter uppercase leading-none">Cancel Collection?</h2>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold leading-none">This process is final</p>
            </div>
          </div>
          
          <div className="p-10 md:p-12 space-y-12 bg-white">
            <p className="text-sm text-center text-emerald-deep/60 font-medium leading-relaxed italic">
              "We understand, artisan. Sometimes paths diverge. Are you certain you wish to archive this request?"
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="h-20 rounded-[2rem] bg-red-600 text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-red-700 shadow-xl shadow-red-600/10 transition-all active:scale-95"
                onClick={handleCancelOrder}
              >
                Yes, Archive Request
              </Button>
              <Button 
                variant="ghost" 
                className="h-16 rounded-[1.5rem] text-emerald-deep/30 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-deep/[0.03] hover:text-emerald-deep transition-all"
                onClick={() => setIsCancelModalOpen(false)}
              >
                No, Maintain Collection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[450px] w-[95vw] rounded-[4rem] border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-emerald-deep p-12 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="relative z-10 space-y-2">
              <DialogTitle className="text-3xl md:text-4xl font-heading font-bold italic tracking-tight uppercase">Custom Artistry</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">Design your {selectedProduct?.name}</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-10 md:p-12 space-y-10 bg-white">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-deep/40 ml-2">Personalization</Label>
                <Input 
                  id="name" 
                  placeholder="The name to highlight..." 
                  className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 text-lg font-medium shadow-inner"
                  value={customDetails.name}
                  onChange={(e) => setCustomDetails({...customDetails, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="design" className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-deep/40 ml-2">Artistic Direction</Label>
                <Input 
                  id="design" 
                  placeholder="Special colors or additions..." 
                  className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 text-lg font-medium shadow-inner"
                  value={customDetails.design}
                  onChange={(e) => setCustomDetails({...customDetails, design: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-deep/40 ml-2">Masterpiece Quantity</Label>
                <div className="flex items-center gap-6 bg-emerald-deep/[0.03] w-fit p-2 rounded-[1.5rem] border border-emerald-deep/5">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-xl bg-white shadow-sm text-emerald-deep hover:bg-emerald-deep hover:text-white transition-all"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-heading font-bold text-2xl min-w-[30px] text-center text-emerald-deep italic">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-xl bg-white shadow-sm text-emerald-deep hover:bg-emerald-deep hover:text-white transition-all"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-6 border-t border-emerald-deep/5">
              <Button 
                variant="ghost" 
                className="flex-1 h-16 rounded-[1.5rem] text-[10px] uppercase font-bold tracking-widest text-emerald-deep/40 hover:text-emerald-deep"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-[2] h-16 rounded-[1.5rem] bg-emerald-deep hover:bg-emerald-deep/90 text-white font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-deep/20 transition-all active:scale-95"
                onClick={confirmAddToCart}
              >
                Add To Collection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="sm:max-w-[650px] w-[95vw] max-h-[90vh] flex flex-col overflow-hidden rounded-[4rem] p-0 border-none shadow-2xl bg-white">
          <div className="bg-emerald-deep p-12 md:p-16 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="relative z-10 space-y-4">
              <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-[1rem] flex items-center justify-center border border-white/20">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="text-4xl md:text-6xl font-heading font-bold italic uppercase tracking-tighter">Artisan Checkout</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">Finalize your collection</DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex-1 p-10 md:p-14 overflow-y-auto custom-scrollbar min-h-0 relative">
            <div className="space-y-12 pb-10">
              {/* Delivery Info */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-emerald-deep/20" />
                  <h4 className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.4em] transform -translate-y-px">Logistics</h4>
                </div>
                
                <div className="grid gap-8">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/30 ml-4 italic">Fulfillment Method</Label>
                    <div className="flex gap-3 p-2 bg-emerald-deep/[0.03] rounded-[2rem] border border-emerald-deep/5">
                      <Button 
                        variant="ghost"
                        className={`flex-1 rounded-[1.5rem] font-bold uppercase tracking-widest text-[10px] transition-all h-14 ${deliveryDetails.deliveryMethod === 'delivery' ? 'bg-white text-emerald-deep shadow-xl' : 'text-emerald-deep/30 hover:text-emerald-deep/60'}`}
                        onClick={() => setDeliveryDetails({...deliveryDetails, deliveryMethod: 'delivery'})}
                      >
                        White Glove Delivery
                      </Button>
                      <Button 
                        variant="ghost"
                        className={`flex-1 rounded-[1.5rem] font-bold uppercase tracking-widest text-[10px] transition-all h-14 ${deliveryDetails.deliveryMethod === 'pickup' ? 'bg-white text-emerald-deep shadow-xl' : 'text-emerald-deep/30 hover:text-emerald-deep/60'}`}
                        onClick={() => setDeliveryDetails({...deliveryDetails, deliveryMethod: 'pickup'})}
                      >
                        Boutique Pickup
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/30 ml-4 italic">Artisan Name</Label>
                      <Input 
                        id="fullName" 
                        value={deliveryDetails.fullName}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, fullName: e.target.value})}
                        className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 bg-emerald-deep/[0.01] shadow-inner"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/30 ml-4 italic">Contact Line</Label>
                      <Input 
                        id="phone" 
                        value={deliveryDetails.phone}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                        className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 bg-emerald-deep/[0.01] shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/30 ml-4 italic">Delivery Destination</Label>
                    {deliveryDetails.deliveryMethod === 'pickup' ? (
                      <div className="p-8 bg-emerald-deep/[0.03] rounded-[2rem] border border-emerald-deep/5 text-sm text-emerald-deep leading-relaxed shadow-inner italic">
                        <p className="font-bold text-emerald-deep mb-2">Koseli Artisan Bakery</p>
                        <p className="opacity-60">Airy Chauraha, Dhangadhi, Nepal</p>
                        <p className="opacity-40 mt-4 text-[10px] font-bold uppercase tracking-widest">Hand-off from 9:00 AM - 8:00 PM</p>
                      </div>
                    ) : (
                      <Input 
                        id="address" 
                        placeholder="Street, Studio No, Landmark..."
                        value={deliveryDetails.address}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                        className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-20 bg-emerald-deep/[0.01] shadow-inner px-6"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-emerald-deep/20" />
                  <h4 className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.4em] transform -translate-y-px">Schedule</h4>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar-horizontal">
                  {[...Array(14)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const isSelected = deliveryDetails.deliveryDate === dateStr;
                    return (
                      <button
                        key={i}
                        onClick={() => setDeliveryDetails({...deliveryDetails, deliveryDate: dateStr})}
                        className={`flex flex-col items-center justify-center min-w-[100px] h-28 rounded-3xl border-2 transition-all group ${
                          isSelected 
                          ? 'bg-emerald-deep border-emerald-deep text-white shadow-2xl scale-105 z-10' 
                          : 'bg-white border-emerald-deep/5 text-emerald-deep/40 hover:border-emerald-deep/20'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-widest mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-3xl font-heading font-bold italic">
                          {date.getDate()}
                        </span>
                        <span className="text-[8px] uppercase font-bold tracking-[0.2em] mt-1 opacity-40">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        variant="ghost"
                        className={`h-16 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all border ${
                          isSelected 
                          ? 'bg-emerald-deep text-white border-emerald-deep shadow-lg scale-105' 
                          : 'bg-emerald-deep/[0.02] border-emerald-deep/5 text-emerald-deep/40 hover:bg-emerald-deep/10'
                        }`}
                        onClick={() => setDeliveryDetails({...deliveryDetails, deliveryTime: time})}
                      >
                        {displayTime}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Summary Small */}
              <div className="bg-emerald-deep/[0.03] p-10 rounded-[3rem] border border-emerald-deep/5 space-y-6">
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-deep uppercase tracking-[0.2em]">
                  <span className="opacity-40 italic">Collection Count</span>
                  <span>{cart.length} Masterpiece{cart.length > 1 ? 's' : ''}</span>
                </div>
                <Separator className="bg-emerald-deep/5" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-emerald-deep/40 uppercase tracking-[0.2em] italic">Total Artisan Value</span>
                    <p className="text-4xl font-heading font-bold text-emerald-deep italic tracking-tighter">Rs. {totalAmount}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-[11px] font-bold text-emerald-deep/40 uppercase tracking-[0.2em] italic">Fulfillment</span>
                    <p className="text-xs font-bold text-emerald-deep uppercase tracking-widest">{deliveryDetails.deliveryMethod.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 md:p-14 bg-gray-50 flex gap-6 shrink-0">
            <Button 
              variant="ghost" 
              className="flex-1 h-20 rounded-[2rem] font-bold uppercase tracking-widest text-[10px] text-emerald-deep/30 hover:text-emerald-deep h-16"
              onClick={() => setIsOrderModalOpen(false)}
            >
              Continue Browsing
            </Button>
            <Button 
              className="flex-[2] bg-emerald-deep hover:bg-emerald-deep/90 text-white h-20 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-emerald-deep/20 transition-all hover:scale-[1.02] active:scale-[0.98] h-16"
              onClick={() => {
                const errors: { [key: string]: string } = {};
                if (!deliveryDetails.fullName.trim()) errors.fullName = 'Full Name is required';
                if (!deliveryDetails.phone.trim()) errors.phone = 'Phone Number is required';
                if (deliveryDetails.deliveryMethod !== 'pickup' && !deliveryDetails.address.trim()) errors.address = 'Delivery Address is required';

                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors);
                  toast.error('Please complete Artisanal details');
                  return;
                }
                setFormErrors({});
                setIsOrderModalOpen(false);
                setIsConfirmationOpen(true);
              }}
            >
              Review Order details
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-[550px] w-[95vw] max-h-[90vh] flex flex-col overflow-hidden rounded-[4rem] p-0 border-none shadow-2xl bg-white">
          <div className="bg-emerald-deep p-12 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-50" />
            <DialogHeader className="relative z-10 space-y-4">
              <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <DialogTitle className="text-4xl md:text-5xl font-heading font-bold italic uppercase tracking-tighter">Review Selection</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">One final look at your masterpiece</DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-10 md:p-12 custom-scrollbar space-y-12">
            {/* Items Summary */}
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="h-px w-8 bg-emerald-deep/20" /> Selection Invoice
              </p>
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-5 bg-emerald-deep/[0.02] rounded-3xl border border-emerald-deep/5 transition-all hover:bg-emerald-deep/[0.04]">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-deep/5 flex items-center justify-center text-emerald-deep font-heading font-bold italic text-xl shadow-sm">
                        {item.quantity}x
                      </div>
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-xl text-emerald-deep italic">{item.cakeName}</span>
                        <span className="text-[9px] font-bold text-emerald-deep/30 uppercase tracking-widest">{item.cakeDesign}</span>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-2xl text-emerald-deep/60 italic leading-none">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="h-px w-8 bg-emerald-deep/20" /> Collection Details
              </p>
              <div className="grid grid-cols-2 gap-8 bg-emerald-deep/[0.03] p-8 rounded-[2.5rem] border border-emerald-deep/5 shadow-inner">
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Recipient</p>
                  <p className="text-base font-bold text-emerald-deep font-heading italic">{deliveryDetails.fullName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Channel</p>
                  <p className="text-base font-bold text-emerald-deep font-heading italic">{deliveryDetails.phone}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">
                    {deliveryDetails.deliveryMethod === 'pickup' ? 'Boutique' : 'Destination'}
                  </p>
                  <p className="text-base font-bold text-emerald-deep font-heading italic leading-relaxed">
                    {deliveryDetails.deliveryMethod === 'pickup' ? 'Koseli Artisan Bakery, Thamel' : deliveryDetails.address}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Target Date</p>
                  <p className="text-base font-bold text-emerald-deep font-heading italic">{deliveryDetails.deliveryDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Hand-off Time</p>
                  <p className="text-base font-bold text-emerald-deep font-heading italic">{deliveryDetails.deliveryTime}</p>
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

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[480px] w-[95vw] rounded-[4rem] border-none shadow-2xl overflow-hidden p-0 bg-white">
          <div className="bg-emerald-deep p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="relative z-10 space-y-4 text-center">
              <DialogTitle className="text-4xl md:text-5xl font-heading font-bold italic uppercase tracking-tighter">Artisan Profile</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">The custodian of taste</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-10 md:p-14 space-y-10">
            {user && (
              <div className="space-y-10">
                <div className="flex items-center gap-8 p-10 bg-emerald-deep/[0.03] rounded-[3rem] border border-emerald-deep/5 shadow-inner">
                  <div className="relative">
                    <img src={user.photoURL} alt={user.displayName} className="h-24 w-24 rounded-full border-4 border-white shadow-2xl bg-white" />
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-deep rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-3xl text-emerald-deep italic leading-tight">{user.displayName}</h3>
                    <p className="text-[10px] font-semibold text-emerald-deep/30 uppercase tracking-[0.2em] mt-1">{user.email}</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      className="justify-start gap-6 h-20 px-8 rounded-[1.5rem] border-emerald-deep/10 hover:bg-emerald-deep hover:text-white transition-all group group relative overflow-hidden" 
                      onClick={() => { setActiveView('admin'); setIsProfileOpen(false); }}
                    >
                      <LayoutDashboard className="h-6 w-6 text-emerald-deep group-hover:text-white transition-colors" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">Curator Workspace</span>
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="justify-start gap-6 h-20 px-8 rounded-[1.5rem] border-emerald-deep/10 hover:bg-emerald-deep hover:text-white transition-all group relative overflow-hidden" 
                    onClick={() => { setIsOrdersOpen(true); setIsProfileOpen(false); }}
                  >
                    <ShoppingBag className="h-6 w-6 text-emerald-deep group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Collection History</span>
                  </Button>
                  <Separator className="my-6 opacity-30 h-px bg-emerald-deep/10" />
                  <Button 
                    variant="ghost" 
                    className="justify-center gap-4 h-16 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all font-bold uppercase tracking-widest text-[10px]" 
                    onClick={() => { handleSignOut(); setIsProfileOpen(false); }}
                  >
                    <LogOut className="h-4 w-4" />
                    Archive Session (Sign Out)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
        <DialogContent className="sm:max-w-[850px] w-[95vw] max-h-[85vh] overflow-hidden flex flex-col rounded-[4rem] border-none shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-white p-0">
          <div className="bg-emerald-deep p-12 md:p-16 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="relative z-10 space-y-4">
              <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-[1rem] flex items-center justify-center border border-white/20">
                <Box className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="text-4xl md:text-6xl font-heading font-bold italic uppercase tracking-tighter">Collection Archive</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">Review your sweet history</DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex-1 p-10 md:p-14 overflow-y-auto custom-scrollbar min-h-0 relative">
            <div className="grid gap-10 pr-2 pb-10">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
                  <div className="bg-emerald-deep/[0.03] p-10 rounded-[3rem] border border-emerald-deep/5">
                    <Package className="h-16 w-16 text-emerald-deep/10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-2xl text-emerald-deep italic leading-tight uppercase">Empty Collection</h3>
                    <p className="text-sm text-emerald-deep/40 font-medium italic">Your artisanal journey is awaiting its first masterpiece.</p>
                  </div>
                  <Button 
                    className="bg-emerald-deep hover:bg-emerald-deep/90 text-white rounded-[1.5rem] px-8 h-14 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-deep/10" 
                    onClick={() => setIsOrdersOpen(false)}
                  >
                    Begin Exploration
                  </Button>
                </div>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden border-emerald-deep/5 shadow-sm rounded-[2.5rem] bg-emerald-deep/[0.01]">
                    <div className="bg-emerald-deep h-2 w-full" />
                    <CardHeader className="flex flex-row items-center justify-between bg-white py-8 px-10 border-b border-emerald-deep/[0.03]">
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-heading font-bold italic text-emerald-deep">#{order.readableId || order.id.slice(-6).toUpperCase()}</CardTitle>
                        <CardDescription className="text-[9px] uppercase tracking-[0.3em] font-bold text-emerald-deep/20">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</CardDescription>
                      </div>
                      <Badge className={`px-4 py-2 rounded-full font-bold text-[9px] uppercase tracking-widest border-none ${
                        order.status === 'delivered' ? 'bg-emerald-deep text-white' : 
                        order.status === 'pending' ? 'bg-emerald-deep/60 text-white' : 
                        order.status === 'ready' ? 'bg-emerald-deep text-white' : 'bg-emerald-deep/40 text-white'
                      }`}>
                        {order.status}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-10 bg-white/50 backdrop-blur-sm">
                      <div className="grid gap-12 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-8">
                          <p className="text-[10px] font-bold flex items-center gap-3 text-emerald-deep/30 uppercase tracking-[0.3em] font-heading">
                            <Clock className="h-3.5 w-3.5 text-emerald-deep/20" /> Fulfillment Journey
                          </p>
                          <div className="relative space-y-10 pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-emerald-deep/10">
                            {order.timeline.map((t, i) => (
                              <div key={i} className="relative">
                                <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-deep shadow-md" />
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-deep">{t.status}</p>
                                    <p className="text-[9px] font-bold text-emerald-deep/30">{new Date(t.timestamp).toLocaleString()}</p>
                                  </div>
                                  <p className="text-sm text-emerald-deep/60 italic leading-relaxed">"{t.message}"</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <Separator className="bg-emerald-deep/10" />
                          <div>
                            <p className="text-[10px] font-bold text-emerald-deep uppercase tracking-widest mb-2 font-heading italic">Items In Collection</p>
                            <ul className="grid gap-4">
                              {order.items.map((item, i) => (
                                <li key={i} className="flex justify-between items-center bg-white p-6 rounded-2xl border border-emerald-deep/5 shadow-sm transition-all hover:shadow-md">
                                  <div className="space-y-1">
                                    <span className="font-heading font-bold text-lg text-emerald-deep italic">{item.cakeName}</span>
                                    <p className="text-[8px] font-bold text-emerald-deep/30 uppercase tracking-widest">{item.cakeDesign}</p>
                                  </div>
                                  <span className="bg-emerald-deep text-white px-4 py-2 rounded-xl font-bold text-xs">x{item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-8">
                          <div className="bg-emerald-deep/[0.03] p-8 rounded-[2rem] border border-emerald-deep/5 space-y-6">
                            <div className="space-y-1">
                              <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Collection Value</p>
                              <p className="text-3xl font-heading font-bold text-emerald-deep italic tracking-tighter leading-none">Rs. {order.totalAmount}</p>
                            </div>
                            <Separator className="bg-emerald-deep/5" />
                            <div className="space-y-1">
                              <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Hand-off Schedule</p>
                              <p className="text-sm font-bold text-emerald-deep italic leading-relaxed">
                                {new Date(order.deliveryDetails.deliveryDate).toLocaleDateString()} at {new Date(`2000-01-01T${order.deliveryDetails.deliveryTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                              </p>
                            </div>
                            <Separator className="bg-emerald-deep/5" />
                            <div className="space-y-1">
                              <p className="text-[8px] font-bold text-emerald-deep/20 uppercase tracking-widest italic">Destination</p>
                              <p className="text-sm font-medium text-emerald-deep/60 leading-relaxed italic">{order.deliveryDetails.address || 'Boutique Pickup'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="sm:max-w-[550px] w-[95vw] rounded-[4rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-emerald-deep p-12 md:p-14 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <DialogHeader className="relative z-10 space-y-4">
              <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <ChefHat className="h-7 w-7 text-white" />
              </div>
              <DialogTitle className="text-3xl md:text-5xl font-heading font-bold italic uppercase tracking-tighter">{editingProduct ? 'Curate Masterpiece' : 'Birth New Creation'}</DialogTitle>
              <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">Define the artisanal properties</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-10 md:p-12 space-y-10 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <div className="grid gap-10">
              <div className="space-y-4">
                <Label htmlFor="p-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/40 ml-4 italic">Bake Title</Label>
                <Input id="p-name" value={productFormData.name} onChange={(e) => setProductFormData({...productFormData, name: e.target.value})} className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 bg-emerald-deep/[0.01] shadow-inner text-lg font-medium" />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="p-desc" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/40 ml-4 italic">Story & Profile</Label>
                <Input id="p-desc" value={productFormData.description} onChange={(e) => setProductFormData({...productFormData, description: e.target.value})} className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 bg-emerald-deep/[0.01] shadow-inner text-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Label htmlFor="p-price" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/40 ml-4 italic">Artisan Value</Label>
                  <Input id="p-price" type="number" value={productFormData.price} onChange={(e) => setProductFormData({...productFormData, price: Number(e.target.value)})} className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-16 bg-emerald-deep/[0.01] shadow-inner text-xl font-heading italic" />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="p-cat" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/40 ml-4 italic">Collection Group</Label>
                  <select 
                    id="p-cat" 
                    value={productFormData.category} 
                    onChange={(e) => setProductFormData({...productFormData, category: e.target.value as any})}
                    className="flex h-16 w-full rounded-2xl border border-emerald-deep/10 bg-emerald-deep/[0.01] px-5 py-2 text-sm font-bold uppercase tracking-widest ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-deep/5 shadow-inner"
                  >
                    {['Birthday', 'Anniversary', 'Wedding', 'Cupcakes', 'Pastries', 'Accessories', 'Combos'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-6">
                <Label htmlFor="p-img" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-deep/40 ml-4 italic">Visual Asset</Label>
                <div className="flex flex-col gap-6 p-6 bg-emerald-deep/[0.03] rounded-[2.5rem] border border-emerald-deep/5">
                  {productFormData.imageUrl && (
                    <div className="h-48 w-full rounded-[2rem] overflow-hidden border border-emerald-deep/10 shadow-2xl bg-white">
                      <img src={productFormData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Input 
                      id="p-img" 
                      placeholder="Artisan image URL..."
                      value={productFormData.imageUrl} 
                      onChange={(e) => setProductFormData({...productFormData, imageUrl: e.target.value})} 
                      className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-14 bg-white flex-1 text-xs" 
                    />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setProductFormData({...productFormData, imageUrl: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button variant="outline" className="rounded-2xl border-emerald-deep/10 h-14 w-14 bg-white hover:bg-emerald-deep hover:text-white transition-all">
                        <Camera className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-emerald-deep/[0.05] p-6 rounded-[2rem] border border-emerald-deep/5 transition-all hover:bg-emerald-deep/[0.08]">
                <input 
                  type="checkbox" 
                  id="p-stock" 
                  checked={productFormData.inStock} 
                  onChange={(e) => setProductFormData({...productFormData, inStock: e.target.checked})}
                  className="h-6 w-6 rounded-lg border-emerald-deep/20 text-emerald-deep focus:ring-emerald-deep"
                />
                <Label htmlFor="p-stock" className="text-xs font-bold uppercase tracking-widest text-emerald-deep cursor-pointer">Available in Boutique</Label>
              </div>
            </div>
          </div>
          <div className="p-10 md:p-12 bg-gray-50 flex gap-4 mt-auto">
            <Button 
              variant="ghost" 
              className="flex-1 h-16 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-emerald-deep/40 hover:text-emerald-deep" 
              onClick={() => setIsProductFormOpen(false)}
            >
              Archive Draft
            </Button>
            <Button 
              className="flex-[2] h-16 bg-emerald-deep hover:bg-emerald-deep/90 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-deep/20 transition-all active:scale-95" 
              onClick={handleSaveProduct}
            >
              Finalize Masterpiece
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isSimulatingPayment} onOpenChange={setIsSimulatingPayment}>
        <DialogContent className="sm:max-w-[500px] w-[95vw] rounded-[4rem] border-none p-0 overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.2)] bg-white">
          {paymentStep === 'details' ? (
            <div className="flex flex-col">
              <div className={`p-12 md:p-16 ${paymentMethod === 'esewa' ? 'bg-[#60bb46]' : 'bg-[#5c2d91]'} text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-heading font-bold italic tracking-tight">{paymentMethod?.toUpperCase()} Gateway</h3>
                    <div className="bg-white/20 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/10 italic">Certified Secure</div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">Transaction Flow</p>
                    <p className="text-lg font-medium italic">Simulated Artisan Payment</p>
                  </div>
                </div>
              </div>
              <div className="p-10 md:p-14 space-y-10">
                <div className="space-y-8">
                  <div className="flex justify-between items-center bg-emerald-deep/[0.03] p-8 rounded-[2.5rem] border border-emerald-deep/5">
                    <div className="space-y-1">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-deep/30 italic">Merchant</Label>
                      <p className="text-lg font-heading font-bold text-emerald-deep italic">Koseli Artisan Bakery</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-deep/30 italic">Collection Value</Label>
                      <p className="text-3xl font-heading font-bold text-emerald-deep italic">Rs. {totalAmount}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-deep/40 ml-4 italic">Artisan Credential</Label>
                    <Input 
                      placeholder="Your secure phone or ID..." 
                      defaultValue={deliveryDetails.phone} 
                      className="rounded-2xl border-emerald-deep/10 focus:ring-emerald-deep/5 h-20 bg-emerald-deep/[0.01] shadow-inner text-xl font-medium px-8" 
                    />
                  </div>
                </div>
                
                <div className="bg-emerald-deep/[0.02] p-6 rounded-[2rem] text-[10px] font-bold text-emerald-deep/30 uppercase tracking-[0.2em] leading-relaxed text-center italic border border-emerald-deep/5">
                  "This secure connection is provided for demonstration purposes only. No actual funds will be transferred from your collection."
                </div>
                
                <Button 
                  className={`w-full h-20 rounded-[2.5rem] text-xs font-bold uppercase tracking-[0.4em] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${paymentMethod === 'esewa' ? 'bg-[#60bb46] hover:bg-[#52a13b] shadow-[#60bb46]/20' : 'bg-[#5c2d91] hover:bg-[#4d2678] shadow-[#5c2d91]/20'}`}
                  onClick={finalizeOnlinePayment}
                >
                  Confirm & Transfer Collection
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-16 md:p-20 text-center space-y-10">
              <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute inset-0 bg-emerald-deep rounded-[3rem] shadow-2xl flex items-center justify-center text-white z-10"
                >
                  <CheckCircle2 className="h-16 w-16 md:h-20 md:w-20" strokeWidth={1.5} />
                </motion.div>
                <div className="absolute inset-0 bg-emerald-deep rounded-[3rem] animate-ping opacity-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-heading font-bold text-emerald-deep italic">Masterpiece Secured!</h3>
                <p className="text-sm text-gray-500 font-medium tracking-tight">
                  {paymentMethod === 'cod' ? 'Order placed successfully. Pay on delivery.' : 'Transaction completed with the precision of art.'}
                </p>
              </div>

              {simulatedOrder && (
                <div className="bg-[#e5e5e0]/30 p-6 rounded-[2rem] border border-emerald-deep/5 space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Order ID</span>
                    <span className="text-xs font-bold text-emerald-deep">#{simulatedOrder.readableId || simulatedOrder.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Amount</span>
                    <span className="text-sm font-bold text-emerald-deep">Rs. {simulatedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-emerald-deep/40 uppercase tracking-widest">Date</span>
                    <span className="text-xs font-bold text-emerald-deep">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full h-16 rounded-2xl bg-emerald-deep text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-deep/20 hover:scale-105 active:scale-95 transition-all"
                onClick={() => {
                  setIsSimulatingPayment(false);
                  navigate('/orders');
                }}
              >
                View Order History
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[400px] w-[95vw] rounded-[4rem] border-none shadow-[0_50px_100px_rgba(239,68,68,0.15)] p-0 overflow-hidden bg-white">
          <div className="bg-red-600 p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Trash2 className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-heading font-bold italic tracking-tighter uppercase leading-none">Delete Piece?</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">This action is irreversible</p>
            </div>
          </div>
          <div className="p-10 md:p-12 space-y-10">
            <p className="text-sm text-center text-gray-500 font-medium leading-relaxed italic">
              "Confirming this will permanently remove this artisanal creation from the boutique. Are you certain?"
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                className="h-16 rounded-[1.5rem] bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/10 transition-all active:scale-95"
                onClick={confirmDeleteProduct}
              >
                Yes, Delete Permanently
              </Button>
              <Button 
                variant="ghost" 
                className="h-16 rounded-[1.5rem] font-bold uppercase tracking-widest text-[10px] text-gray-400 hover:text-emerald-deep"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Retain Masterpiece
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 md:bottom-12 right-6 md:right-12 h-14 w-14 md:h-16 md:w-16 bg-white text-emerald-deep rounded-full shadow-[0_20px_50px_rgba(0,174,239,0.3)] flex items-center justify-center z-[100] hover:scale-110 active:scale-95 transition-all border border-emerald-deep/10"
          >
            <ArrowUp className="h-6 w-6" strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
