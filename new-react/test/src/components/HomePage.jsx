import { useState, useEffect } from "react";

// Import images (adjust paths according to your project structure)
import banner1 from "../assest/banner/ba.jpeg";
import banner2 from "../assest/banner/bann.jpeg";
import banner3 from "../assest/banner/bc.jpeg";
import product1 from "../assest/prodduct/pd1.jpeg";
import product2 from "../assest/prodduct/pd2.jpeg";
import product3 from "../assest/prodduct/pd3.jpeg";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: banner1, text: "GREENTOUCH CHEMICALS PVT. LTD." },
    { img: banner2, text: "GREENTOUCH CHEMICALS PVT. LTD." }, 
    { img: banner3, text: "GREENTOUCH CHEMICALS PVT. LTD." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div
        className="relative w-full h-full flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.img}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.text}
              </h1>
              <p className="text-lg md:text-xl">
                Chemistry in Harmony with Nature
              </p>
              <button className="mt-6 px-6 py-3 bg-green-800 hover:bg-green-700 transition rounded-lg text-lg font-semibold">
                Contact Us
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full border border-white transition-all ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
        }
        className="absolute left-5 top-2/4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
        }
        className="absolute right-5 top-2/4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
      >
        ❯
      </button>
    </section>
  );
};

const Products = () => {
  const products = [
    {
      img: product1,
      title: "Prithvi Liquid Blue",
      description: "Enhance your whites with Prithvi Liquid Blue...",
    },
    {
      img: product2,
      title: "Prithvi Phenyl",
      description: "Keep your home fresh and germ-free...",
    },
    {
      img: product3,
      title: "Prithvi Tiles Cleaner",
      description: "Restore the sparkle of your floors...",
    },
  ];

  return (
    <section id="products" className="container mx-auto px-4 md:px-6 py-2">
      <h2 className="py-2 text-3xl md:text-4xl font-bold text-center mb-12 text-green-700 transition duration-300 ease-in-out hover:bg-yellow-300 hover:text-black rounded">
        Prithvi Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-700/60 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-700">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-4 font-sans text-lg tracking-wide">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      initials: "JD",
      name: "John Doe",
      role: "Eco Enthusiast",
      text: "The quality of these products exceeded my expectations...",
    },
    {
      initials: "AS",
      name: "Anna Smith",
      role: "Sustainable Living Blogger",
      text: "Finally found a brand that aligns with my values...",
    },
  ];

  return (
    <section className="bg-green-50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="py-2 text-3xl md:text-4xl font-bold text-center mb-12 text-green-700 transition duration-300 ease-in-out hover:bg-yellow-300 hover:text-black rounded">
          Our Proud Customers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-green-700">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <section className="container mx-auto px-4 md:px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">
            Our Sustainable Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Committed to environmental stewardship, we curate eco-conscious
            products that combine innovative design with sustainable materials.
            Join us in reducing our carbon footprint one purchase at a time.
          </p>
        </div>
      </section>
      <Products />
      <Testimonials />
    </>
  );
};

export default HomePage;
