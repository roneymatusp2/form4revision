import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mathCurriculum } from '../data/curriculum';
import type { Variants } from 'framer-motion';

interface TeacherStats {
    totalResources: number;
    activeStudents: number;
    completionRate: number;
    averageScore: number;
}

const AnimatedView: React.FC<{
    isVisible: boolean;
    children: React.ReactNode;
    viewKey: string;
}> = ({ isVisible, children, viewKey }) => {
    if (!isVisible) return null;
    
    return (
        <motion.div
            key={viewKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

const AnimationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

const SafeAnimatePresence: React.FC<{
    children: React.ReactNode;
    mode?: "sync" | "wait" | "popLayout";
    initial?: boolean;
}> = ({ children, mode, initial }) => {
    // Ensure children is always an array
    const childArray = React.Children.toArray(children);
    
    return (
        <div className="relative">
            {/* @ts-ignore */}
            <AnimatePresence mode={mode} initial={initial}>
                {childArray.length > 0 ? children : null}
            </AnimatePresence>
        </div>
    );
};

const PresenceWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <SafeAnimatePresence mode="wait" initial={false}>
        {children}
    </SafeAnimatePresence>
);

export const TeacherAdmin: React.FC = () => {
    const [activeView, setActiveView] = useState<'dashboard' | 'resources' | 'students' | 'analytics'>('dashboard');
    
    const mockStats: TeacherStats = {
        totalResources: 156,
        activeStudents: 234,
        completionRate: 78.5,
        averageScore: 82.3
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const [mounted, setMounted] = useState(true);

    const renderDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
            >
                <h3 className="text-lg font-medium opacity-90">Total Resources</h3>
                <p className="text-3xl font-bold mt-2">{mockStats.totalResources}</p>
                <div className="mt-4 text-sm opacity-75">
                    +12 this week
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg"
            >
                <h3 className="text-lg font-medium opacity-90">Active Students</h3>
                <p className="text-3xl font-bold mt-2">{mockStats.activeStudents}</p>
                <div className="mt-4 text-sm opacity-75">
                    +28 this month
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
            >
                <h3 className="text-lg font-medium opacity-90">Completion Rate</h3>
                <p className="text-3xl font-bold mt-2">{mockStats.completionRate}%</p>
                <div className="mt-4 text-sm opacity-75">
                    +5.2% from last month
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg"
            >
                <h3 className="text-lg font-medium opacity-90">Average Score</h3>
                <p className="text-3xl font-bold mt-2">{mockStats.averageScore}%</p>
                <div className="mt-4 text-sm opacity-75">
                    +3.1% improvement
                </div>
            </motion.div>
        </div>
    );

    const renderTopicProgress = () => (
        <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Topic Progress</h3>
            <div className="space-y-4">
                {mathCurriculum.map((section) => (
                    <div key={section.id} className="space-y-2">
                        <h4 className="font-medium text-gray-700">{section.title}</h4>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.random() * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold text-gray-900"
                >
                    Teacher Dashboard
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex space-x-2"
                >
                    {['dashboard', 'resources', 'students', 'analytics'].map((view) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeView === view
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </motion.div>
            </div>

            <div className="relative overflow-hidden">
                <div style={{ position: 'relative', minHeight: '500px' }}>
                    <SafeAnimatePresence mode="wait">
                        {activeView === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                style={{ position: 'absolute', width: '100%' }}
                            >
                                {renderDashboard()}
                                {renderTopicProgress()}
                                
                                <motion.div
                                    variants={itemVariants}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                >
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            Recent Activity
                                        </h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                        {i % 2 === 0 ? '📝' : '✅'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Student completed {i % 2 === 0 ? 'assignment' : 'quiz'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {i} hour{i !== 1 ? 's' : ''} ago
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            Upcoming Tasks
                                        </h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                        {i % 2 === 0 ? '📅' : '⏰'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {i % 2 === 0 ? 'Review assignments' : 'Prepare lesson'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Due in {i} day{i !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                        {activeView === 'resources' && (
                            <motion.div
                                key="resources"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                style={{ position: 'absolute', width: '100%' }}
                            >
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-2xl font-bold mb-4">Resources Management</h2>
                                    {/* Add your resources content here */}
                                </div>
                            </motion.div>
                        )}
                        {activeView === 'students' && (
                            <motion.div
                                key="students"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                style={{ position: 'absolute', width: '100%' }}
                            >
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-2xl font-bold mb-4">Student Management</h2>
                                    {/* Add your students content here */}
                                </div>
                            </motion.div>
                        )}
                        {activeView === 'analytics' && (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                style={{ position: 'absolute', width: '100%' }}
                            >
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
                                    {/* Add your analytics content here */}
                                </div>
                            </motion.div>
                        )}
                    </SafeAnimatePresence>
                </div>
            </div>

            {/* Quick Actions FAB */}
            <motion.button
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center hover:from-indigo-700 hover:to-indigo-800 transition-all"
                whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 25px rgba(79, 70, 229, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }}
            >
                <span className="text-2xl">+</span>
            </motion.button>
        </div>
    );
};

export default TeacherAdmin; 