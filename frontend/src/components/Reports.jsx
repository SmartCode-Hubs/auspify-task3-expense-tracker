import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiPieChart } from 'react-icons/fi';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, [token]);

  // Process data for the Bar Chart (Group by Date)
  const chartData = transactions.reduce((acc, curr) => {
    const date = new Date(curr.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.date === date);

    if (existing) {
      if (curr.type === 'income') existing.Income += curr.amount;
      else existing.Expenses += curr.amount;
    } else {
      acc.push({
        date,
        Income: curr.type === 'income' ? curr.amount : 0,
        Expenses: curr.type === 'expense' ? curr.amount : 0
      });
    }
    return acc;
  }, []).reverse(); // Show oldest to newest

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <FiPieChart className="mr-3 text-emerald-400" /> Financial Reports
        </h1>
        <p className="text-slate-400 mt-2">Visualize your income and expenses over time.</p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-[500px] flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-6">Cash Flow Analysis (₦)</h3>
        
        {chartData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            Not enough data to generate a report. Add some transactions first!
          </div>
        ) : (
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `₦${value}`} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} 
                  formatter={(value) => `₦${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;