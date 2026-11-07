import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuData } from '../../data/menuData';
import { addToCart } from '../../utils/cartStore';
import { calculateProductPrice } from '../../utils/priceHelper';

// Redux importları
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favoritesSlice';
import { useAuth } from '../../features/auth/AuthContext';

import ProductHero from './ProductHero';
import SizeOptions from './SizeOptions';
import WhatsIncluded from './WhatsIncluded';
import OrderActionButtons from './OrderActionButtons';
import StoreAndCartBar from '../menu/StoreAndCartBar';
import CustomizationView from './CustomizationView';
import { getCustomizationDefaults } from '../../data/customizationOptions';

const findProductInTree = (nodes, productNumber, formCode) => {
  for (const node of nodes) {
    if (node.products?.length) {
      const hit = node.products.find(
        (p) =>
          String(p.productNumber) === String(productNumber) &&
          p.formCode?.toLowerCase() === formCode.toLowerCase()
      );
      if (hit) return hit;
    }
    if (node.children?.length) {
      const hit = findProductInTree(node.children, productNumber, formCode);
      if (hit) return hit;
    }
  }
  return null;
};

const findCategoryPath = (nodes, productNumber, formCode, path = []) => {
  for (const node of nodes) {
    if (node.products?.length) {
      const found = node.products.some(
        (p) =>
          String(p.productNumber) === String(productNumber) &&
          p.formCode?.toLowerCase() === formCode.toLowerCase()
      );
      if (found) return path;
    }
    if (node.children?.length) {
      const result = findCategoryPath(node.children, productNumber, formCode, [
        ...path,
        node.name,
      ]);
      if (result) return result;
    }
  }
  return null;
};

const estimateCalories = (product, sizeCode) => {
  if (!product) return 0;
  const n = product.name?.toLowerCase() ?? '';
  const code = sizeCode?.toLowerCase() ?? 'grande';
  const isLowCal =
    n.includes('americano') ||
    n.includes('brewed coffee') ||
    n.includes('black') ||
    n.includes('espresso shot') ||
    n.includes('water') ||
    (n.includes('tea') && !n.includes('latte') && !n.includes('lemonade'));

  const scale = isLowCal
    ? { short: 5, tall: 10, grande: 15, venti: 20, trenta: 25 }
    : { short: 90, tall: 120, grande: 150, venti: 220, trenta: 280 };

  return scale[code] ?? 150;
};

const ProductDetailPage = () => {
  const { productId, formCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const product = useMemo(
    () => (productId && formCode ? findProductInTree(menuData, productId, formCode) : null),
    [productId, formCode]
  );

  // Redux-dan favoritləri yoxlayırıq
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = useMemo(() => {
    if (!product) return false;
    return favorites.some((fav) => {
      if (fav.id && product.id) return String(fav.id) === String(product.id);
      const numMatch = String(fav.productNumber) === String(product.productNumber);
      if (fav.formCode && product.formCode) {
        return numMatch && String(fav.formCode).toLowerCase() === String(product.formCode).toLowerCase();
      }
      return numMatch;
    });
  }, [favorites, product]);

  const handleToggleFavorite = () => {
    if (!product) return;
    if (!user) {
      navigate('/account/signin');
      return;
    }
    dispatch(toggleFavorite(product));
    showToast(isFavorite ? `${product.name} removed from favorites` : `${product.name} added to favorites`);
  };

  const categoryPathName = useMemo(() => {
    if (!productId || !formCode) return '';
    const path = findCategoryPath(menuData, productId, formCode) ?? [];
    return path[path.length - 1] ?? 'Drinks';
  }, [productId, formCode]);



  const [activeSize, setActiveSize] = useState('');
  useEffect(() => {
    if (!product?.sizes?.length) return;
    const grande = product.sizes.find((s) => s.sizeCode === 'Grande');
    setActiveSize(grande ? 'Grande' : product.sizes[0].sizeCode);
  }, [product]);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customState, setCustomState] = useState({});

  useEffect(() => {
    if (product) {
      setCustomState(getCustomizationDefaults(product));
    }
  }, [product]);

  const handleCustomChange = (key, value) =>
    setCustomState((prev) => ({ ...prev, [key]: value }));

  const [quantity, setQuantity] = useState(1);

  const calories = useMemo(
    () => estimateCalories(product, activeSize),
    [product, activeSize]
  );

  // Dynamically calculated price based on selected size
  const currentPrice = useMemo(
    () => calculateProductPrice(product, activeSize),
    [product, activeSize]
  );

  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleAddToOrder = () => {
    if (!product) return;

    const item = {
      id: `${product.productNumber}-${product.formCode}-${Date.now()}`,
      productNumber: product.productNumber,
      formCode: product.formCode,
      name: product.name,
      image: product.assets?.masterImage?.uri,
      size: activeSize,
      price: currentPrice,
      quantity,
      customizations: { ...customState },
      calories,
    };

    addToCart(item);
    showToast(`${quantity > 1 ? `${quantity}× ` : ''}${product.name} added to your order`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 gap-4">
        <h2 className="text-xl font-semibold text-[#212121]">Product not found</h2>
        <button
          onClick={() => navigate('/menu')}
          className="px-6 py-2.5 bg-[#006241] text-white rounded-full text-[14px] font-medium hover:bg-[#004d32] transition-all cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const isIced = /iced|cold/i.test(product.formCode ?? '');
  const sizeVolumeDescription = useMemo(() => {
    if (!activeSize) return '';
    const code = activeSize.toLowerCase();
    const oz = code === 'short' ? '8 fl oz' :
               code === 'tall' ? '12 fl oz' :
               code === 'grande' ? '16 fl oz' :
               code === 'venti' ? (isIced ? '24 fl oz' : '20 fl oz') :
               code === 'trenta' ? '30 fl oz' : '';
    return `${activeSize} ${oz}`.trim();
  }, [activeSize, isIced]);

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* ── Success toast ── */}
      <div
        aria-live="polite"
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 bg-[#006241] text-white text-[13px] font-medium px-6 py-3 rounded-full shadow-2xl pointer-events-none transition-all duration-300 ${
          toast.visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4'
        }`}
      >
        <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {toast.message}
      </div>

      {isCustomizing ? (
        <CustomizationView
          product={product}
          activeSize={activeSize}
          sizeVolumeDescription={sizeVolumeDescription}
          calories={calories}
          customState={customState}
          onChange={handleCustomChange}
          onClose={() => setIsCustomizing(false)}
          onAddToOrder={() => {
            handleAddToOrder();
            setIsCustomizing(false);
          }}
        />
      ) : (
        <>
          <ProductHero
            product={product}
            calories={calories}
            categoryPathName={categoryPathName}
            price={currentPrice}
          />

          <div className="bg-white flex-1">
            <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              <div className="w-full md:w-1/2">
                <SizeOptions
                  sizes={product.sizes ?? []}
                  activeSize={activeSize}
                  onSizeSelect={setActiveSize}
                  formCode={formCode}
                  product={product}
                />
              </div>

              <div className="w-full md:w-1/2">
                <WhatsIncluded
                  product={product}
                  state={customState}
                  onChange={handleCustomChange}
                />
              </div>
            </div>

            <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 pb-10">
              <OrderActionButtons
                onAddToOrder={handleAddToOrder}
                onCustomizeClick={() => setIsCustomizing(true)}
                onFavoriteClick={handleToggleFavorite}
                isFavorite={isFavorite}
              />
            </div>
          </div>
        </>
      )}

      {/* ── Fixed bottom store/cart bar ── */}
      <StoreAndCartBar />
    </div>
  );
};

export default ProductDetailPage;