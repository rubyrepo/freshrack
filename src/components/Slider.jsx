import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router';

import 'swiper/css';
import 'swiper/css/pagination';

const accent = '#00a63e';

const slides = [
  {
    img: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    alt: 'Fresh Fruits & Vegetables',
    title: 'Keep Your Food Fresh Longer',
    description: 'Track your groceries and get notified before they expire, reducing waste and saving money.',
    listTitle: 'Benefits of tracking:',
    items: [
      'Receive alerts for upcoming expiry dates',
      'Organize your fridge and pantry efficiently',
      'Reduce food waste and save money',
      'Know exactly what you have at a glance',
    ],
    buttonText: 'Start Tracking',
    link: '/add-food',
  },
  {
    img: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg',
    alt: 'Organized Kitchen',
    title: 'Organize Your Kitchen Like a Pro',
    description: 'Create a smart inventory of your food items, sorted by category and expiry date.',
    listTitle: 'What you can do:',
    items: [
      'Add and manage all your food items',
      'Track quantities and categories easily',
      'See items that are about to expire',
      'Maintain a clean and organized kitchen',
    ],
    buttonText: 'My Items',
    link: '/my-items',
  },
  {
    img: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg',
    alt: 'Reduce Waste',
    title: 'Save Money & Reduce Waste',
    description: 'Minimize food wastage and make smarter shopping decisions with timely alerts.',
    listTitle: 'How it helps:',
    items: [
      'Never forget about expiring items',
      'Plan your meals efficiently',
      'Track your pantry in one place',
      'Reduce unnecessary grocery expenses',
    ],
    buttonText: 'Learn More',
    link: '/about',
  },
];

const Slider = () => {
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full max-w-6xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row w-full h-[400px] md:h-[450px] bg-white rounded-lg shadow-lg border border-green-600 overflow-hidden mx-auto">
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-[200px] md:h-full flex-shrink-0">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
                <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: accent }}>
                  {slide.title}
                </p>
                <p className="mb-2 max-w-md text-gray-800">{slide.description}</p>
                <p className="font-semibold text-gray-900 mt-2">{slide.listTitle}</p>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm md:text-base text-gray-700">
                  {slide.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <NavLink to={slide.link} className="mt-6">
                  <button
                    className="py-3 px-8 md:py-4 md:px-10 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                    style={{ backgroundColor: accent, color: '#fff' }}
                  >
                    {slide.buttonText}
                  </button>
                </NavLink>  
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
