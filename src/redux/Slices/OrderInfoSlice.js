import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orderItems: [],
	orderId: 0,
	methodtype: '',
	paymentamount: 0,
};
const OrderInfo = createSlice({
	name: 'orderInfo',
	initialState,
	reducers: {
		addOrderItem(state, action) {
			const existingItem = state.orderItems.find(
				(item) => item.seller_productId === action.payload.seller_productId
			);
			if (existingItem) {
				console.log('existingItem got triggered');
				Object.assign(existingItem, { ...action.payload });
			} else {
				state.orderItems.push({ ...action.payload });
			}
		},
		// todo this removes all of the orders
		removeOrderItem(state, action) {
			state.orderItems = state.orderItems.filter(
				(item) => item.seller_productId !== action.payload.seller_productId
			);
		},
		updateOrderDetails(state, action) {
			const { orderId, methodtype, paymentamount, orderItems } = action.payload;
			if (orderId !== undefined) state.orderId = orderId;
			if (methodtype !== undefined) state.methodtype = methodtype;
			if (paymentamount !== undefined) state.paymentamount = paymentamount;
			if (orderItems !== undefined) state.orderItems = orderItems;
		},
	},
});

export const { addOrderItem, removeOrderItem, updateOrderDetails } =
	OrderInfo.actions;
export const selectCartItems = (state) => state.orderInfo;
export default OrderInfo.reducer;
