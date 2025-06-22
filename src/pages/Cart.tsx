import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';
import { clearCart, removeFromCart, updateCartItem } from '../store/slices/cartSlice';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const [confirmRemoveId, setConfirmRemoveId] = React.useState<string | null>(null);
  const handleRemoveFromCart = (productId: string) => {
    setConfirmRemoveId(productId);
  };
  const confirmRemove = () => {
    if (confirmRemoveId) {
      dispatch(removeFromCart(confirmRemoveId));
      setConfirmRemoveId(null);
    }
  };
  const cancelRemove = () => setConfirmRemoveId(null);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
    } else {
      dispatch(updateCartItem({ id: productId, quantity: newQuantity }));
    }
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 19.99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-light dark:bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-light dark:border-gray-700">
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, #ffd6ef 0%, #ffe5f7 100%)'}}>
            {/* Pastel pink basket SVG */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" rx="18" fill="#ffe5f7"/>
              <path d="M16 26h24l-2.5 14.5a3 3 0 01-3 2.5h-13a3 3 0 01-3-2.5L16 26z" fill="#f9b3dd"/>
              <path d="M22 24v-7a6 6 0 1112 0v7" stroke="#f94f9c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="35" r="2.2" fill="#f94f9c"/>
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Sepetiniz Boş</h2>
<p className="text-gray-500 dark:text-light mb-6 max-w-md mx-auto">Alışverişe başlamak için ürün ekleyin.</p>

{/* Empty Cart Table */}
<div className="overflow-x-auto mb-6">
  <table className="min-w-full border border-gray-200 rounded-lg bg-gray-50">
    <thead>
      <tr>
        <th className="px-4 py-2 border-b text-left text-gray-700 text-sm font-semibold">Ürün</th>
        <th className="px-4 py-2 border-b text-left text-gray-700 text-sm font-semibold">Adet</th>
        <th className="px-4 py-2 border-b text-left text-gray-700 text-sm font-semibold">Fiyat</th>
        <th className="px-4 py-2 border-b text-left text-gray-700 text-sm font-semibold">Toplam</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-4 py-6 text-center text-gray-400" colSpan={4}>
          Sepette ürün yok
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div className="flex justify-center">
            <Link
              to="/urunler"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow text-white bg-primary dark:bg-accent hover:bg-accent hover:dark:bg-primary hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
            >
              <FiArrowLeft className="mr-2 -ml-1 h-5 w-5" />
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-gray-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Emin misiniz? Modalı */}
      {confirmRemoveId && (
        <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.25)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 32px #f94f9c33', padding:'36px 28px', minWidth:320, textAlign:'center', border:'2px solid #f94f9c'}}>
            <div style={{fontSize:'1.18rem', fontWeight:700, color:'#f94f9c', marginBottom:18}}>Ürünü sepetten çıkarmak istediğinize emin misiniz?</div>
            <div style={{display:'flex', gap:18, justifyContent:'center'}}>
              <button onClick={confirmRemove} style={{background:'#f94f9c', color:'#fff', fontWeight:700, padding:'10px 22px', borderRadius:8, border:'none', fontSize:'1rem', boxShadow:'0 2px 8px #f94f9c22', cursor:'pointer'}}>Evet</button>
              <button onClick={cancelRemove} style={{background:'#fff', color:'#f94f9c', fontWeight:700, padding:'10px 22px', borderRadius:8, border:'2px solid #f94f9c', fontSize:'1rem', cursor:'pointer'}}>Hayır</button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Alışveriş Sepetim</h1>
          <p className="text-sm text-gray-500 dark:text-light mt-1">{items.length} ürün</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ürün Listesi */}
          <section aria-labelledby="cart-heading" className="lg:col-span-8 mb-6 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image || '/images/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div className="pr-4">
                            <h3 className="text-base font-medium text-gray-900">
                              <Link to={`/urun/${item.id}`} className="hover:text-blue-600 transition-colors">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            <p className="mt-1 text-base font-medium text-gray-900">
                              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="p-1 -mt-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Ürünü kaldır"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between sm:justify-start">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none transition-colors"
                              aria-label="Azalt"
                            >
                              <FiMinus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-2 w-12 text-center border-x border-gray-200 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none transition-colors"
                              aria-label="Arttır"
                            >
                              <FiPlus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-right sm:ml-8">
                            <div className="text-sm text-gray-500">Toplam</div>
                            <div className="text-lg font-bold text-gray-900">
                              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center transition-colors"
                >
                  <FiTrash2 className="mr-1.5 h-4 w-4" />
                  Sepeti Temizle
                </button>
              </div>
            </div>
          </section>

          {/* Sipariş Özeti - Sağda */}
          <section aria-labelledby="summary-heading" className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6 border border-pink-100">
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900 mb-6">
                Sipariş Özeti
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="text-gray-600">Kargo Ücreti</span>
                  <span className="font-medium">{shipping > 0 ? `${shipping.toFixed(2)} TL` : 'Ücretsiz'}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100 text-lg font-bold">
                  <span>Toplam</span>
                  <span>{total.toFixed(2)} TL</span>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <Link
                  to="/checkout"
                  className="w-full flex justify-center items-center px-6 py-3.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition-colors"
                >
                  Ödemeye Geç
                </Link>
                <Link
                  to="/urunler"
                  className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-200 transition-colors"
                >
                  Alışverişe Devam Et
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{total.toFixed(2)} ₺</div>
                  <div className="text-sm text-gray-500">KDV Dahil</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
