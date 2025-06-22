export interface Product {
  stock: any;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  badge?: string; // "Yeni", "İndirim" vb. rozetler için opsiyonel alan
}
