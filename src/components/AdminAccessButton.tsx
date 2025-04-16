import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminAccessButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulando um processo de autenticação (removido Firebase)
      console.log("Simulando login...");
      
      // Pequeno delay para simular o processo de login
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirecionando para a dashboard de admin
      navigate('/admin');
      
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleAdminLogin}
        disabled={loading}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 p-0.5 text-sm font-medium text-white hover:shadow-xl hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative flex items-center gap-2 rounded-full bg-black bg-opacity-10 px-5 py-2.5 transition-all duration-200 ease-in-out group-hover:bg-opacity-0">
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Teacher Access</span>
            </>
          )}
        </span>
      </motion.button>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md"
        >
          {error}
        </motion.div>
      )}
    </>
  );
};

export default AdminAccessButton;