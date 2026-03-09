// import React, { useState } from 'react';
// import './KidsFilterSidebar.css';

// export default function KidsFilterSidebar() {
//   const [selectedGender, setSelectedGender] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState(250);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Handle gender selection
//   const handleGenderChange = (gender) => {
//     setSelectedGender(selectedGender === gender ? '' : gender);
//   };

//   // Handle category selection (multiple)
//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((cat) => cat !== category)
//         : [...prev, category]
//     );
//   };

//   // Handle price slider
//   const handlePriceChange = (value) => {
//     setPriceRange(value);
//   };

//   // Handle apply filters
//   const handleApplyFilters = () => {
//     const filters = {
//       gender: selectedGender,
//       categories: selectedCategories,
//       maxPrice: priceRange,
//     };
//     console.log('Applied Filters:', filters);
//     // Dispatch to parent component or Redux store
//   };

//   // Toggle sidebar on mobile
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button className="mobile-toggle" onClick={toggleSidebar}>
//         🧸 Filters
//       </button>

//       {/* Filter Sidebar */}
//       <div className={`kids-sidebar ${sidebarOpen ? 'open' : ''}`}>
//         {/* Header */}
//         <div className="sidebar-header">
//           <h2>🧸 Kids Filters</h2>
//           {/* Close button for mobile */}
//           <button
//             className="close-btn"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Gender Filter Section */}
//         <div className="filter-section">
//           <h3 className="filter-title">👕 Gender</h3>
//           <div className="filter-options">
//             {['Boys', 'Girls', 'Baby'].map((gender) => (
//               <div
//                 key={gender}
//                 className={`filter-option ${
//                   selectedGender === gender ? 'selected' : ''
//                 }`}
//                 onClick={() => handleGenderChange(gender)}
//               >
//                 <input
//                   type="radio"
//                   id={`gender-${gender}`}
//                   name="gender"
//                   value={gender}
//                   checked={selectedGender === gender}
//                   onChange={() => {}}
//                 />
//                 <label htmlFor={`gender-${gender}`}>{gender}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Category Filter Section */}
//         <div className="filter-section">
//           <h3 className="filter-title">🎨 Category</h3>
//           <div className="filter-options">
//             {['T-Shirts', 'Dresses', 'Jackets', 'Shoes'].map((category) => (
//               <div
//                 key={category}
//                 className={`filter-option ${
//                   selectedCategories.includes(category) ? 'selected' : ''
//                 }`}
//                 onClick={() => handleCategoryChange(category)}
//               >
//                 <input
//                   type="checkbox"
//                   id={`category-${category}`}
//                   value={category}
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => {}}
//                 />
//                 <label htmlFor={`category-${category}`}>{category}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Price Range Filter Section */}
//         <div className="filter-section">
//           <h3 className="filter-title">💰 Price Range</h3>
//           <div className="price-slider-container">
//             <div className="price-range">
//               <span>$0</span>
//               <span>$500</span>
//             </div>
//             <input
//               type="range"
//               className="price-slider"
//               min="0"
//               max="500"
//               value={priceRange}
//               onChange={(e) => handlePriceChange(Number(e.target.value))}
//             />
//             <div className="price-value">${priceRange}</div>
//           </div>
//         </div>

//         {/* Apply Filters Button */}
//         <button className="apply-filters-btn" onClick={handleApplyFilters}>
//           Apply Filters
//         </button>
//       </div>
//     </>
//   );
// }
