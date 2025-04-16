import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { Topic } from '../data/topics';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

// Component for math-related decorative icons
const MathIcons = {
  linearPatterns: (
    <svg className="absolute right-2 top-2 opacity-10 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" />
    </svg>
  ),
  angles: (
    <svg className="absolute right-2 top-2 opacity-10 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,3.77L11.25,4.34L19.4,12.5L12,20.23V3.77M8,5.38V21L1.86,14.63L8,5.38M14.06,9L15.61,8.44L20.15,19.46L18.6,20L14.06,9M6.37,9.3L2.15,17.39L0.6,16.86L4.82,8.77L6.37,9.3Z" />
    </svg>
  ),
  trigonometry: (
    <svg className="absolute right-2 top-2 opacity-10 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5,18.25L9.5,12L17,19.5L22.5,14L21.08,12.58L17,16.67L9.5,9.16L3.5,15.17V18.25M2,20V4H4V8.5L8,4.5L18,14.5L22,10.5V20H2Z" />
    </svg>
  ),
  algebraic: (
    <svg className="absolute right-2 top-2 opacity-10 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19,4H5A2,2 0 0,0 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4M8.5,15H6.5V10.5H5V9H8.5V15M14,15H12V12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11H14V9H15.5V15H14M18.5,14A1.5,1.5 0 0,1 17,15.5A1.5,1.5 0 0,1 15.5,14A1.5,1.5 0 0,1 17,12.5A1.5,1.5 0 0,1 18.5,14M17,10.5A1.5,1.5 0 0,1 15.5,9A1.5,1.5 0 0,1 17,7.5A1.5,1.5 0 0,1 18.5,9A1.5,1.5 0 0,1 17,10.5Z" />
    </svg>
  ),
  quadratic: (
    <svg className="absolute right-2 top-2 opacity-10 w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4,9C5.31,9 6.42,9.83 6.83,11H17.17C17.58,9.83 18.69,9 20,9A3,3 0 0,1 23,12A3,3 0 0,1 20,15C18.69,15 17.58,14.17 17.17,13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9Z" />
      <path d="M8,5A1,1 0 0,1 9,6A1,1 0 0,1 8,7A1,1 0 0,1 7,6A1,1 0 0,1 8,5M4,12A1,1 0 0,0 3,13A1,1 0 0,0 4,14A1,1 0 0,0 5,13A1,1 0 0,0 4,12Z" />
    </svg>
  ),
  sequences: (
    <svg className="absolute right-2 top-2 opacity-10 w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,13H7V17H3V13M3,9H7V12H3V9M8,13H12V17H8V13M8,9H12V12H8V9M13,13H17V17H13V13M13,9H17V12H13V9M18,13H22V17H18V13M18,9H22V12H18V9M3,4H22V8H3V4Z" />
    </svg>
  ),
  functions: (
    <svg className="absolute right-2 top-2 opacity-10 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9,5H15V9H9V5M7,11H17V15H7V11M5,17H19V21H5V17Z" />
    </svg>
  ),
  rightAngledTrigonometry: (
    <svg className="absolute right-2 top-2 opacity-10 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,15H11V13H5V15M5,11H11V9H5V11M5,7H11V5H5V7M13,5V9H19V5H13M19,11H13V15H19V11M13,17H19V19H13V17M5,17H11V19H5V17Z" />
    </svg>
  ),
  furtherPatterns: (
    <svg className="absolute right-2 top-2 opacity-10 w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
    </svg>
  )
};

const TopicCard: React.FC<TopicCardProps> = ({ topic, index }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Get topic-specific background pattern with enhanced designs
  const getBackgroundPattern = (id: string) => {
    switch(id) {
      case 'unit-1': return 'bg-[linear-gradient(0deg,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]';
      case 'unit-2': return 'bg-[radial-gradient(rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:15px_15px]';
      case 'unit-3': return 'bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.07)_0,rgba(14,165,233,0)_70%)]';
      case 'unit-4': return 'bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_25%,transparent_25%,transparent_50%,rgba(139,92,246,0.05)_50%,rgba(139,92,246,0.05)_75%,transparent_75%,transparent)] bg-[size:16px_16px]';
      case 'unit-5': return 'bg-[radial-gradient(rgba(239,68,68,0.07)_1px,transparent_1px)] bg-[size:20px_20px]';
      case 'unit-6': return 'bg-[linear-gradient(45deg,rgba(217,70,239,0.05)_25%,transparent_25%,transparent_50%,rgba(217,70,239,0.05)_50%,rgba(217,70,239,0.05)_75%,transparent_75%,transparent)] bg-[size:20px_20px]';
      case 'unit-7': return 'bg-[repeating-linear-gradient(90deg,rgba(79,70,229,0.06)_0px,rgba(79,70,229,0.06)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(0deg,rgba(79,70,229,0.06)_0px,rgba(79,70,229,0.06)_1px,transparent_1px,transparent_20px)]';
      case 'unit-8': return 'bg-[radial-gradient(rgba(20,184,166,0.07)_1px,transparent_1px)] bg-[size:14px_14px] bg-[position:7px_7px]';
      case 'unit-9': return 'bg-[repeating-linear-gradient(45deg,rgba(245,158,11,0.05),rgba(245,158,11,0.05)_5px,transparent_5px,transparent_20px)]';
      default: return 'bg-[linear-gradient(rgba(107,114,128,0.05)_1px,transparent_1px)] bg-[size:20px_20px]';
    }
  };
  
  // Get topic-specific decorative icon
  const getTopicIcon = (id: string) => {
    switch(id) {
      case 'unit-1': return MathIcons.linearPatterns;
      case 'unit-2': return MathIcons.angles;
      case 'unit-3': return MathIcons.trigonometry;
      case 'unit-4': return MathIcons.algebraic;
      case 'unit-5': return MathIcons.quadratic;
      case 'unit-6': return MathIcons.sequences;
      case 'unit-7': return MathIcons.functions;
      case 'unit-8': return MathIcons.rightAngledTrigonometry;
      case 'unit-9': return MathIcons.furtherPatterns;
      default: return null;
    }
  };
  
  const getTopicColor = (id: string) => {
    switch(id) {
      case 'unit-1': return {
        // Vibrant blue for Coordinate Geometry and Linear Patterns
        header: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        title: 'text-blue-800',
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
        hover: 'hover:bg-blue-100',
        text: 'text-blue-800',
        dot: 'bg-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700'
      };
      case 'unit-2': return {
        // Rich emerald green for Plane Geometry and Angle Properties
        header: 'bg-gradient-to-r from-emerald-500 to-green-600',
        title: 'text-emerald-800',
        bg: 'bg-gradient-to-br from-emerald-50 to-green-100',
        hover: 'hover:bg-emerald-100',
        text: 'text-emerald-800',
        dot: 'bg-emerald-400',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      };
      case 'unit-3': return {
        // Ocean blue for Trigonometry, Pythagoras and Circle Geometry
        header: 'bg-gradient-to-r from-sky-500 to-cyan-600',
        title: 'text-sky-800',
        bg: 'bg-gradient-to-br from-sky-50 to-cyan-100',
        hover: 'hover:bg-sky-100',
        text: 'text-sky-800',
        dot: 'bg-sky-400',
        button: 'bg-sky-600 hover:bg-sky-700'
      };
      case 'unit-4': return {
        // Deep purple for Algebraic Fractions and Manipulation
        header: 'bg-gradient-to-r from-purple-500 to-violet-600',
        title: 'text-purple-800',
        bg: 'bg-gradient-to-br from-purple-50 to-violet-100',
        hover: 'hover:bg-purple-100',
        text: 'text-purple-800',
        dot: 'bg-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700'
      };
      case 'unit-5': return {
        // Warm red-orange for Quadratic Equations and Functions
        header: 'bg-gradient-to-r from-red-600 to-orange-500',
        title: 'text-red-800',
        bg: 'bg-gradient-to-br from-red-50 to-orange-100',
        hover: 'hover:bg-red-100',
        text: 'text-red-800',
        dot: 'bg-red-400',
        button: 'bg-red-600 hover:bg-red-700'
      };
      case 'unit-6': return {
        // Vibrant pink-fuchsia for Sequences
        header: 'bg-gradient-to-r from-fuchsia-600 to-pink-600',
        title: 'text-fuchsia-800',
        bg: 'bg-gradient-to-br from-fuchsia-50 to-pink-100',
        hover: 'hover:bg-fuchsia-100',
        text: 'text-fuchsia-800',
        dot: 'bg-fuchsia-400',
        button: 'bg-fuchsia-600 hover:bg-fuchsia-700'
      };
      case 'unit-7': return {
        // Deep indigo-violet for Functions and Variation
        header: 'bg-gradient-to-r from-indigo-600 to-violet-600',
        title: 'text-indigo-800',
        bg: 'bg-gradient-to-br from-indigo-50 to-violet-100',
        hover: 'hover:bg-indigo-100',
        text: 'text-indigo-800',
        dot: 'bg-indigo-400',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      };
      case 'unit-8': return {
        // Teal-cyan for Simultaneous Equations
        header: 'bg-gradient-to-r from-teal-500 to-cyan-600',
        title: 'text-teal-800',
        bg: 'bg-gradient-to-br from-teal-50 to-cyan-100',
        hover: 'hover:bg-teal-100',
        text: 'text-teal-800',
        dot: 'bg-teal-400',
        button: 'bg-teal-600 hover:bg-teal-700'
      };
      case 'unit-9': return {
        // Rich amber-yellow for Further Patterns
        header: 'bg-gradient-to-r from-amber-500 to-yellow-500',
        title: 'text-amber-800',
        bg: 'bg-gradient-to-br from-amber-50 to-yellow-100',
        hover: 'hover:bg-amber-100',
        text: 'text-amber-800',
        dot: 'bg-amber-400',
        button: 'bg-amber-600 hover:bg-amber-700'
      };
      default: return {
        header: 'bg-gradient-to-r from-gray-500 to-slate-600',
        title: 'text-gray-800',
        bg: 'bg-gradient-to-br from-gray-50 to-slate-100',
        hover: 'hover:bg-gray-100',
        text: 'text-gray-800',
        dot: 'bg-gray-400',
        button: 'bg-gray-600 hover:bg-gray-700'
      };
    }
  };
  
  const colors = getTopicColor(topic.$id);
  const backgroundPattern = getBackgroundPattern(topic.$id);
  const topicIcon = getTopicIcon(topic.$id);
  
  return (
    <motion.div 
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`relative overflow-hidden shadow-md rounded-lg ${colors.bg} border border-gray-200`}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Colored header bar */}
      <div className={`h-2 ${colors.header} w-full`}></div>
      
      <div className="p-6">
        <h2 className={`text-xl font-semibold ${colors.title} mb-2`}>
          {topic.name}
        </h2>
        <p className="text-gray-600">
          Explore all subtopics and resources.
        </p>
        
        <Link
          to={`/topic/${topic.$id}`}
          className={`mt-4 inline-flex items-center px-4 py-2 ${colors.button} text-white text-sm rounded-lg transition-colors`}
        >
          Explore Topic
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default TopicCard;