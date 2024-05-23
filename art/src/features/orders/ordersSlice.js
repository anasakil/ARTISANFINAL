import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSellerOrders, updateOrder, deleteOrder } from './ordersAPI';

export const getSellerOrders = createAsyncThunk(
    'orders/fetchSeller',
    async (_, { getState, rejectWithValue }) => {
        const token = localStorage.getItem('token');

        try {
            return await fetchSellerOrders(token);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateSellerOrder = createAsyncThunk(
    'orders/update',
    async ({ orderId, status, token }, { rejectWithValue }) => {
        try {
            return await updateOrder(orderId, status, token);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSellerOrder = createAsyncThunk(
    'orders/delete',
    async ({ orderId, token }, { rejectWithValue }) => {
        try {
            await deleteOrder(orderId, token);
            return orderId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSellerOrders.fulfilled, (state, action) => {
                state.orders = Array.isArray(action.payload.orders) ? action.payload.orders : [];
                state.status = 'succeeded';
            })

            .addCase(updateSellerOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(deleteSellerOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order._id !== action.payload);
            });
    },
});

export default ordersSlice.reducer;
