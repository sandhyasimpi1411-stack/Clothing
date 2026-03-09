import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const HeroCarousel = () => {
  const navigate = useNavigate();
  const visibleSlides = 3;

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  /* 🔹 FETCH + FILTER CAROUSEL PRODUCTS */
  useEffect(() => {
    const fetchCarouselProducts = async () => {
      try {
        const res = await API.get("/products");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products;

        /* ✅ ONLY PRODUCTS WITH CAROUSEL TEXT */
        const carouselProducts = data
          .filter(p =>
            p.carouselTitle ||
            p.carouselSubtitle ||
            p.carouselPriceText
          )
          .slice(0, 7); // ✅ MAX 7 PRODUCTS

        setProducts(carouselProducts);
      } catch (err) {
        console.error("Carousel fetch error:", err);
      }
    };

    fetchCarouselProducts();
  }, []);

  /* DUPLICATE SLIDES FOR INFINITE LOOP */
  const slides =
    products.length > 0
      ? [...products, ...products.slice(0, visibleSlides)]
      : [];

  /* AUTO SLIDE */
 /* AUTO SLIDE (FASTER ON MOBILE) */
useEffect(() => {
  if (!products.length) return;

  const isMobile = window.innerWidth < 640; // Tailwind sm breakpoint
  const intervalTime = isMobile ? 2000 : 3000; // faster on mobile

  const interval = setInterval(() => {
    setIndex(prev => prev + 1);
  }, intervalTime);

  return () => clearInterval(interval);
}, [products]);


  /* LOOP RESET */
  useEffect(() => {
    if (index === products.length) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(0);
      }, 700);
    } else {
      setIsAnimating(true);
    }
  }, [index, products.length]);

  if (!products.length) return null;

  return (
    <div className="carousel-cinematic w-full relative py-4">
      <div className="w-full mx-auto px-4 sm:px-6 overflow-hidden relative">

        {/* LEFT NAV */}
        <button
          onClick={() => index > 0 && setIndex(index - 1)}
          className="carousel-btn absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10
          p-2.5 sm:p-3.5 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT NAV */}
        <button
          onClick={() => setIndex(index + 1)}
          className="carousel-btn absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10
          p-2.5 sm:p-3.5 rounded-full"
        >
          <ChevronRight size={20} />
        </button>

        {/* TRACK */}
        <div
          className={`flex w-[70%] ${
            isAnimating ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${index * (100 / visibleSlides)}%)`,
          }}
        >
          {slides.map((item, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
            >
              <div
                className="carousel-slide-card relative aspect-9/10 overflow-hidden group"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img
                  src={item.colors?.[0]?.images?.[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {/* Cinematic overlay */}
                <div className="absolute inset-0 carousel-slide-overlay flex flex-col justify-end p-4 sm:p-6 text-white">
                  {/* Gold accent line */}
                  <div className="w-8 h-[2px] mb-3" style={{ background: 'var(--gold)' }}></div>
                  <h2 className="playfair text-lg sm:text-2xl font-semibold leading-tight mb-1"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                    {item.carouselTitle}
                  </h2>
                  <p className="outfit text-[11px] sm:text-sm mt-0.5 text-white/65 tracking-wide">{item.carouselSubtitle}</p>
                  <p className="outfit text-base sm:text-lg mt-1.5 font-semibold tracking-wide">
                    <b>MRP: </b>{item.carouselPriceText}
                  </p>
                  <p className="outfit text-[10px] sm:text-xs text-white/50 mt-0.5 tracking-wider uppercase"><span><b>Size: </b></span>{item.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, i) => (
          <div key={i}
               className="transition-all duration-300"
               style={{
                 width: i === (index % products.length) ? '24px' : '6px',
                 height: '3px',
                 background: i === (index % products.length) ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                 borderRadius: '2px',
               }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
