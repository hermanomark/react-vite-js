import FadeUp from './FadeUp';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Pokemon', label: 'Pokemon' },
    { value: 'Trainer', label: 'Trainer' },
    { value: 'Energy', label: 'Energy' }
  ];

  return (
    <FadeUp>
      <div className="mb-6">
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </FadeUp>
  );
};

export default CategoryFilter;