import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import ProductForm from '../components/ProductForm.jsx';
import { createProduct, getCategories, getProduct, updateProduct } from '../api/productApi';

const emptyForm = {
  name: '',
  description: '',
  category_id: '',
  price: '',
  stock: '',
  image_url: ''
};

function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);

        if (isEditing) {
          const product = await getProduct(id);
          setForm({
            name: product.name,
            description: product.description,
            category_id: String(product.category_id),
            price: product.price,
            stock: product.stock,
            image_url: product.image_url || ''
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load form data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, isEditing]);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      category_id: Number(form.category_id),
      price: Number(form.price),
      stock: Number(form.stock)
    };

    try {
      setIsSaving(true);
      setError('');
      if (isEditing) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save product');
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) return <Loading label="Loading form" />;

  return (
    <div>
      <Link to="/admin/products" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
        <ArrowLeft size={17} />
        Back to products
      </Link>

      <div className="mb-5">
        <h1 className="text-3xl font-bold text-stone-950">{isEditing ? 'Edit product' : 'Add product'}</h1>
        <p className="mt-1 text-stone-600">Fill in inventory details for the HomeMart catalog.</p>
      </div>

      <ErrorMessage message={error} />
      <div className="mt-4">
        <ProductForm
          form={form}
          categories={categories}
          isSaving={isSaving}
          onChange={setForm}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ProductFormPage;
