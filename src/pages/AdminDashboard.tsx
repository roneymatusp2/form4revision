import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to home if not logged in
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Teacher Administration</h1>
              <p className="mt-1 text-purple-100">Manage educational content and resources</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user?.displayName}</p>
                <p className="text-xs text-purple-200">{user?.email}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="h-10 w-10 rounded-full" 
                  />
                ) : (
                  <span className="text-white font-medium">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">Content Management</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z" />
                      <path d="M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </span>
                  <a href="#" className="text-purple-700 hover:underline">Manage Topics & Subtopics</a>
                </li>
                <li className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <a href="#" className="text-purple-700 hover:underline">Upload Video Resources</a>
                </li>
                <li className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <a href="#" className="text-purple-700 hover:underline">Manage PDF Resources</a>
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-semibold text-indigo-800 mb-4">Analytics & Reports</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </span>
                  <a href="#" className="text-indigo-700 hover:underline">View Resource Usage Statistics</a>
                </li>
                <li className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <a href="#" className="text-indigo-700 hover:underline">Student Progress Reports</a>
                </li>
                <li className="flex items-center">
                  <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <a href="#" className="text-indigo-700 hover:underline">Resource Gap Analysis</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800">Resource Structure Updated</p>
                    <span className="text-xs text-gray-500">Today, 11:43 AM</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Topic structure reorganized to match F3 End of Year Exam units
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800">Firebase Integration Complete</p>
                    <span className="text-xs text-gray-500">Yesterday, 3:20 PM</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Authentication services configured for teacher access
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm5 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm-3 1a1 1 0 100-2H4a1 1 0 100 2h1zm0-4a1 1 0 100-2H4a1 1 0 100 2h1zm8 5a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2zm-5 6a1 1 0 001 1h2a1 1 0 100-2H9a1 1 0 00-1 1z" clipRule="evenodd" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;