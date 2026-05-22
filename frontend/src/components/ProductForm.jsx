function ProductForm({ form, categories, isSaving, onChange, onSubmit }) {
  const inputClass = 'w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-500';

  return (
    <form onSubmit={onSubmit} className="rounded-md border border-stone-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Product name</span>
          <input
            required
            value={form.name}
            onChange={(event) => onChange({ ...form, name: event.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Category</span>
          <select
            required
            value={form.category_id}
            onChange={(event) => onChange({ ...form, category_id: event.target.value })}
            className={inputClass}
          >
            <option value="">Choose category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Price</span>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            value={form.price}
            onChange={(event) => onChange({ ...form, price: event.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Stock</span>
          <input
            required
            min="0"
            type="number"
            value={form.stock}
            onChange={(event) => onChange({ ...form, stock: event.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-stone-700">Image URL</span>
          <input
            value={form.image_url}
            onChange={(event) => onChange({ ...form, image_url: event.target.value })}
            className={inputClass}
            placeholder="https://example.com/product.jpg"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-stone-700">Description</span>
          <textarea
            required
            rows="5"
            value={form.description}
            onChange={(event) => onChange({ ...form, description: event.target.value })}
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-5 rounded-md bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:cursor-wait disabled:bg-stone-400"
      >
        {isSaving ? 'Saving...' : 'Save product'}
      </button>
    </form>
  );
}

export default ProductForm;
