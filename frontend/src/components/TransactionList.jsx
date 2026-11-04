import { FiTrash2, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden h-[400px] flex flex-col shadow-lg">
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
        <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
      </div>
      <div className="overflow-y-auto flex-1">
        {transactions.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500">No transactions found.</div>
        ) : (
          <ul className="divide-y divide-slate-700/50">
            {transactions.map((t) => (
              <li key={t._id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {t.type === 'income' ? <FiArrowDownLeft size={20}/> : <FiArrowUpRight size={20}/>}
                  </div>
                  <div>
                    <p className="font-medium text-white">{t.description}</p>
                    <p className="text-xs text-slate-400">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {t.type === 'income' ? '+' : '-'}₦{Number(t.amount).toLocaleString()}
                  </span>
                  <button onClick={() => onDelete(t._id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;