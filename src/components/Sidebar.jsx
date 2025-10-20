import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import RaritiesFilter from './RaritiesFilter';

const Sidebar = ({
  selectedCategory,
  onCategoryChange,
  selectedRarities,
  onRaritiesChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={toggleSidebar}
        className='cursor-pointer text-gray-400'
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      {/* Mobile/Desktop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 z-50
        w-80 h-full
        bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        sm:w-96
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <button
              onClick={toggleSidebar}
              className=" text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-sm transition-colors cursor-pointer p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filter sections */}
          <div className="space-y-6">
            <div>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </div>

            <div>
              <RaritiesFilter
                selectedRarities={selectedRarities}
                onRaritiesChange={onRaritiesChange}
              />
            </div>

            {/* Clear all filters */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  onCategoryChange('');
                  onRaritiesChange([]);
                }}
                className="cursor-pointer w-full px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;