'use client'

import { Category } from "@/sanity.types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Check, ChevronDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { cn } from "@/lib/utils"

interface CategorySelectorProps {
	categories: Category[]
}

export default function CategorySelectorComponent({ categories }: CategorySelectorProps) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState<string>('')

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role="combobox"
					aria-expanded={open}
					className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 border border-neutral-800 bg-neutral-950 outline-none px-2 py-1 rounded-lg text-neutral-100 placeholder:text-neutral-100"
				>
					{value ? categories.find((category) => category._id === value)?.title : 'Filter by category'}
					<ChevronDown className="ml-2 h-4 w-4 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 relative left-3">
				<Command>
					<CommandInput
						placeholder="Search categories..."
						className="h-9"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								const selectedCategory = categories.find((category) => category.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
								if (selectedCategory?.slug?.current) {
									setValue(selectedCategory._id)
									router.push(`/categories/${selectedCategory.slug.current}`)
									setOpen(false)
								}
							}
						}} />
					<CommandList>
						<CommandEmpty>No categories found.</CommandEmpty>
						<CommandGroup>
							{categories.map((category) => (
								<CommandItem
									key={category._id}
									value={category.title}
									onSelect={() => {
										setValue(value === category._id ? '' : category._id)
										router.push(`/categories/${category.slug?.current}`)
										setOpen(false)
									}}
								>
									{category.title}
									<Check
										className={cn("ml-auto h-4 w-4", value === category._id ? "opacity-100" : "opacity-0")}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
