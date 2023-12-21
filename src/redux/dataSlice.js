import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "http://localhost:3002";

const PRODUCTS_URL = `${BASE_URL}/products`;
const CATEGORIES_URL = `${BASE_URL}/categories`;
const BRANDS_URL = `${BASE_URL}/brands`;
const SLIDER_BANNERS_URL = `${BASE_URL}/sliderBanners`;
const FEATURED_PRODUCTS_URL = `${BASE_URL}/products?productType=Featured`;
const NEW_PRODUCTS_URL = `${BASE_URL}/products?productType=New`;
const DISCOUNTED_PRODUCTS_URL = `${BASE_URL}/products?productType=Discounted`;

const initialState = {
  sliderBanners: [],
  products: [],
  categories: [],
  featuredProducts: [],
  newProducts: [],
  discountedProducts: [],
  brands: [],
  filteredProducts: [],
  similarProducts: [],
  favouriteProducts: [],
  favPro: [],
  currentProduct: null,
  currentCategory: null,
};

export const fetchBanners = createAsyncThunk("data/fetchBanners", async () => {
  try {
    const response = await axios.get(SLIDER_BANNERS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
    try {
      const response = await axios.get(PRODUCTS_URL);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchFeaturedProducts = createAsyncThunk(
  "data/fetchFeaturedProducts",
  async () => {
    try {
      const response = await axios.get(FEATURED_PRODUCTS_URL);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchNewProducts = createAsyncThunk(
  "data/fetchNewProducts",
  async () => {
    try {
      const response = await axios.get(NEW_PRODUCTS_URL);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchDiscountedProducts = createAsyncThunk(
  "data/fetchDiscountedProducts",
  async () => {
    try {
      const response = await axios.get(DISCOUNTED_PRODUCTS_URL);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchCategories = createAsyncThunk(
  "data/fetchCategories",
  async () => {
    try {
      const response = await axios.get(CATEGORIES_URL);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchBrands = createAsyncThunk("data/fetchBrands", async () => {
  try {
    const response = await axios.get(BRANDS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const fetchFilteredProducts = createAsyncThunk(
  "data/fetchFilteredProducts",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const getCurrentProduct = createAsyncThunk(
  "data/getCurrentProduct",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const getCurrentCategory = createAsyncThunk(
  "data/getCurrentCategory",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const getSimilarProducts = createAsyncThunk(
  "data/getSimilarProducts",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    sortFilteredProducts: (state, action) => {
      state.filteredProducts = [
        ...state.filteredProducts.sort((a, b) =>
          action.payload === "asc"
            ? a.price - b.price
            : action.payload === "desc"
            ? b.price - a.price
            : null
        ),
      ];
    },
    addProductToFavourites: (state, action) => {
      let isInclude = state.favouriteProducts.some((product) => {
        return product.id === action.payload.id;
      });
      // console.log("isInclude", isInclude);
      console.log("action.payload.id", action.payload.id);
      if (isInclude) {
        state.favouriteProducts = [
          ...state.favouriteProducts.filter(
            (products) => products.id != action.payload.id
          ),
        ];
      } else {
        state.favouriteProducts = [...state.favouriteProducts, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.sliderBanners = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.newProducts = action.payload;
      })
      .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
        state.discountedProducts = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      })
      .addCase(getCurrentProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(getCurrentCategory.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        const tempSimilar = action.payload;
        const cP = state.currentProduct;
        state.similarProducts = tempSimilar.filter(
          (product) => product.id != cP.id
        );
      });
  },
});

export const {
  sortFilteredProducts,
  addProductToFavourites,
  isAlreadyInsideForFavourite,
} = dataSlice.actions;

export default dataSlice.reducer;
