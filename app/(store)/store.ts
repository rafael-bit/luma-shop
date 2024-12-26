import { ProductType } from '@/sanity.types';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BasketItem {
	product: ProductType;
	quantity: number;
}

interface BasketState {
	items: BasketItem[];
	addItem: (product: ProductType) => void;
	removeItem: (productId: string) => void;
	clearBasket: () => void;
	getTotalPrice: () => number;
	getItemCount: (productId: string) => number;
	getGroupedItems: () => BasketItem[];
}

export const useBasketStore = create<BasketState>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (product) =>
				set((state) => {
					const existingItem = state.items.find((item) => item.product._id === product._id);

					if (existingItem) {
						return {
							items: state.items.map((item) =>
								item.product._id === product._id
									? { ...item, quantity: item.quantity + 1 }
									: item
							),
						};
					} else {
						return {
							items: [...state.items, { product, quantity: 1 }],
						};
					}
				}),
			removeItem: (productId) => set((state) => ({
				items: state.items.reduce((acc, item) => {
					if (item.product._id === productId) {
						if (item.quantity > 1) {
							acc.push({ ...item, quantity: item.quantity - 1 })
						}
					} else {
						acc.push(item)
					}

					return acc
				}, [] as BasketItem[])
			})),

			clearBasket: () => set({ items: [] }),
			getTotalPrice: () =>
				get().items.reduce(
					(total, item) => total + (item.product.price ?? 0) * item.quantity,
					0
				),
			getItemCount: (productId) => {
				const item = get().items.find(item => item.product._id === productId)
				return item ? item.quantity : 0
			},
			getGroupedItems: () => get().items.reduce((groupedItems, item) => {
				const existingItem = groupedItems.find((groupedItem) => groupedItem.product._id === item.product._id);

				if (existingItem) {
					existingItem.quantity += item.quantity;
				} else {
					groupedItems.push({ ...item });
				}

				return groupedItems;
			}, [] as BasketItem[])
		}),
		{
			name: 'basket-store',
		}
	)
);