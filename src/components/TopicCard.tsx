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
  
  // Get topic-specific background pattern
  const getBackgroundPattern = (id: string) => {
    switch(id) {
      case 'unit-5': return 'bg-[radial-gradient(#FFA50033_1px,transparent_1px)] bg-[size:20px_20px]';
      case 'unit-6': return 'bg-[linear-gradient(45deg,#80008022_25%,transparent_25%,transparent_50%,#80008022_50%,#80008022_75%,transparent_75%,transparent)] bg-[size:20px_20px]';
      case 'unit-9': return 'bg-[repeating-linear-gradient(45deg,#00800022,#00800022_5px,transparent_5px,transparent_25px)]';
      default: return '';
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
        header: 'bg-indigo-500',
        title: 'text-indigo-800',
        bg: 'bg-indigo-50',
        hover: 'hover:bg-indigo-100',
        text: 'text-indigo-800',
        dot: 'bg-indigo-400',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      };
      case 'unit-2': return {
        header: 'bg-emerald-500',
        title: 'text-emerald-800',
        bg: 'bg-emerald-50',
        hover: 'hover:bg-emerald-100',
        text: 'text-emerald-800',
        dot: 'bg-emerald-400',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      };
      case 'unit-3': return {
        header: 'bg-teal-500',
        title: 'text-teal-800',
        bg: 'bg-teal-50',
        hover: 'hover:bg-teal-100',
        text: 'text-teal-800',
        dot: 'bg-teal-400',
        button: 'bg-teal-600 hover:bg-teal-700'
      };
      case 'unit-4': return {
        header: 'bg-blue-500',
        title: 'text-blue-800',
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        text: 'text-blue-800',
        dot: 'bg-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700'
      };
      case 'unit-5': return {
        // Changed from amber to deep orange for Quadratic Patterns
        header: 'bg-orange-600',
        title: 'text-orange-900',
        bg: 'bg-gradient-to-br from-orange-50 to-amber-100',
        hover: 'hover:bg-orange-100',
        text: 'text-orange-800',
        dot: 'bg-orange-500',
        button: 'bg-orange-700 hover:bg-orange-800'
      };
      case 'unit-6': return {
        // Changed from rose to purple for Sequences
        header: 'bg-purple-600',
        title: 'text-purple-900',
        bg: 'bg-gradient-to-br from-purple-50 to-fuchsia-100',
        hover: 'hover:bg-purple-100',
        text: 'text-purple-800',
        dot: 'bg-purple-500',
        button: 'bg-purple-700 hover:bg-purple-800'
      };
      case 'unit-7': return {
        header: 'bg-violet-500',
        title: 'text-violet-800',
        bg: 'bg-violet-50',
        hover: 'hover:bg-violet-100',
        text: 'text-violet-800',
        dot: 'bg-violet-400',
        button: 'bg-violet-600 hover:bg-violet-700'
      };
      case 'unit-8': return {
        header: 'bg-purple-500',
        title: 'text-purple-800',
        bg: 'bg-purple-50',
        hover: 'hover:bg-purple-100',
        text: 'text-purple-800',
        dot: 'bg-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700'
      };
      case 'unit-9': return {
        // Changed from cyan to teal-green for Further Patterns
        header: 'bg-green-600', 
        title: 'text-green-900',
        bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
        hover: 'hover:bg-green-100',
        text: 'text-green-800',
        dot: 'bg-green-500',
        button: 'bg-green-700 hover:bg-green-800'
      };
      default: return {
        header: 'bg-gray-500',
        title: 'text-gray-800',
        bg: 'bg-gray-50',
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
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative h-auto border-t-4 ${colors.header}`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Decorative icon */}
      {topicIcon}
      
      {/* Topic card content */}
      <div className={`p-6 relative z-10 ${colors.bg} ${backgroundPattern}`}>
        <h2 className={`text-2xl font-bold mb-4 ${colors.title}`}>
          {topic.name}
        </h2>
        
        <p className="text-gray-700 mb-4">Explore all subtopics and resources.</p>
        
        <Link
          to={`/topic/${topic.$id}`}
          className={`inline-flex items-center px-6 py-2 rounded-lg text-white font-medium transition-colors ${colors.button}`}
        >
          Explore Topic
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default TopicCard;