import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const Login = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const endpoint = isLogin ? 'login' : 'register';

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.user.name);
          setToken(data.token);
          navigate('/');
        } else {
          setIsLogin(true); 
          setError('Registration successful! Please log in.');
        }
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. The Background Image Wrapper
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      {/* 2. Dark Overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-0"></div>

      {/* 3. Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800/60 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-600/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400">
              <FiShoppingBag size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-300">
            {isLogin ? 'Sign in to access AuspifyStore.' : 'Join us and start shopping today.'}
          </p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
            className={`p-3 rounded-xl mb-6 text-sm text-center font-medium border ${
              error.includes('successful') 
                ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' 
                : 'bg-red-400/10 text-red-400 border-red-400/20'
            }`}>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <div className="relative">
                  <FiUser className="absolute left-4 top-4 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none transition-all placeholder-slate-500" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <FiMail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none transition-all placeholder-slate-500" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 outline-none transition-all placeholder-slate-500" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')} 
            {!loading && <FiArrowRight className="ml-2" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors ml-1"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;