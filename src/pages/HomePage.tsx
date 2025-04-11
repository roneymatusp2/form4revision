import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import TopicCard from '../components/TopicCard';
import topics from '../data/topics';
import { Topic, Subtopic } from '../data/topics';
import { unitColors } from '../data/externalResources-new';

// Animated Mathematical Features
// Enhanced Mathematical Hero with interactive animations
const MathematicalHero: React.FC = () => {
  // Parallax effect state
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mathematical symbols array
  // Enhanced mathematical symbols with categories
  const mathSymbols = [
    // Constants
    { symbol: 'π', color: '#3B82F6', size: 2.2 },
    { symbol: 'e', color: '#8B5CF6', size: 2.0 },
    { symbol: 'i', color: '#EC4899', size: 1.8 },
    { symbol: '∞', color: '#F59E0B', size: 2.5 },
    // Operators
    { symbol: '∫', color: '#10B981', size: 2.4 },
    { symbol: '∑', color: '#6366F1', size: 2.3 },
    { symbol: '√', color: '#F97316', size: 2.2 },
    { symbol: 'Δ', color: '#64748B', size: 2.0 },
    { symbol: '±', color: '#9333EA', size: 1.9 },
    // Relations
    { symbol: '≠', color: '#EF4444', size: 1.8 },
    { symbol: '≈', color: '#14B8A6', size: 1.9 },
    { symbol: '⊂', color: '#8B5CF6', size: 2.1 },
    { symbol: '∪', color: '#06B6D4', size: 2.0 },
    { symbol: '∩', color: '#0EA5E9', size: 2.0 },
    // Quantifiers
    { symbol: '∀', color: '#22C55E', size: 2.2 },
    { symbol: '∃', color: '#A855F7', size: 2.1 },
    // Greek letters
    { symbol: '∇', color: '#EC4899', size: 2.0 },
    { symbol: 'φ', color: '#3B82F6', size: 1.9 },
    { symbol: 'θ', color: '#EAB308', size: 2.0 },
    { symbol: 'λ', color: '#14B8A6', size: 1.8 },
    { symbol: 'μ', color: '#F97316', size: 1.7 }
  ];
  
  // Generate enhanced floating elements with improved positioning and behavior
  const floatingElements = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => {
      const symbolObj = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      // Create a more structured distribution across the screen
      const section = Math.floor(i / 7); // 0 to 4 for 5 screen segments
      
      return {
        symbol: symbolObj.symbol,
        x: (section * 20) + (Math.random() * 18) + 1, // Distribute across sections
        y: Math.random() * 100,
        size: symbolObj.size * (0.7 + Math.random() * 0.5), // Use predefined size with variation
        speed: Math.random() * 0.15 + 0.05,
        delay: Math.random() * 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        color: symbolObj.color,
        pulseDelay: Math.random() * 5,
        pulseSpeed: 2 + Math.random() * 3
      };
    });
  }, [mathSymbols]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
      {/* Grid Background - Graph Paper Effect */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      />
      
      {/* Enhanced Golden Ratio Spiral with animation */}
      <motion.div 
        className="absolute opacity-15 right-20 bottom-20 w-[350px] h-[350px]"
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ translateY: scrollY * -0.2 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer circle */}
          <motion.path 
            d="M50,0 A50,50 0 0,1 100,50 A50,50 0 0,1 50,100 A50,50 0 0,1 0,50 A50,50 0 0,1 50,0 Z" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
          
          {/* First spiral segment */}
          <motion.path 
            d="M50,50 A50,50 0 0,0 100,50 A50,50 0 0,0 50,0" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          
          {/* Additional spiral segments with sequential appearance */}
          <motion.path 
            d="M50,50 A30.9,30.9 0 0,0 80.9,19.1" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
          <motion.path 
            d="M50,50 A19.1,19.1 0 0,1 69.1,69.1" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, delay: 3.3 }}
          />
          <motion.path 
            d="M50,50 A11.8,11.8 0 0,0 38.2,61.8" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 4 }}
          />
          <motion.path 
            d="M50,50 A7.3,7.3 0 0,1 42.7,42.7" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 4.6 }}
          />
          <motion.path 
            d="M50,50 A4.5,4.5 0 0,0 54.5,45.5" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 5.1 }}
          />
          <motion.path 
            d="M50,50 A2.8,2.8 0 0,1 52.8,52.8" 
            stroke="white" 
            strokeWidth="0.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 5.5 }}
          />
          
          {/* Golden ratio symbol */}
          <motion.text 
            x="40" 
            y="30" 
            fontSize="6" 
            fill="white" 
            opacity="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 6 }}
          >
            φ = 1.618...
          </motion.text>
        </svg>
      </motion.div>
      
      {/* Enhanced Floating Mathematical Symbols with Parallax and Glow Effects */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute font-serif select-none"
          initial={{ 
            x: `${el.x}%`, 
            y: `${el.y}%`, 
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.05, 1],
            rotate: [el.rotation, el.rotation + 360 * el.rotationSpeed]
          }}
          transition={{ 
            opacity: { 
              duration: 5 + el.delay * 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            },
            scale: {
              duration: el.pulseSpeed,
              delay: el.pulseDelay,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 20 + el.delay * 10,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            fontSize: `${el.size}rem`,
            color: el.color,
            transform: `translate(${el.x}%, ${el.y}%) translateY(${scrollY * -el.speed}px)`,
            textShadow: `0 0 5px ${el.color}33, 0 0 15px ${el.color}22`
          }}
          whileHover={{
            scale: 1.2,
            opacity: 0.8,
            transition: { duration: 0.2 }
          }}
        >
          {el.symbol}
        </motion.div>
      ))}
      
      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Form 3 Mathematics
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl text-indigo-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your journey through Cambridge IGCSE™ International Mathematics
        </motion.p>
        
        {/* Interactive Math Formula Animation */}
        <div className="mb-10">
          <QuadraticFormula />
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#main-content" 
            className="px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Learning
          </a>
          <Link
            to="/resources" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-all"
          >
            Explore Resources
          </Link>
        </motion.div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-[50px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.11,101.47,118.75,86.39,162.77,66.28Z" 
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </div>
  );
};

// Enhanced Quadratic Formula Animation Component with interactive highlights
const QuadraticFormula: React.FC = () => {
  const [raizWidth, setRaizWidth] = useState(0);
  const [step, setStep] = useState(0);
  const [highlight, setHighlight] = useState('');
  
  useEffect(() => {
    // Initial animation for the square root line
    const timer1 = setTimeout(() => setRaizWidth(100), 1500);
    
    // Highlight different parts of the formula sequentially
    const timer2 = setTimeout(() => setHighlight('b'), 3000);
    const timer3 = setTimeout(() => setHighlight('a'), 4000);
    const timer4 = setTimeout(() => setHighlight('c'), 5000);
    const timer5 = setTimeout(() => setHighlight('discriminant'), 6000);
    const timer6 = setTimeout(() => setHighlight(''), 7000);
    
    // Reset animation
    const timer7 = setTimeout(() => {
      setStep(1);
      setRaizWidth(0);
      setTimeout(() => setRaizWidth(100), 500);
    }, 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
    };
  }, []);
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-xl md:text-3xl text-white font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      {/* Equation name with glow effect */}
      <motion.div
        className="text-base md:text-lg mb-2 text-indigo-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          textShadow: '0 0 10px rgba(165, 180, 252, 0.5)'
        }}
      >
        The Quadratic Formula
      </motion.div>
      
      <div className="flex items-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          x = 
        </motion.span>
        <motion.span 
          className="mx-2 flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <span className="flex flex-col items-center">
            <span className="relative">
              {/* Numerator */}
              <motion.div
                className="flex items-center whitespace-nowrap relative z-10 px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.3 }}
                  style={{
                    color: highlight === 'b' ? '#93C5FD' : 'white',
                    textShadow: highlight === 'b' ? '0 0 10px rgba(147, 197, 253, 0.8)' : 'none'
                  }}
                >
                  -b
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.3 }}
                >
                  {' ± '}
                </motion.span>
                
                {/* Square root symbol with enhanced animation */}
                <div className="relative inline-flex">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.6 }}
                    className="text-indigo-200 mr-0.5"
                  >
                    √
                  </motion.span>
                  
                  {/* Content inside the root with a growing line on top */}
                  <span className="relative inline-block">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.9 }}
                    >
                      <span 
                        style={{
                          color: highlight === 'b' ? '#93C5FD' : 'white',
                          textShadow: highlight === 'b' ? '0 0 10px rgba(147, 197, 253, 0.8)' : 'none'
                        }}
                      >
                        b²
                      </span>
                      {' - '}
                      <span 
                        style={{
                          color: (highlight === '4' || highlight === 'discriminant') ? '#93C5FD' : 'white',
                          textShadow: (highlight === '4' || highlight === 'discriminant') ? '0 0 10px rgba(147, 197, 253, 0.8)' : 'none'
                        }}
                      >
                        4
                      </span>
                      <span 
                        style={{
                          color: highlight === 'a' ? '#93C5FD' : 'white',
                          textShadow: highlight === 'a' ? '0 0 10px rgba(147, 197, 253, 0.8)' : 'none'
                        }}
                      >
                        a
                      </span>
                      <span 
                        style={{
                          color: highlight === 'c' ? '#93C5FD' : 'white',
                          textShadow: highlight === 'c' ? '0 0 10px rgba(147, 197, 253, 0.8)' : 'none'
                        }}
                      >
                        c
                      </span>
                    </motion.span>
                    
                    {/* Root line that extends with enhanced visual */}
                    <motion.span 
                      className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200" 
                      initial={{ width: "0%" }}
                      animate={{ width: `${raizWidth}%` }}
                      transition={{ duration: 1, delay: 2.0 }}
                      style={{ marginTop: "-1px" }}
                    />
                  </span>
                </div>
              </motion.div>
          
              
              {/* Division line with gradient */}
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-indigo-300 via-purple-200 to-indigo-300 my-1"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 2.2 }}
              />
              
              {/* Denominator */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
                style={{
                  color: highlight === 'a' ? '#93C5FD' : 'white',
                  textShadow: highlight === 'a' ? '0 0 10px rgba(147, 197, 253, 0.8)' : 'none'
                }}
              >
                2a
              </motion.div>
            </span>
          </span>
        </motion.span>
      </div>
      
      {/* Small explanation text that appears after the formula is complete */}
      <motion.div
        className="text-xs md:text-sm mt-2 text-indigo-200 max-w-xs text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: step === 0 ? 0 : 1, y: step === 0 ? 10 : 0 }}
        transition={{ duration: 0.5 }}
      >
        For any quadratic equation ax² + bx + c = 0
      </motion.div>
    </motion.div>
  );
};

// Interactive Topic Card Component with Mathematical Visuals
interface TopicCardProps {
  topic: Topic;
  index: number;
}

const TopicCardComponent: React.FC<TopicCardProps> = ({ topic, index }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  // Enhanced topic-specific animations
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (inView) {
      setShowAnimation(true);
    }
  }, [inView]);
  
  // Topic-specific components with interactive animations
  const MathIcons: Record<string, React.ReactElement | null> = {
    'unit-1': null,
    'unit-2': null,
    'unit-3': null,
    'unit-4': null,
    'unit-5': null,
    'unit-8': null
  };
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className={`h-4 ${
        topic.$id === 'unit-1' ? 'bg-blue-500' : 
        topic.$id === 'unit-2' ? 'bg-green-500' :
        topic.$id === 'unit-3' ? 'bg-green-500' :
        topic.$id === 'unit-4' ? 'bg-blue-500' :
        topic.$id === 'unit-5' ? 'bg-orange-500' :
        topic.$id === 'unit-8' ? 'bg-purple-500' :
        'bg-gray-500'
      }`}></div>
      
      <div className="p-6 relative z-10">
        <h2 className={`text-2xl font-bold mb-4 ${
          topic.$id === 'unit-1' ? 'text-blue-800' : 
          topic.$id === 'unit-2' ? 'text-green-800' :
          topic.$id === 'unit-3' ? 'text-green-800' :
          topic.$id === 'unit-4' ? 'text-blue-800' :
          topic.$id === 'unit-5' ? 'text-orange-800' :
          topic.$id === 'unit-8' ? 'text-purple-800' :
          'text-gray-800'
        }`}>
          {topic.name}
        </h2>
        
        <p className="text-gray-700 mb-4">Explore all subtopics and resources.</p>
        
        <Link
          to={`/topic/${topic.$id}`}
          className={`inline-flex items-center px-6 py-2 rounded-lg text-white font-medium transition-colors ${
            topic.$id === 'unit-1' ? 'bg-blue-600 hover:bg-blue-700' : 
            topic.$id === 'unit-2' ? 'bg-green-600 hover:bg-green-700' :
            topic.$id === 'unit-3' ? 'bg-green-600 hover:bg-green-700' :
            topic.$id === 'unit-4' ? 'bg-blue-600 hover:bg-blue-700' :
            topic.$id === 'unit-5' ? 'bg-orange-600 hover:bg-orange-700' :
            topic.$id === 'unit-8' ? 'bg-purple-600 hover:bg-purple-700' :
            'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          Explore Topic
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {/* Topic-specific mathematical visual */}
      <div className={`absolute inset-0 pointer-events-none ${
        topic.$id === 'unit-1' ? 'text-blue-800' : 
        topic.$id === 'unit-2' ? 'text-green-800' :
        topic.$id === 'unit-3' ? 'text-green-800' :
        topic.$id === 'unit-4' ? 'text-blue-800' :
        topic.$id === 'unit-5' ? 'text-orange-800' :
        topic.$id === 'unit-8' ? 'text-purple-800' :
        'text-gray-800'
      }`}>
        {MathIcons[topic.$id] || null}
      </div>
    </motion.div>
  );
};

// Enhanced Daily Challenge with interactive steps and visual solution
const DailyChallenge: React.FC = () => {
  const [showSolution, setShowSolution] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;
  
  // Navigate through solution steps
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 shadow-md border border-indigo-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-indigo-900">Today's Math Challenge</h3>
        
        <div className="flex items-center space-x-1">
          <motion.div 
            className="w-2 h-2 rounded-full bg-indigo-600 opacity-60"
            animate={{ opacity: Math.random() * 0.4 + 0.6 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-indigo-600 opacity-60"
            animate={{ opacity: Math.random() * 0.4 + 0.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-indigo-600 opacity-60"
            animate={{ opacity: Math.random() * 0.4 + 0.6 }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
        <p className="text-gray-700 mb-2 font-medium">
          If the sum of the roots of the quadratic equation x² + bx + 15 = 0 is equal to -6, find the value of b.
        </p>
        
        <div className="text-gray-500 text-sm italic">
          Cambridge IGCSE Mathematics - Quadratic Equations
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          {showSolution ? "Hide Solution" : "View Solution"}
        </button>
      </div>
      
      {showSolution && (
        <motion.div 
          className="mt-4 pt-4 border-t border-indigo-100"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3 flex justify-between items-center">
            <p className="text-indigo-800 font-medium text-lg">Solution:</p>
            <div className="flex space-x-2">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`p-1 rounded ${currentStep === 0 ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-600">{currentStep + 1}/{totalSteps + 1}</span>
              <button 
                onClick={nextStep}
                disabled={currentStep === totalSteps}
                className={`p-1 rounded ${currentStep === totalSteps ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">
                  For any quadratic equation in the form ax² + bx + c = 0, we can use Vieta's formulas to relate the coefficients to the roots.
                </p>
                <div className="mt-2 font-medium text-indigo-800">
                  If the roots are α and β:
                </div>
                <div className="mt-1 flex flex-col items-center text-center py-2">
                  <div>α + β = -b/a</div>
                  <div>α × β = c/a</div>
                </div>
              </motion.div>
            )}
            
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">
                  Looking at our equation: x² + bx + 15 = 0
                </p>
                <div className="mt-2">
                  <div className="font-medium">We can identify:</div>
                  <ul className="list-disc list-inside mt-1 ml-2 space-y-1">
                    <li>a = 1 (coefficient of x²)</li>
                    <li>b = b (coefficient of x)</li>
                    <li>c = 15 (constant term)</li>
                  </ul>
                </div>
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">
                  We're told that the sum of the roots is -6.
                </p>
                <div className="mt-2 font-medium">
                  Using the formula from Vieta's relations:
                </div>
                <div className="mt-1 flex flex-col items-center text-center py-2">
                  <div>α + β = -b/a = -6</div>
                  <div className="mt-1">Since a = 1:</div>
                  <div>-b = -6</div>
                  <div>b = 6</div>
                </div>
              </motion.div>
            )}
            
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 font-medium">
                  Therefore, b = 6
                </p>
                <div className="mt-2">
                  <div>Let's verify by finding the roots of x² + 6x + 15 = 0 using the quadratic formula:</div>
                  <div className="mt-2 flex justify-center">
                    <div className="text-center">
                      <div>x = (-b ± √(b² - 4ac))/2a</div>
                      <div>x = (-6 ± √(36 - 4×1×15))/2</div>
                      <div>x = (-6 ± √(36 - 60))/2</div>
                      <div>x = (-6 ± √(-24))/2</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    Since the discriminant b² - 4ac = -24 is negative, this quadratic has complex roots. 
                    Their sum is still -6/1 = -6, confirming our answer.
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};


// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Main HomePage Component
const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mathSymbols, setMathSymbols] = useState(['π', 'e', '∞', '∫', '∑', '√', 'Δ', '±', '≠', '≈', '⊂', '∪', '∩', '∀', '∃', '∇', 'φ', 'θ', 'λ', 'μ']);

  const filteredTopics = useMemo(() => {
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, mathSymbols]);

  return (
    <>
      {/* Hero Section with Mathematical Visuals */}
      <MathematicalHero />
      
      {/* Main Content */}
      <div id="main-content" className="container mx-auto px-4 py-12">
        {/* Explore Topics Section with Visual Math Elements */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Mathematics Topics</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our curriculum covers all essential areas of the Cambridge IGCSE™ International Mathematics Extended syllabus, 
              with comprehensive resources to help you excel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <TopicCard key={topic.$id} topic={topic} index={index} />
            ))}
          </div>
        </motion.div>
        
        {/* Challenge of the Day Section */}
        <div className="mb-16">
          <DailyChallenge />
        </div>
        
        {/* Features Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Learning Resources</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform offers a variety of resources designed to support your mathematical learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              title="Video Tutorials"
              description="Watch detailed explanations and worked examples for every topic in the syllabus."
              delay={0.1}
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Practice Worksheets"
              description="Download worksheets with solutions to strengthen your understanding and test your knowledge."
              delay={0.2}
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Interactive Examples"
              description="Engage with interactive exercises and visualizations to deepen your mathematical intuition."
              delay={0.3}
            />
          </div>
        </motion.div>
        
        {/* About Section with Mathematical Elements */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Decorative Mathematical Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <svg className="absolute right-0 bottom-0 w-64 h-64 text-indigo-900" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="20" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="40" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            
            <div className="absolute left-10 top-10 font-mono text-indigo-800 transform rotate-12">
              E = mc²
            </div>
            
            <div className="absolute right-20 top-20 font-mono text-indigo-800 transform -rotate-6">
              ∫ f(x) dx
            </div>
            
            <div className="absolute left-1/4 bottom-12 font-mono text-indigo-800 transform rotate-3">
              eiπ + 1 = 0
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Website</h2>
            <p className="text-gray-700 mb-4">
              This website is designed to help Form 3 students prepare for their End of Year examinations in Mathematics.
              It follows the Cambridge IGCSE™ International Mathematics (0607) Extended curriculum and provides a variety
              of resources including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>PDF worksheets and solutions from Corbett Maths and other sources</li>
              <li>Video tutorials for each topic</li>
              <li>External resources curated by teachers</li>
            </ul>
            <p className="text-gray-700">
              The website is structured by topic, making it easy to find the resources you need for specific areas of study.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;