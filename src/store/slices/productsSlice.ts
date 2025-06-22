import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { getProducts, addProduct } from '../../services/productApi';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Bilinmeyen bir hata oluştu');
    }
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Omit<Product, 'id'>, { rejectWithValue }) => {
    try {
      const data = await addProduct(product as Omit<Product, 'id'>);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ürün eklenirken bir hata oluştu');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ürünler yüklenirken bir hata oluştu';
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllProducts = (state: { products: ProductsState }) =>
  state.products.items;

export const selectProductsStatus = (state: { products: ProductsState }) =>
  state.products.status;

export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

export const selectProductById = (state: { products: ProductsState }, productId: string) =>
  state.products.items.find(product => product.id === productId);

export const selectProductsByCategory = createSelector(
  [selectAllProducts, (_, category: string) => category],
  (products, category) => {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  }
);

export const selectFilteredProducts = createSelector(
  [selectAllProducts, (_, filters: { searchTerm: string; category: string }) => filters],
  (products, { searchTerm, category }) => {
    let result = [...products];
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchLower) ||
          (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }
    
    if (category && category !== 'all') {
      result = result.filter(product => product.category === category);
    }
    
    return result;
  }
);

export const { setProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
