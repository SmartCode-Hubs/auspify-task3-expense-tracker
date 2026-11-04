import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const TransactionForm = ({ token, onSuccess }) => {
  const [formData, setFormData] = useState({ type: 'expense', amount: '', category: '', description: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) onSuccess();
      else { const data = await res.json(); setError(data.error || 'Failed to add'); }
    } catch (err) { setError('Server error'); }
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <FiPlus className="mr-2 text-emerald-400"/> Add Transaction
      </h3>
      {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-lg mb-4">
          <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`py-2 rounded-md font-medium transition-colors ${formData.type === 'expense' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}>Expense</button>
          <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`py-2 rounded-md font-medium transition-colors ${formData.type === 'income' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>Income</button>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Amount (₦)</label>
          <input type="number" step="0.01" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 outline-none" placeholder="0.00" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Category</label>
          <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 outline-none" placeholder="e.g. Food, Salary, Transport" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Description</label>
          <input type="text" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 outline-none" placeholder="Brief details..." />
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-colors">
          Save Transaction
        </button>
      </form>
    </div>
  );
};
export default TransactionForm;