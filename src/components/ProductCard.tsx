import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

import { useNavigate } from 'react-router-dom';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, name, description, price, image, category } = product;
  const [showCartModal, setShowCartModal] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    setShowCartModal(true);
  };

  const handleGoToCart = () => {
    setShowCartModal(false);
    navigate('/sepet');
  };

  const handleContinueShopping = () => {
    setShowCartModal(false);
  };


  return (
    <>
      {/* Sepete Eklendi Modalı */}
      {showCartModal && (
        <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.25)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 32px #f94f9c33', padding:'36px 28px', minWidth:320, textAlign:'center', border:'2px solid #f94f9c'}}>
            <div style={{fontSize:'1.18rem', fontWeight:700, color:'#f94f9c', marginBottom:18}}>Ürün sepete eklendi!<br/>Alışverişe devam etmek istiyor musunuz yoksa sepete mi gideceksiniz?</div>
            <div style={{display:'flex', gap:18, justifyContent:'center'}}>
              <button onClick={handleContinueShopping} style={{background:'#f94f9c', color:'#fff', fontWeight:700, padding:'10px 22px', borderRadius:8, border:'none', fontSize:'1rem', boxShadow:'0 2px 8px #f94f9c22', cursor:'pointer'}}>Alışverişe Devam Et</button>
              <button onClick={handleGoToCart} style={{background:'#fff', color:'#f94f9c', fontWeight:700, padding:'10px 22px', borderRadius:8, border:'2px solid #f94f9c', fontSize:'1rem', cursor:'pointer'}}>Sepete Git</button>
            </div>
          </div>
        </div>
      )}
      <div className="group block bg-light dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-light dark:border-gray-700 relative">
        <Link
          to={`/urun/${id}`}
          className="absolute inset-0 z-10"
          tabIndex={-1}
          aria-label={name}
        />
        <div className="relative pt-[100%] bg-accent/30 dark:bg-gray-700 overflow-hidden">
          <img
            src={image || '/images/placeholder.jpg'}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider mb-1 inline-block text-[#c2185b] dark:text-[#ffb6e6]">
            {category}
          </span>
          <h3 className="text-lg font-bold text-[#3a0a5c] dark:text-white mb-2 line-clamp-2">
            {name}
          </h3>
          <p className="text-[#4d1558] dark:text-[#ffe4f1] text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="mt-auto pt-4 border-t border-light dark:border-gray-700 flex items-center justify-between">
            <span className="text-lg font-bold text-[#c2185b] dark:text-[#c2185b]">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="text-sm bg-primary dark:bg-accent text-white px-4 py-2 rounded-full shadow hover:bg-accent hover:dark:bg-primary hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent z-20"
              type="button"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;