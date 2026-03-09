import React, { useState, useEffect } from "react";

import API from "../../api/axios";

const gradients = [
  "from-[#f8f5ec] via-[#f1e7d0] to-[#f8f5ec]",
  "from-[#f3f4f6] via-[#e5e7eb] to-[#f3f4f6]",
  "from-[#ecfdf5] via-[#d1fae5] to-[#ecfdf5]",
  "from-[#fff7ed] via-[#ffedd5] to-[#fff7ed]",
  "from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff]",
];

const Coupons = () => {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [coupons, setCoupons] = useState([]);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await API.get("/coupons");
        const activeCoupons = (res.data || []).filter(
          c => c.status === "Active"
        );

        const formatted = activeCoupons.map((c, i) => ({
          _id: c._id,
          title: c.code,
          subtitle: `${c.type.toUpperCase()} DISCOUNT`,
          highlight:
            c.type === "Percentage"
              ? `${c.discountValue}% OFF • MIN ₹${c.minSpend}`
              : `₹${c.discountValue} OFF • MIN ₹${c.minSpend}`,
          code: c.code,
          gradient: gradients[i % gradients.length],
        }));

        setCoupons(formatted);
      } catch (err) {
        console.error("Coupon fetch error:", err);
      }
    };

    fetchCoupons();
  }, []);

  /* ================= INFINITE LOOP LOGIC (UNCHANGED) ================= */
  const extendedCoupons =
    coupons.length > 0
      ? [coupons[coupons.length - 1], ...coupons, coupons[0]]
      : [];

  useEffect(() => {
    if (!coupons.length) return;

    const interval = setInterval(() => {
      setCurrent(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [coupons]);

  useEffect(() => {
    if (!extendedCoupons.length) return;
    if (current === extendedCoupons.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 700);
    }

    if (current === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(extendedCoupons.length - 2);
      }, 700);
    }

    setTimeout(() => setTransition(true), 800);
  }, [current, extendedCoupons.length]);

  if (!coupons.length) return null;

  return (
    <div className="w-full flex flex-col items-center relative overflow-hidden">

      <div className="w-full max-w-[1400px] h-[240px] sm:h-[260px] md:h-[280px] overflow-visible relative px-4 sm:px-8">

        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? "transform 0.7s ease-in-out" : "none",
          }}
        >
          {extendedCoupons.map((coupon, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center px-4 sm:px-10"
            >
              <div
                className={`coupon-editorial relative w-full h-[210px] sm:h-[230px] md:h-[250px] rounded-lg
                bg-gradient-to-r ${coupon.gradient}`}
              >

                <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center"
                     style={{ color: 'var(--noir)' }}>

                  {/* Editorial label */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-[1px]" style={{ background: 'var(--gold)' }}></div>
                    <span className="outfit text-[9px] sm:text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--gold-dark)' }}>
                      {coupon.subtitle}
                    </span>
                    <div className="w-5 h-[1px]" style={{ background: 'var(--gold)' }}></div>
                  </div>

                  {/* TITLE */}
                  <h2 className="playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] font-light">
                    {coupon.title}
                  </h2>

                  {/* CODE */}
                  <div className="coupon-code-editorial mt-5">
                    CODE: {coupon.code}
                  </div>

                  {/* HIGHLIGHT */}
                  <div className="mt-3 outfit text-[10px] sm:text-xs md:text-sm tracking-[0.2em]"
                       style={{ color: 'var(--smoke)' }}>
                    {coupon.highlight}
                  </div>

                  {/* Code duplicate (preserved from original) */}
                  {coupon.code && (
                    <div className="coupon-code-editorial mt-4">
                      CODE: {coupon.code}
                    </div>
                  )}

                  {/* Highlight duplicate (preserved from original) */}
                  <div className="mt-3 outfit text-[10px] sm:text-xs md:text-sm tracking-[0.2em]"
                       style={{ color: 'var(--smoke)' }}>
                    {coupon.highlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {coupons.map((_, i) => (
          <div key={i}
               className="transition-all duration-300"
               style={{
                 width: i === ((current - 1 + coupons.length) % coupons.length) ? '20px' : '5px',
                 height: '3px',
                 background: i === ((current - 1 + coupons.length) % coupons.length) ? 'var(--gold)' : 'rgba(0,0,0,0.12)',
                 borderRadius: '2px',
               }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes shine {
            0% { left: -60%; }
            100% { left: 120%; }
          }
          .animate-shine {
            animation: shine 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Coupons;
