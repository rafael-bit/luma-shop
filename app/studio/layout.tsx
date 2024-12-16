import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Luma Shop",
	description: "Luma Shop the best e-commerce store",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
			<html lang="en">
				<body>
					{children}
				</body>
			</html>
	);
}