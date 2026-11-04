import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrendingUp, FiTrendingDown, FiDollarSign, FiX } from 'react-icons/fi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTransactions();
    }
  };

  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) existing.value += curr.amount;
      else acc.push({ name: curr.category, value: curr.amount });
      return acc;
    }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Financial Dashboard</h1>
          <p className="text-slate-400 mt-1">Here is your financial summary in Naira.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <FiPlus className="mr-2" /> Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl font-bold text-white">₦{balance.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><FiDollarSign size={24}/></div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Income</p>
              <h3 className="text-3xl font-bold text-emerald-400">₦{income.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><FiTrendingUp size={24}/></div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Expenses</p>
              <h3 className="text-3xl font-bold text-red-400">₦{expense.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg text-red-400"><FiTrendingDown size={24}/></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-[400px] flex flex-col shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Expenses Breakdown</h3>
          {expenseData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-500">No expenses recorded yet.</div>
          ) : (
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </motion.div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <FiX size={24} />
            </button>
            <TransactionForm token={token} onSuccess={() => { fetchTransactions(); setIsModalOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;