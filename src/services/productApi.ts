import { Product } from '../types/product';

const mockProducts: Product[] = [
  {
      id: '1',
      name: 'Pamuk İplik Seti',
      description: 'Kaliteli pamuk iplik, 10 farklı renk seçeneği ile birlikte',
      price: 89.99,
      image: '/pamuk_iplik_seti.jpeg',
      category: 'İplik',
      quantity: 1,
      stock: undefined
  },
  {
      id: '2',
      name: 'Dikiş Makası',
      description: 'Paslanmaz çelik profesyonel dikiş makası',
      price: 129.99,
      image: '/dikis_makasi.jpg',
      category: 'Aksesuar',
      quantity: 1,
      stock: undefined
  },
  {
      id: '3',
      name: 'Renkli Düğme Seti',
      description: '100 adet karışık renk ve boyutta düğme seti',
      price: 45.50,
      image: '/dugme.jpeg', // Eğer görünmezse '/dugme.jpg' olarak da deneyin
      category: 'Düğme',
      quantity: 1,
      stock: undefined
  },
  {
      id: '4',
      name: 'Pamuklu Kumaş',
      description: '1 metre eninde, 100% pamuklu kumaş',
      price: 75.00,
      image: '/pamuklu_kumas.jpeg',
      category: 'Kumaş',
      quantity: 1,
      stock: undefined
  },
  {
      id: '5',
      name: 'Dantel Şerit',
      description: '2 metre uzunluğunda ince dantel şerit',
      price: 32.99,
      image: '/dantel_serit.jpeg',
      category: 'Dantel',
      quantity: 1,
      stock: undefined
  },
  {
      id: '6',
      name: 'Nakış İğnesi Seti',
      description: 'Farklı boyutlarda 12 adet nakış iğnesi',
      price: 28.50,
      image: '/igne_seti.jpg',
      category: 'Aksesuar',
      quantity: 1,
      stock: undefined
  }
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.find(product => product.id === id));
    }, 500);
  });
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct: Product = {
        ...product,
        id: (mockProducts.length + 1).toString(),
      };
      mockProducts.push(newProduct);
      resolve(newProduct);
    }, 500);
  });
};
