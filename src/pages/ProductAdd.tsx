import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../store/hooks';
import { addNewProduct } from '../store/slices/productsSlice';
import { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';

// Form değerleri için tip tanımı
type FormValues = Omit<Product, 'id'> & { quantity: number };

// Kategoriler
const categories = ['İplikler', 'Düğmeler', 'Dantel & Kumaş', 'Aksesuar'];

// Form başlangıç değerleri
const initialValues: FormValues = {
    name: '',
    description: '',
    price: 0,
    image: '/pamuk_iplik_seti.jpeg',
    category: 'İplikler',
    stock: 1,
    quantity: 0
};

// Doğrulama şeması
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'En az 3 karakter olmalıdır')
    .max(100, 'En fazla 100 karakter olabilir')
    .required('Ürün adı zorunludur'),
  description: Yup.string()
    .min(10, 'En az 10 karakter olmalıdır')
    .required('Açıklama zorunludur'),
  price: Yup.number()
    .min(0.01, 'Fiyat 0.01 TL\'den büyük olmalıdır')
    .required('Fiyat zorunludur'),
  image: Yup.string()
    .required('Resim yolu zorunludur'),
  category: Yup.string()
    .oneOf(categories, 'Geçerli bir kategori seçiniz')
    .required('Kategori seçimi zorunludur'),
  stock: Yup.number()
    .min(0, 'Stok 0\'dan küçük olamaz')
    .integer('Tam sayı olmalıdır')
    .required('Stok bilgisi zorunludur'),
});

const ProductAdd: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const { quantity, ...productData } = values;
      const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          stock: quantity,
          quantity: 0
      };
      
await dispatch(addNewProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        image: values.image,
        category: values.category,
        stock: values.quantity,
        quantity: 0
      }));
      resetForm();
      alert('Ürün başarıyla eklendi!');
      navigate('/urunler');
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu:', error);
      alert('Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Yeni Ürün Ekle</h1>
          
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Ürün Adı */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Örnek: Pamuklu İplik"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>

            {/* Açıklama */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Ürünün özelliklerini ve detaylarını yazın"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fiyat */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Fiyat (₺) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₺</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    className={`block w-full pl-7 pr-12 sm:text-sm rounded-md ${
                      formik.touched.price && formik.errors.price
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {formik.touched.price && formik.errors.price && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>
                )}
              </div>

              {/* Miktar */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Miktar <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    formik.touched.quantity && formik.errors.quantity
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.quantity}</p>
                )}
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.touched.category && formik.errors.category
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
              )}
            </div>

            {/* Resim URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Resim URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="image"
                name="image"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.touched.image && formik.errors.image
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="/pamuk_iplik_seti.jpeg"
              />
              {formik.touched.image && formik.errors.image ? (
                <p className="mt-1 text-sm text-red-600">{formik.errors.image}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Ürün resminin URL adresini giriniz</p>
              )}
            </div>

            {/* Önizleme */}
            {formik.values.image && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Resim Önizleme</p>
                <div className="mt-1 w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={formik.values.image}
                    alt="Ürün önizleme"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjE3M0E0RCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMi41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg=='; // Basit bir resim ikonu
                    }}
                  />
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {formik.isSubmitting ? 'Ekleniyor...' : 'Ürünü Ekle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
