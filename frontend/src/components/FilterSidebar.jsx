import { Search, SlidersHorizontal } from 'lucide-react';

function FilterSidebar({ filters, categories, onChange, onReset }) {
  return (
    <aside className="rounded-md border border-stone-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2 font-semibold">
        <SlidersHorizontal size={18} />
        Filters
      </div>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-medium text-stone-700">Search</span>
        <div className="flex items-center rounded-md border border-stone-300 bg-white px-3">
          <Search size={17} className="text-stone-500" />
          <input
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            className="w-full border-0 px-2 py-2 outline-none"
            placeholder="Product name"
          />
        </div>
      </label>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-medium text-stone-700">Category</span>
        <select
          value={filters.category}
          onChange={(event) => onChange({ ...filters, category: event.target.value })}
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 outline-none focus:border-brand-500"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-5 block">
        <span className="mb-1 block text-sm font-medium text-stone-700">Sort</span>
        <select
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value })}
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 outline-none focus:border-brand-500"
        >
          <option value="">Newest first</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
      >
        Reset filters
      </button>
    </aside>
  );
}

export default FilterSidebar;
