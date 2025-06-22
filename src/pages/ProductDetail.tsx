import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectProductById } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types/product';
import { FiArrowLeft, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => selectProductById(state, id || ''));
  
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde en üste kaydır
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      dispatch(addToCart({ ...product, quantity }));
      navigate('/sepet');
    } catch (error) {
      console.error('Sepete eklenirken bir hata oluştu:', error);
      // Hata durumunda kullanıcıya bildirim gösterebilirsiniz
    } finally {
      setIsAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız ürün bulunamadı veya artık mevcut değil.</p>
          <Link 
            to="/urunler" 
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiArrowLeft />
            Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img
                    src={product.image || '/images/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 h-full">
                <div className="mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">
                    {product.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-2 sm:mb-3">
                    {product.name}
                  </h1>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">(0 değerlendirme)</span>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
                  </p>
                  
                  <div className="prose max-w-none text-gray-700 mb-6 sm:mb-8">
                    <p className="whitespace-pre-line">
                      {product.description || 'Ürün açıklaması mevcut değil.'}
                    </p>
                  </div>

                  <form onSubmit={handleAddToCart} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={decreaseQuantity}
                            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none transition-colors"
                            disabled={quantity <= 1}
                            aria-label="Azalt"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-3 sm:px-4 py-2 sm:py-2.5 w-12 text-center border-x border-gray-200 font-medium">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={increaseQuantity}
                            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none transition-colors"
                            aria-label="Arttır"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500 ml-3 sm:ml-4">
                          Stok: <span className="font-medium">{product.stock || 'Mevcut'}</span>
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isAddingToCart}
                      className={`w-full flex items-center justify-center px-6 py-3.5 sm:py-4 border border-transparent text-base font-medium rounded-lg text-white ${
                        isAddingToCart 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                    >
                      {isAddingToCart ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Ekleniyor...
                        </>
                      ) : (
                        <>
                          <FiShoppingCart className="mr-2" />
                          Sepete Ekle
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Ürün Detayları</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex flex-col sm:flex-row">
                      <span className="w-full sm:w-32 text-gray-500 flex-shrink-0">Kategori:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <span className="w-full sm:w-32 text-gray-500 flex-shrink-0">Stok Durumu:</span>
                      <span className={`font-medium ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock ? 'Stokta Var' : 'Stokta Yok'}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <span className="w-full sm:w-32 text-gray-500 flex-shrink-0">Ürün Kodu:</span>
                      <span className="font-mono">{product.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Buraya ilgili ürünler eklenecek */}
              <div className="col-span-full py-8 text-center bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Şu an için benzer ürün bulunmuyor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
