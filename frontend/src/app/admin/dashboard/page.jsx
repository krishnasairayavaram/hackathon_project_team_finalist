"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  // Forms states
  const [productForm, setProductForm] = useState({ title: '', description: '', price: '', tax: '', imageUrl: '', category: '', stock: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '', description: '' });
  const [stockForm, setStockForm] = useState({ productId: '', stock: '' });
  
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const role = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    
    if (role !== 'admin' || !storedToken) {
      router.push('/');
    } else {
      setToken(storedToken);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data.products || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, productForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Product created successfully!');
      setProductForm({ title: '', description: '', price: '', tax: '', imageUrl: '', category: '', stock: '' });
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating product');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        name: categoryForm.name,
        logo: categoryForm.icon,
        description: categoryForm.description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Category created successfully!');
      setCategoryForm({ name: '', icon: '', description: '' });
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating category');
    }
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${stockForm.productId}/stock`, {
        stock: parseInt(stockForm.stock)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Stock updated successfully!');
      setStockForm({ productId: '', stock: '' });
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating stock');
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Admin Dashboard</h1>
      {message && <div className="mb-6 p-4 bg-orange-100 text-orange-800 rounded-xl font-bold">{message}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Create Product */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Create Product</h2>
          <form className="space-y-4" onSubmit={handleCreateProduct}>
            <input required type="text" placeholder="Product Title" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
            <textarea required placeholder="Description" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
            <div className="flex gap-4">
              <input required type="number" step="0.01" placeholder="Price" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
              <input type="number" step="0.1" placeholder="Tax %" value={productForm.tax} onChange={e => setProductForm({...productForm, tax: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <input required type="text" placeholder="Image URL" value={productForm.imageUrl} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
            <div className="flex gap-4">
              <select required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <input required type="number" placeholder="Stock Quantity" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Add Product</button>
          </form>
        </div>

        <div className="space-y-8">
          {/* Create Category */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Create Category</h2>
            <form className="space-y-4" onSubmit={handleCreateCategory}>
              <div className="flex gap-4">
                <input required type="text" placeholder="Category Name" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                <input required type="text" placeholder="Icon (e.g. 🍕)" value={categoryForm.icon} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})} className="w-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <textarea placeholder="Description" value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
              <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">Add Category</button>
            </form>
          </div>

          {/* Update Stock */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Update Stock</h2>
            <form className="space-y-4" onSubmit={handleUpdateStock}>
              <select required value={stockForm.productId} onChange={e => setStockForm({...stockForm, productId: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Select Product...</option>
                {products.map(p => <option key={p._id} value={p._id}>{p.title} (Stock: {p.stock || 0})</option>)}
              </select>
              <input required type="number" placeholder="New Stock Quantity" value={stockForm.stock} onChange={e => setStockForm({...stockForm, stock: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
              <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Update Stock</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
