import { useState } from 'react';
import { FiSettings, FiUser, FiLock, FiSave } from 'react-icons/fi';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userName', data.user.name);
        setStatus({ type: 'success', message: 'Profile updated successfully!' });
        setFormData({ ...formData, password: '' }); // Clear password field
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <FiSettings className="mr-3 text-emerald-400" /> Account Settings
        </h1>
        <p className="text-slate-400 mt-2">Manage your personal information and security.</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg">
          
          {status.message && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' : 'bg-red-400/10 text-red-400 border border-red-400/20'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FiUser className="mr-2 text-blue-400" /> Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-white" 
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-white" 
                    placeholder="new@email.com (leave blank to keep current)"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-700" />

            {/* Security Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FiLock className="mr-2 text-purple-400" /> Security
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-white" 
                  placeholder="Leave blank to keep current password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              <FiSave className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;