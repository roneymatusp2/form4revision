import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { Topic, Subtopic } from '../data/topics';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

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
  
  const getTopicColor = (id: string) => {
    switch(id) {
      case 'unit-1': return {
        header: 'bg-blue-500',
        title: 'text-blue-800',
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        text: 'text-blue-800',
        dot: 'bg-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700'
      };
      case 'unit-2': return {
        header: 'bg-green-500',
        title: 'text-green-800',
        bg: 'bg-green-50',
        hover: 'hover:bg-green-100',
        text: 'text-green-800',
        dot: 'bg-green-400',
        button: 'bg-green-600 hover:bg-green-700'
      };
      case 'unit-3': return {
        header: 'bg-green-500',
        title: 'text-green-800',
        bg: 'bg-green-50',
        hover: 'hover:bg-green-100',
        text: 'text-green-800',
        dot: 'bg-green-400',
        button: 'bg-green-600 hover:bg-green-700'
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
        header: 'bg-orange-500',
        title: 'text-orange-800',
        bg: 'bg-orange-50',
        hover: 'hover:bg-orange-100',
        text: 'text-orange-800',
        dot: 'bg-orange-400',
        button: 'bg-orange-600 hover:bg-orange-700'
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
      {/* Removed header bar */}
      
      <div className="p-6 relative z-10">
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