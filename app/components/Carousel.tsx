'use client';

import { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Carousel = () => {
	const slides = [
		{ id: 1, content: "Alexa", title: "Smart technology in your home", description: "Transform your living space with Alexa. From setting reminders to controlling smart devices, Alexa is your personal assistant to make life easier and more connected.", image: "/alexa.png" },
		{ id: 2, content: "Laptop", title: "Powerful Performance for Everyday Tasks", description: "Whether you're working, gaming, or streaming, this high-performance laptop delivers speed, reliability, and an immersive experience to keep you ahead.", image: "/computer.png" },
		{ id: 3, content: "Wireless Earbuds", title: "Sound Without Limits", description: "Experience crystal-clear audio and freedom of movement with our wireless earbuds. Perfect for work, workouts, or unwinding with your favorite tunes.", image: "/earbuds.png" },
		{ id: 4, content: "Smartwatch", title: "Fitness and Style in One", description: "Track your fitness goals, stay connected, and make a statement with a sleek smartwatch designed to keep up with your lifestyle.", image: "/smartwatch.png" },
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [fadeEffect, setFadeEffect] = useState(false);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	const prevSlide = () => {
		setFadeEffect(true);
		setTimeout(() => {
			setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
			setFadeEffect(false);
		}, 300);
	};

	const nextSlide = () => {
		setFadeEffect(true);
		setTimeout(() => {
			setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
			setFadeEffect(false);
		}, 300);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	}, []);

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 50) {
			nextSlide();
		}
		if (touchStart - touchEnd < -50) {
			prevSlide();
		}
	};

	return (
		<div
			className="relative h-[80vh] w-full max-w-5xl mx-auto overflow-hidden p-5 flex flex-col justify-center items-center"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div
				className={`flex items-center transition-transform duration-500 ${fadeEffect ? 'opacity-0' : 'opacity-100'} ease-in-out`}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{slides.map((slide) => (
					<div
						key={slide.id}
						className="flex-shrink-0 w-full h-full flex flex-col items-center text-center justify-center"
					>
						<h1 className="text-5xl font-bold">{slide.title}</h1>
						<p className="w-4/6 my-4 mb-7 text-sm text-gray-700 font-medium">{slide.description}</p>
						<button className="flex items-center justify-center gap-4 mb-12 bg-neutral-900 rounded-full transition-all duration-300 hover:bg-neutral-950 text-white pl-4 px-1 py-1">
							<span className="font-semibold">Order</span>
							<div className="w-8 h-8 flex items-center justify-center bg-neutral-50 text-neutral-900 rounded-full">
								<FaAngleRight className="w-5 h-5" />
							</div>
						</button>

						<div className="relative group">
							<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 blur-3xl opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
							<img src={slide.image} alt={slide.content} className="relative z-10 w-80 rounded-xl" />
						</div>
					</div>
				))}
			</div>

			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full transition-all duration-200 hover:bg-opacity-75"
			>
				<FaAngleLeft />
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full transition-all duration-200 hover:bg-opacity-75"
			>
				<FaAngleRight />
			</button>

			<div className="flex justify-center space-x-2 mt-4">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`w-2 h-2 rounded-full transition-all duration-400 ${currentIndex === index ? 'bg-neutral-700' : 'bg-gray-300'} hover:bg-neutral-800`}
					></button>
				))}
			</div>
		</div>
	);
};

export default Carousel;