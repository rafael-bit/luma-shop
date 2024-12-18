import { TagIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const salesType = defineType({
	name: "salestype",
	title: "Sales",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "title",
			title: "Sale Title",
			type: "string",
		}),
		defineField({
			name: "description",
			title: "Sale Description",
			type: "text",
		}),
		defineField({
			name: "discountAmount",
			title: "Discount Amount",
			type: "number",
			description: "Amount off in percentage or fixed value",
		}),
		defineField({
			name: "couponCode",
			title: "Coupon Code",
			type: "string",
		}),
		defineField({
			name: "validFrom",
			title: "Valid From",
			type: "datetime",
		}),
		defineField({
			name: "validUntil",
			title: "Valid Until",
			type: "datetime",
		}),
		defineField({
			name: "isActive",
			title: "Is Active",
			type: "boolean",
			description: "Toogle to enable or disable the sale",
			initialValue: true,
		}),
	],
	preview: {
		select: {
			title: "title",
			discountAmount: "discountAmount",
			couponCode: "couponCode",
			isAtive: "isActive",
		},
		prepare(selection) {
			const { title, discountAmount, couponCode, isAtive } = selection;
			const status = isAtive ? "Active" : "Inactive";
			return {
				title,
				subtitle: `${discountAmount}% off - Code ${couponCode} - ${status}`,
			}
		}
	},
});