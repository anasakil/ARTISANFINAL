import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as categoriesAPI from './categoriesAPI';

export const fetchAllCategories = createAsyncThunk('categories/fetchAllCategories', async () => {
  return await categoriesAPI.fetchAllCategories();
});

export const createNewCategory = createAsyncThunk('categories/createNewCategory', async (categoryData) => {
  return await categoriesAPI.createCategory(categoryData);
});

export const updateExistingCategory = createAsyncThunk('categories/updateExistingCategory', async ({ id, categoryData }) => {
  return await categoriesAPI.updateCategory(id, categoryData);
});

export const removeCategory = createAsyncThunk('categories/removeCategory', async (categoryId) => {
  return await categoriesAPI.deleteCategory(categoryId);
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        const { _id, ...updatedCategory } = action.payload;
        const existingCategoryIndex = state.categories.findIndex((cat) => cat._id === _id);
        if (existingCategoryIndex !== -1) {
          state.categories[existingCategoryIndex] = { _id, ...updatedCategory };
        }
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload._id);
      });
  },
});

export default categoriesSlice.reducer;
