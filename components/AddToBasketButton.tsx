'use client';

import useBasketStore from "@/app/(store)/store";
import { ProductType } from "@/sanity.types";
import { useState, useEffect } from "react";

interface AddToBasketButtonProps {
	product: ProductType;
	disabled?: boolean;
}

export default function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
	const { addItem, removeItem, getItemCount } = useBasketStore();
	const itemCount = getItemCount(product._id);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<div className="flex items-center justify-center space-x-3">
			<button
				onClick={() => removeItem(product._id)}
				className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${itemCount > 0 ? "bg-gray-400 hover:bg-gray-600" : "bg-neutral-300 cursor-not-allowed"
					}`}
				disabled={itemCount === 0 || disabled}
			>
				<span className={`text-lg font-bold ${itemCount > 0 ? "text-white" : "text-neutral-400"}`}>−</span>
			</button>
			<span className="w-8 text-center font-semibold">{itemCount}</span>
			<button
				onClick={() => addItem(product)}
				className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${disabled ? "bg-neutral-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
					}`}
				disabled={disabled}
			>
				<span className="text-lg font-bold text-white">+</span>
			</button>
		</div>
	);
}
