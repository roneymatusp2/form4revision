// Pythagoras Theorem Component (Static Version)
export const PythagorasTheorem: React.FC<{
  className?: string;
  greenTheme?: boolean;
  designStyle?: 'glass' | 'dark' | 'gradient' | 'minimal';
}> = ({
  className = "",
  greenTheme = true,
  designStyle = 'glass'
}) => {
  // Colors based on theme
  const colors = {
    sideA: greenTheme ? "#10B981" : "#818CF8", // emerald-500 or indigo-400
    sideB: greenTheme ? "#059669" : "#6366F1", // emerald-600 or indigo-500
    sideC: greenTheme ? "#047857" : "#4F46E5", // emerald-700 or indigo-600
    squareA: greenTheme ? "rgba(16, 185, 129, 0.2)" : "rgba(129, 140, 248, 0.2)",
    squareB: greenTheme ? "rgba(5, 150, 105, 0.2)" : "rgba(99, 102, 241, 0.2)",
    squareC: greenTheme ? "rgba(4, 120, 87, 0.2)" : "rgba(79, 70, 229, 0.2)",
    text: "white"
  };
  
  // Container style based on design style selection
  const containerStyles = {
    glass: `backdrop-filter backdrop-blur-md bg-opacity-20 border border-white border-opacity-30 shadow-lg ${
      greenTheme ? 'bg-emerald-900/30 text-emerald-50' : 'bg-indigo-900/30 text-indigo-50'
    }`,
    dark: `${
      greenTheme ? 'bg-emerald-900 border-emerald-700' : 'bg-indigo-900 border-indigo-700'
    } border shadow-lg`,
    gradient: `${
      greenTheme 
        ? 'bg-gradient-to-br from-emerald-800 to-green-900' 
        : 'bg-gradient-to-br from-indigo-800 to-purple-900'
    } shadow-lg`,
    minimal: `bg-transparent border-0 shadow-none ${
      greenTheme ? 'text-emerald-900' : 'text-indigo-900'
    }`
  };
  
  return (
    <div className={`font-serif ${className} ${containerStyles[designStyle]} rounded-xl p-5 relative overflow-hidden`}>
      {/* Top title */}
      <div className="text-center text-sm font-medium tracking-wide mb-4 opacity-90">
        Pythagoras Theorem
      </div>
      
      {/* Main visualization area */}
      <div className="relative h-[200px] flex items-center justify-center">
        {/* Triangle and squares visualization */}
        <svg viewBox="0 0 240 200" className="w-full max-w-[320px] h-auto">
          {/* Squares on each side */}
          {/* Square on side a */}
          <rect 
            x="50" 
            y="100" 
            width="80" 
            height="80" 
            fill={colors.squareA}
            stroke={colors.sideA}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <text 
            x="90" 
            y="140" 
            textAnchor="middle" 
            fill={colors.text} 
            fontSize="16"
            fontWeight="bold"
          >
            a²
          </text>
          
          {/* Square on side b */}
          <rect 
            x="50" 
            y="20" 
            width="80" 
            height="80" 
            fill={colors.squareB}
            stroke={colors.sideB}
            strokeWidth="1.5"
            transform="translate(130, 50) rotate(90)"
            opacity="0.7"
          />
          <text 
            x="150" 
            y="70" 
            textAnchor="middle" 
            fill={colors.text} 
            fontSize="16"
            fontWeight="bold"
          >
            b²
          </text>
          
          {/* Square on hypotenuse (side c) */}
          <path 
            d="M50,100 L130,100 L130,20 L50,20 Z" 
            fill={colors.squareC}
            stroke={colors.sideC}
            strokeWidth="1.5"
            transform="translate(40, 40) rotate(-45, 90, 60)"
            opacity="0.7"
          />
          <text 
            x="90" 
            y="60" 
            textAnchor="middle" 
            fill={colors.text} 
            fontSize="16"
            fontWeight="bold"
          >
            c²
          </text>
          
          {/* Right triangle */}
          <path 
            d="M50,100 L130,100 L130,20 Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            opacity="0.9"
          />
          
          {/* Right angle mark */}
          <path 
            d="M60,100 L60,90 L50,90" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5"
            opacity="0.8"
          />
          
          {/* Side labels */}
          <text 
            x="90" 
            y="110" 
            textAnchor="middle" 
            fill="white" 
            fontSize="18"
            fontWeight="bold"
          >
            a
          </text>
          
          <text 
            x="140" 
            y="60" 
            textAnchor="middle" 
            fill="white" 
            fontSize="18"
            fontWeight="bold"
          >
            b
          </text>
          
          <text 
            x="85" 
            y="65" 
            textAnchor="middle" 
            fill="white" 
            fontSize="18"
            fontWeight="bold"
          >
            c
          </text>
        </svg>
      </div>
      
      {/* Formula at the bottom */}
      <div className="text-center text-2xl mt-4 font-bold">
        <span>a² + b² = c²</span>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Mathematical Formula Display Component
export const MathFormula: React.FC<{ formula: React.ReactNode; className?: string }> = ({ formula, className = "" }) => {
  return (
    <div className={`math-formula inline-flex items-center justify-center ${className}`}>
      <span className="font-serif">{formula}</span>
    </div>
  );
};

// Mathematical Fraction Component
export const MathFraction: React.FC<{ numerator: React.ReactNode; denominator: React.ReactNode; className?: string }> = ({ numerator, denominator, className = "" }) => {
  return (
    <div className={`inline-flex flex-col text-center ${className}`}>
      <div className="px-1 border-b border-current">{numerator}</div>
      <div className="px-1">{denominator}</div>
    </div>
  );
};

// Animated Mathematical Symbol
export const AnimatedMathSymbol: React.FC<{ 
  symbol: string; 
  size?: string; 
  color?: string; 
  className?: string 
}> = ({ symbol, size = 'text-2xl', color = 'text-indigo-600', className = "" }) => {
  return (
    <motion.div 
      className={`font-serif ${size} ${color} ${className}`}
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 0.95, 1]
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {symbol}
    </motion.div>
  );
};

// Mathematical Grid Background
export const MathGridBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`math-grid relative ${className}`}>
      {children}
    </div>
  );
};

// Enhanced 3D Golden Ratio Spiral Component with Interactive Features
export const GoldenRatioSpiral: React.FC<{
  size?: string;
  className?: string;
  animated?: boolean;
  interactive?: boolean;
  colorTheme?: 'default' | 'rainbow' | 'monochrome' | 'neon';
  perspective?: '2d' | '3d';
  showSequence?: boolean;
  rotationAxis?: 'x' | 'y' | 'z' | 'all';
  rotationSpeed?: number;
  highlightRectangles?: boolean;
}> = ({ 
  size = "w-24 h-24", 
  className = "", 
  animated = true,
  interactive = false,
  colorTheme = 'default',
  perspective = '2d',
  showSequence = false,
  rotationAxis = 'z',
  rotationSpeed = 1,
  highlightRectangles = false
}) => {
  // Interactive state
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isPlaying, setIsPlaying] = useState(animated);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation controls for advanced effects
  const controls = useAnimation();
  
  // Calculate Fibonacci numbers for the sequence display
  const fibonacciNumbers = useMemo(() => {
    const result = [1, 1];
    for (let i = 2; i < 10; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
    return result;
  }, []);
  
  // Golden ratio value
  const phi = (1 + Math.sqrt(5)) / 2;
  
  // Define color schemes
  const colorSchemes = {
    default: {
      spiral: "currentColor",
      sequence: "#4F46E5",
      highlight: "#4F46E5",
      rectangle: "rgba(79, 70, 229, 0.2)",
      rectangleStroke: "#4F46E5"
    },
    rainbow: {
      spiral: "url(#rainbow-gradient)",
      sequence: "#4F46E5",
      highlight: "#EC4899",
      rectangle: "rgba(236, 72, 153, 0.1)",
      rectangleStroke: "#EC4899"
    },
    monochrome: {
      spiral: "#4B5563",
      sequence: "#1F2937",
      highlight: "#111827",
      rectangle: "rgba(31, 41, 55, 0.1)",
      rectangleStroke: "#4B5563"
    },
    neon: {
      spiral: "#4F46E5",
      sequence: "#EC4899",
      highlight: "#10B981",
      rectangle: "rgba(16, 185, 129, 0.2)",
      rectangleStroke: "#10B981"
    }
  };
  
  // Selected color scheme
  const colors = colorSchemes[colorTheme];
  
  // Animation effect for auto-rotation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRotation(prev => {
          const newRotation = { ...prev };
          
          if (rotationAxis === 'x' || rotationAxis === 'all') {
            newRotation.x = (prev.x + (rotationSpeed * 0.2)) % 360;
          }
          
          if (rotationAxis === 'y' || rotationAxis === 'all') {
            newRotation.y = (prev.y + (rotationSpeed * 0.3)) % 360;
          }
          
          if (rotationAxis === 'z' || rotationAxis === 'all') {
            newRotation.z = (prev.z + (rotationSpeed * 0.5)) % 360;
          }
          
          return newRotation;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, rotationAxis, rotationSpeed]);
  
  // Handle interactive dragging
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!interactive || !containerRef.current) return;
    
    // Get movement data
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate rotation based on mouse/touch position relative to center
    setRotation({
      x: (clientY - centerY) * 0.5,
      y: (clientX - centerX) * 0.5,
      z: rotation.z
    });
    
    // Pause auto-rotation when user interacts
    setIsPlaying(false);
  };
  
  // Calculate 3D transform style
  const transformStyle = perspective === '3d'
    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
    : `rotate(${rotation.z}deg)`;
  
  // Define spiral segments with specific attributes for highlighting
  const spiralSegments = [
    { size: 50, type: 'outer', command: "M50,0 A50,50 0 0,1 100,50 A50,50 0 0,1 50,100 A50,50 0 0,1 0,50 A50,50 0 0,1 50,0 Z" },
    { size: 50, type: 'large-arc', command: "M50,50 A50,50 0 0,0 100,50 A50,50 0 0,0 50,0" },
    { size: 30.9, type: 'medium-arc', command: "M50,50 A30.9,30.9 0 0,0 80.9,19.1" },
    { size: 19.1, type: 'medium-arc', command: "M50,50 A19.1,19.1 0 0,1 69.1,69.1" },
    { size: 11.8, type: 'small-arc', command: "M50,50 A11.8,11.8 0 0,0 38.2,61.8" },
    { size: 7.3, type: 'small-arc', command: "M50,50 A7.3,7.3 0 0,1 42.7,42.7" },
    { size: 4.5, type: 'tiny-arc', command: "M50,50 A4.5,4.5 0 0,0 54.5,45.5" },
    { size: 2.8, type: 'tiny-arc', command: "M50,50 A2.8,2.8 0 0,1 52.8,52.8" }
  ];
  
  // Rectangle coordinates for golden rectangles
  const rectangles = [
    { x: 0, y: 0, width: 100, height: 100 },
    { x: 0, y: 0, width: 61.8, height: 100 },
    { x: 61.8, y: 0, width: 38.2, height: 61.8 },
    { x: 61.8, y: 61.8, width: 38.2, height: 38.2 },
    { x: 61.8, y: 61.8, width: 23.6, height: 38.2 },
    { x: 85.4, y: 61.8, width: 14.6, height: 23.6 }
  ];
  
  const SpiralSvg = () => (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full"
      style={{ filter: colorTheme === 'neon' ? 'drop-shadow(0 0 2px rgba(79, 70, 229, 0.6))' : undefined }}
    >
      {/* Define gradient for rainbow theme */}
      <defs>
        <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="25%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="75%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        
        {colorTheme === 'neon' && (
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>
      
      {/* Golden ratio rectangles */}
      {highlightRectangles && rectangles.map((rect, index) => (
        <rect
          key={`rect-${index}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill={highlightIndex === index ? colors.rectangle : "transparent"}
          stroke={colors.rectangleStroke}
          strokeWidth="0.5"
          strokeOpacity={highlightIndex === index ? 1 : 0.3}
          onMouseEnter={() => interactive && setHighlightIndex(index)}
          onMouseLeave={() => interactive && setHighlightIndex(null)}
          className={interactive ? "cursor-pointer" : ""}
        />
      ))}
      
      {/* Spiral segments */}
      {spiralSegments.map((segment, index) => (
        <path
          key={`segment-${index}`}
          d={segment.command}
          stroke={highlightIndex === index ? colors.highlight : colors.spiral}
          strokeWidth={highlightIndex === index ? "1.5" : "1"}
          style={{ 
            transition: "stroke 0.3s, stroke-width 0.3s",
            filter: colorTheme === 'neon' ? 'url(#glow)' : undefined
          }}
          onMouseEnter={() => interactive && setHighlightIndex(index)}
          onMouseLeave={() => interactive && setHighlightIndex(null)}
          className={interactive ? "cursor-pointer" : ""}
        />
      ))}
      
      {/* Fibonacci numbers display */}
      {showSequence && (
        <g className="fibonacci-sequence">
          {fibonacciNumbers.slice(0, 8).map((num: number, i: number) => {
            // Position the numbers along the spiral
            const angle = i * Math.PI / 4;
            const distance = 10 + i * 5;
            const x = 50 + Math.cos(angle) * distance;
            const y = 50 + Math.sin(angle) * distance;
            
            return (
              <text
                key={`fib-${i}`}
                x={x}
                y={y}
                fontSize="4"
                fill={colors.sequence}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {num}
              </text>
            );
          })}
          
          {/* Golden ratio value */}
          <text
            x="50"
            y="50"
            fontSize="5"
            fontWeight="bold"
            fill={colors.highlight}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            φ ≈ {phi.toFixed(3)}
          </text>
        </g>
      )}
    </svg>
  );
  
  return (
    <div className={`relative ${size} ${className}`} ref={containerRef}>
      <motion.div 
        className="w-full h-full"
        animate={isPlaying && !interactive ? { rotate: 360 * rotationSpeed } : controls}
        transition={isPlaying && !interactive ? { 
          rotate: { duration: 30 / rotationSpeed, repeat: Infinity, ease: "linear" }
        } : undefined}
        style={{ 
          transform: interactive || perspective === '3d' ? transformStyle : undefined,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={interactive ? handleDrag : undefined}
        onTouchMove={interactive ? handleDrag : undefined}
        whileHover={interactive ? { scale: 1.05 } : undefined}
      >
        <SpiralSvg />
      </motion.div>
      
      {/* Interactive controls */}
      {interactive && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <button 
            className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mr-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button 
            className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            onClick={(e) => {
              e.stopPropagation();
              setRotation({ x: 0, y: 0, z: 0 });
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

// Pythagorean Theorem Visualization
export const PythagoreanTheorem: React.FC<{ size?: string; className?: string }> = ({ size = "w-32 h-32", className = "" }) => {
  return (
    <div className={`relative ${size} ${className}`}>
      <div className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-blue-200 opacity-70"></div>
      <div className="absolute top-0 left-0 w-3/5 h-2/5 bg-green-200 opacity-70"></div>
      <div className="absolute top-0 right-0 w-2/5 h-full bg-red-200 opacity-70"></div>
      
      {/* Labels */}
      <div className="absolute bottom-0 left-0 w-3/5 h-3/5 flex items-center justify-center">
        <span className="font-serif text-blue-800">a²</span>
      </div>
      <div className="absolute top-0 left-0 w-3/5 h-2/5 flex items-center justify-center">
        <span className="font-serif text-green-800">b²</span>
      </div>
      <div className="absolute top-0 right-0 w-2/5 h-full flex items-center justify-center">
        <span className="font-serif text-red-800">c²</span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-gray-800">a² + b² = c²</span>
      </div>
    </div>
  );
};

// Advanced Interactive Trigonometric Circle Visualization
export const TrigCircle: React.FC<{ 
  size?: string; 
  className?: string; 
  speed?: number;
  interactive?: boolean;
  showTangent?: boolean;
  showSine?: boolean;
  showCosine?: boolean;
  showValues?: boolean;
  darkMode?: boolean;
  animatedLabels?: boolean;
  showGrid?: boolean;
}> = ({ 
  size = "w-32 h-32", 
  className = "",
  speed = 1,
  interactive = false,
  showTangent = false,
  showSine = true,
  showCosine = true,
  showValues = false,
  darkMode = false,
  animatedLabels = false,
  showGrid = false
}) => {
  const [angle, setAngle] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedFunction, setSelectedFunction] = useState<'sine' | 'cosine' | 'tangent' | null>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation controls for advanced visual effects
  const controls = useAnimation();
  const labelControls = useAnimation();
  
  // Initialize the angle and start animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAngle(prev => (prev + speed) % 360);
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed]);
  
  // Animate labels when they change
  useEffect(() => {
    if (animatedLabels) {
      labelControls.start({
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1],
        transition: { duration: 0.3 }
      });
    }
  }, [angle, animatedLabels, labelControls]);
  
  // Calculate trigonometric values
  const radians = angle * Math.PI / 180;
  const sinVal = Math.sin(radians);
  const cosVal = Math.cos(radians);
  const tanVal = Math.tan(radians);
  
  // Format the values for display
  const formatValue = (value: number) => {
    return parseFloat(value.toFixed(3)).toString();
  };
  
  // Colors based on mode
  const colors = darkMode ? {
    background: '#111827',
    grid: '#374151',
    axes: '#4B5563',
    circle: '#6B7280',
    sine: '#34D399',
    cosine: '#F87171',
    tangent: '#60A5FA',
    angle: '#A78BFA',
    point: '#A78BFA',
    text: '#E5E7EB'
  } : {
    background: 'transparent',
    grid: '#E5E7EB',
    axes: '#9CA3AF',
    circle: '#CBD5E0',
    sine: '#48BB78',
    cosine: '#F56565',
    tangent: '#3B82F6',
    angle: '#7F9CF5',
    point: '#4C51BF',
    text: '#4B5563'
  };
  
  // Handle mouse/touch interaction
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!interactive) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Get client coordinates
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Get container dimensions and position
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle from center to mouse/touch position
    let newAngle = Math.atan2(-(clientY - centerY), clientX - centerX) * 180 / Math.PI;
    if (newAngle < 0) newAngle += 360;
    
    // Pause animation and set the new angle
    setIsPlaying(false);
    setAngle(newAngle);
    
    // Animate the point
    controls.start({
      scale: [1.5, 1],
      transition: { duration: 0.3 }
    });
  };
  
  // Function to create the grid
  const renderGrid = () => {
    if (!showGrid) return null;
    
    const gridLines = [];
    const spacing = 20;
    
    // Create horizontal grid lines
    for (let i = -100; i <= 100; i += spacing) {
      if (i === 0) continue; // Skip axis line which is drawn separately
      gridLines.push(
        <line 
          key={`h-${i}`} 
          x1="-100" 
          y1={i} 
          x2="100" 
          y2={i} 
          stroke={colors.grid} 
          strokeWidth="0.5" 
          strokeDasharray="2"
        />
      );
    }
    
    // Create vertical grid lines
    for (let i = -100; i <= 100; i += spacing) {
      if (i === 0) continue; // Skip axis line which is drawn separately
      gridLines.push(
        <line 
          key={`v-${i}`} 
          x1={i} 
          y1="-100" 
          x2={i} 
          y2="100" 
          stroke={colors.grid} 
          strokeWidth="0.5" 
          strokeDasharray="2"
        />
      );
    }
    
    return gridLines;
  };
  
  // Function to highlight specific trig function
  const selectFunction = (func: 'sine' | 'cosine' | 'tangent' | null) => {
    setSelectedFunction(func);
  };
  
  // Calculate tangent line
  const renderTangentLine = () => {
    if (!showTangent) return null;
    
    // Tangent is undefined at 90° and 270°
    if (Math.abs(Math.cos(radians)) < 0.001) {
      return null;
    }
    
    // Calculate a tangent line of limited length for display
    const tangentLength = Math.min(Math.abs(tanVal) * 100, 300);
    const tanY = Math.sign(tanVal) * tangentLength;
    
    return (
      <line 
        x1={100} 
        y1="0" 
        x2={100} 
        y2={-tanY} 
        stroke={selectedFunction === 'tangent' ? colors.tangent : colors.tangent}
        strokeWidth={selectedFunction === 'tangent' ? "3" : "2"}
        strokeDasharray={selectedFunction === 'tangent' ? undefined : "4"}
        strokeOpacity={selectedFunction !== null && selectedFunction !== 'tangent' ? "0.3" : "1"}
      />
    );
  };
  
  return (
    <div className={`relative ${size} ${className}`} ref={containerRef}>
      <svg 
        viewBox="-110 -110 220 220" 
        className="w-full h-full" 
        style={{ backgroundColor: colors.background }}
        onMouseMove={interactive ? handleInteraction : undefined}
        onTouchMove={interactive ? handleInteraction : undefined}
        onClick={() => interactive ? setIsPlaying(!isPlaying) : null}
      >
        {/* Grid */}
        {renderGrid()}
        
        {/* Unit circle */}
        <circle 
          cx="0" 
          cy="0" 
          r="100" 
          fill="none" 
          stroke={colors.circle} 
          strokeWidth="1"
          ref={circleRef} 
        />
        
        {/* Key points on circle */}
        <g opacity="0.5">
          <circle cx="100" cy="0" r="2" fill={colors.circle} />
          <circle cx="-100" cy="0" r="2" fill={colors.circle} />
          <circle cx="0" cy="100" r="2" fill={colors.circle} />
          <circle cx="0" cy="-100" r="2" fill={colors.circle} />
          
          <circle cx="70.7" cy="-70.7" r="2" fill={colors.circle} /> {/* 45° */}
          <circle cx="70.7" cy="70.7" r="2" fill={colors.circle} /> {/* 135° */}
          <circle cx="-70.7" cy="70.7" r="2" fill={colors.circle} /> {/* 225° */}
          <circle cx="-70.7" cy="-70.7" r="2" fill={colors.circle} /> {/* 315° */}
        </g>
        
        {/* Axis labels */}
        <text x="102" y="15" fill={colors.text} fontSize="12">1</text>
        <text x="-108" y="15" fill={colors.text} fontSize="12">-1</text>
        <text x="5" y="-102" fill={colors.text} fontSize="12">1</text>
        <text x="5" y="108" fill={colors.text} fontSize="12">-1</text>
        
        {/* Axes */}
        <line x1="-100" y1="0" x2="100" y2="0" stroke={colors.axes} strokeWidth="1" />
        <line x1="0" y1="-100" x2="0" y2="100" stroke={colors.axes} strokeWidth="1" />
        
        {/* Angle arc */}
        <path 
          d={`M 30 0 A 30 30 0 ${angle > 180 ? 1 : 0} 1 ${30 * cosVal} ${-30 * sinVal}`} 
          fill="none" 
          stroke={colors.angle} 
          strokeWidth="2" 
        />
        
        {/* Angle line */}
        <line 
          x1="0" 
          y1="0" 
          x2={100 * cosVal} 
          y2={-100 * sinVal} 
          stroke={colors.angle} 
          strokeWidth="2" 
        />
        
        {/* Sine line */}
        {showSine && (
          <line 
            x1={100 * cosVal} 
            y1="0" 
            x2={100 * cosVal} 
            y2={-100 * sinVal} 
            stroke={selectedFunction === 'sine' ? colors.sine : colors.sine}
            strokeWidth={selectedFunction === 'sine' ? "3" : "2"}
            strokeDasharray={selectedFunction === 'sine' ? undefined : "4"}
            strokeOpacity={selectedFunction !== null && selectedFunction !== 'sine' ? "0.3" : "1"}
          />
        )}
        
        {/* Cosine line */}
        {showCosine && (
          <line 
            x1="0" 
            y1="0" 
            x2={100 * cosVal} 
            y2="0" 
            stroke={selectedFunction === 'cosine' ? colors.cosine : colors.cosine}
            strokeWidth={selectedFunction === 'cosine' ? "3" : "2"}
            strokeDasharray={selectedFunction === 'cosine' ? undefined : "4"}
            strokeOpacity={selectedFunction !== null && selectedFunction !== 'cosine' ? "0.3" : "1"}
          />
        )}
        
        {/* Tangent line */}
        {renderTangentLine()}
        
        {/* Function Labels */}
        <motion.g animate={labelControls}>
          {showSine && (
            <motion.text 
              x={100 * cosVal + 5} 
              y={-100 * sinVal / 2} 
              fill={colors.sine}
              fontSize="12"
              fontWeight={selectedFunction === 'sine' ? "bold" : "normal"}
              onClick={() => interactive && selectFunction('sine')}
              className={interactive ? "cursor-pointer" : ""}
              animate={selectedFunction === 'sine' ? { scale: 1.2 } : { scale: 1 }}
            >
              {showValues ? `sin(${angle.toFixed(0)}°) = ${formatValue(sinVal)}` : "sin θ"}
            </motion.text>
          )}
          
          {showCosine && (
            <motion.text 
              x={100 * cosVal / 2} 
              y="15" 
              fill={colors.cosine}
              fontSize="12"
              fontWeight={selectedFunction === 'cosine' ? "bold" : "normal"}
              onClick={() => interactive && selectFunction('cosine')}
              className={interactive ? "cursor-pointer" : ""}
              animate={selectedFunction === 'cosine' ? { scale: 1.2 } : { scale: 1 }}
            >
              {showValues ? `cos(${angle.toFixed(0)}°) = ${formatValue(cosVal)}` : "cos θ"}
            </motion.text>
          )}
          
          {showTangent && (
            <motion.text 
              x="102" 
              y={-tanVal * 50 > 95 ? 95 : (-tanVal * 50 < -95 ? -95 : -tanVal * 50)} 
              fill={colors.tangent}
              fontSize="12"
              fontWeight={selectedFunction === 'tangent' ? "bold" : "normal"}
              onClick={() => interactive && selectFunction('tangent')}
              className={interactive ? "cursor-pointer" : ""}
              animate={selectedFunction === 'tangent' ? { scale: 1.2 } : { scale: 1 }}
            >
              {showValues ? `tan(${angle.toFixed(0)}°) = ${tanVal.toFixed(1)}` : "tan θ"}
            </motion.text>
          )}
        </motion.g>
        
        <motion.text 
          x={25 * cosVal - 10} 
          y={-25 * sinVal - 5} 
          fill={colors.angle}
          fontSize="12"
          animate={labelControls}
        >
          {showValues ? `${angle.toFixed(0)}°` : "θ"}
        </motion.text>
        
        {/* Point on circle */}
        <motion.circle 
          cx={100 * cosVal} 
          cy={-100 * sinVal} 
          r="4" 
          fill={colors.point}
          animate={controls}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.5 }}
          className={interactive ? "cursor-pointer" : ""}
        />
        
        {/* Visual indicator for interactive mode */}
        {interactive && (
          <g className="animate-pulse">
            <circle 
              cx={100 * cosVal} 
              cy={-100 * sinVal} 
              r="8" 
              fill="none"
              stroke={colors.point}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </g>
        )}
      </svg>
      
      {/* Controls for interactive mode */}
      {interactive && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <button 
            className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} mr-1`}
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button 
            className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={(e) => {
              e.stopPropagation();
              setAngle(45);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

type DifficultyLevels = 'easy' | 'medium' | 'hard';

type ColorScheme = {
  [key in DifficultyLevels]: {
    bg: string;
    border: string;
    button: string;
    title: string;
  }
};

// Animated Math Challenge Component
export const MathChallenge: React.FC<{
  question: React.ReactNode;
  solution: React.ReactNode;
  difficulty?: DifficultyLevels;
  className?: string;
}> = ({ question, solution, difficulty = "medium", className = "" }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  // Color scheme based on difficulty
  const colorScheme: ColorScheme = {
    easy: {
      bg: "bg-green-50",
      border: "border-green-200",
      button: "bg-green-600 hover:bg-green-700",
      title: "text-green-800"
    },
    medium: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      button: "bg-indigo-600 hover:bg-indigo-700",
      title: "text-indigo-800"
    },
    hard: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      button: "bg-purple-600 hover:bg-purple-700",
      title: "text-purple-800"
    }
  };
  
  const colors = colorScheme[difficulty] || colorScheme.medium;
  
  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className={`text-lg font-bold ${colors.title}`}>
          Math Challenge
        </div>
        <div className="ml-2 px-2 py-1 rounded text-xs font-medium capitalize" 
          style={{ 
            backgroundColor: difficulty === 'easy' ? '#D1FAE5' : 
                           difficulty === 'medium' ? '#E0E7FF' : '#F5D0FE',
            color: difficulty === 'easy' ? '#065F46' : 
                  difficulty === 'medium' ? '#3730A3' : '#7E22CE'
          }}
        >
          {difficulty}
        </div>
      </div>
      
      <div className="mb-6 font-serif">
        {question}
      </div>
      
      <div>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={`px-4 py-2 ${colors.button} text-white rounded-lg transition-colors`}
        >
          {showSolution ? "Hide Solution" : "View Solution"}
        </button>
      </div>
      
      {/* @ts-ignore */}
      <AnimatePresence mode="wait">
        {showSolution && (
          <motion.div 
            key="solution"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className={`font-medium ${colors.title} mb-2`}>Solution:</div>
            <div className="font-serif">{solution}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Floating Mathematical Symbols Background with Advanced Animation Controls
export const FloatingMathSymbols: React.FC<{ 
  count?: number; 
  className?: string;
  colorScheme?: 'default' | 'rainbow' | 'monochrome';
  animationSpeed?: 'slow' | 'normal' | 'fast';
  density?: 'sparse' | 'normal' | 'dense';
  interactive?: boolean;
}> = ({ 
  count = 20, 
  className = "", 
  colorScheme = 'default',
  animationSpeed = 'normal',
  density = 'normal',
  interactive = false
}) => {
  // Expanded mathematical symbols collection
  const mathSymbols = [
    'π', 'e', '∞', '∫', '∑', '√', 'Δ', '±', '≠', '≈', '⊂', '∪', '∩', '∀', '∃', '∇', 'φ', 'θ', 'λ', 'μ',
    '∂', '∏', '∈', '∉', '∅', '∄', '∝', '∧', '∨', '⊕', '⊗', '℘', '∠', '∡', '∥', '∦', '∴', '∵', '∼', '≅',
    'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'κ', 'ν', 'ξ', 'ρ', 'σ', 'τ', 'υ', 'χ', 'ψ', 'ω'
  ];
  
  // Complex mathematical equations for advanced display
  const mathEquations = [
    'e^{iπ}+1=0',
    '∫_{0}^{∞}e^{-x^2}dx=\\frac{√π}{2}',
    'E=mc^2',
    'F=G\\frac{m_1m_2}{r^2}',
    'y=\\frac{-b±√{b^2-4ac}}{2a}'
  ];
  
  // Animation speed modifiers
  const speedModifier = {
    slow: 1.5,
    normal: 1,
    fast: 0.6
  };
  
  // Density modifiers
  const densityModifier = {
    sparse: 0.7,
    normal: 1,
    dense: 1.5
  };
  
  // Actual count based on density
  const actualCount = Math.floor(count * densityModifier[density]);
  
  // Color arrays for different schemes
  const colorSchemes = {
    default: ['text-indigo-800'],
    monochrome: ['text-indigo-900', 'text-indigo-800', 'text-indigo-700', 'text-indigo-600'],
    rainbow: [
      'text-red-500', 'text-orange-500', 'text-amber-500', 
      'text-green-500', 'text-teal-500', 'text-blue-500', 
      'text-indigo-500', 'text-purple-500', 'text-pink-500'
    ]
  };
  
  const selectedColorScheme = colorSchemes[colorScheme];
  
  // Interactive hooks
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  
  // Generate more complex elements with varied animations
  const floatingElements = React.useMemo(() => {
    return Array.from({ length: actualCount }, (_, i) => {
      const useEquation = Math.random() < 0.1; // 10% chance to use an equation
      const symbolOrEquation = useEquation 
        ? mathEquations[Math.floor(Math.random() * mathEquations.length)]
        : mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      
      const colorIndex = Math.floor(Math.random() * selectedColorScheme.length);
      
      return {
        content: symbolOrEquation,
        isEquation: useEquation,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: useEquation ? (Math.random() * 0.8 + 0.7) : (Math.random() * 2 + 1),
        delay: Math.random() * 15,
        duration: (Math.random() * 15 + 20) * speedModifier[animationSpeed],
        opacity: Math.random() * 0.2 + (useEquation ? 0.1 : 0.05),
        rotate: Math.random() * 360,
        colorClass: selectedColorScheme[colorIndex],
        animationPath: Math.random() < 0.7 ? 'linear' : 'wave',
        scaleEffect: Math.random() < 0.5
      };
    });
  }, [actualCount, mathSymbols, mathEquations, selectedColorScheme, animationSpeed]);
  
  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
      onClick={() => interactive && setPaused(!paused)}
    >
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute font-serif select-none z-0 ${el.colorClass} ${interactive ? 'cursor-pointer' : ''}`}
          initial={{ 
            x: `${el.x}%`, 
            y: -100,
            rotate: 0,
            opacity: 0,
            scale: 1
          }}
          animate={!paused || hoveredIndex === index ? { 
            y: el.animationPath === 'linear' 
                ? ['0%', '100%'] 
                : ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            x: el.animationPath === 'linear' 
                ? `${el.x}%`
                : [`${el.x}%`, `${el.x - 10}%`, `${el.x}%`, `${el.x + 10}%`, `${el.x}%`],
            opacity: [0, el.opacity, el.opacity, 0],
            rotate: [0, el.rotate],
            scale: el.scaleEffect && hoveredIndex === index ? [1, 1.3, 1] : 1
          } : { y: hoveredIndex === index ? '50%' : '50%' }}
          transition={{ 
            y: {
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: el.animationPath === 'linear' ? "linear" : "easeInOut",
              times: el.animationPath === 'linear' ? undefined : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            },
            x: {
              duration: el.duration * 1.2,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
              times: el.animationPath === 'linear' ? undefined : [0, 0.25, 0.5, 0.75, 1]
            },
            opacity: {
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              times: [0, 0.1, 0.9, 1]
            },
            rotate: {
              duration: el.duration * 1.5,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.5,
              type: "spring",
              stiffness: 300
            }
          }}
          style={{
            fontSize: `${el.size}rem`
          }}
          onHoverStart={() => interactive && setHoveredIndex(index)}
          onHoverEnd={() => interactive && setHoveredIndex(null)}
        >
          {el.content}
        </motion.div>
      ))}
    </div>
  );
};

// Interactive Calculator Component
// Advanced Scientific Calculator Component with 3D Animation Effects
export const ScientificCalculator: React.FC<{ 
  className?: string;
  theme?: 'light' | 'dark' | 'neon';
  size?: 'compact' | 'regular' | 'large';
  animationLevel?: 'minimal' | 'moderate' | 'advanced';
}> = ({ 
  className = "", 
  theme = 'light',
  size = 'regular',
  animationLevel = 'moderate'
}) => {
  const [display, setDisplay] = useState("0");
  const [secondaryDisplay, setSecondaryDisplay] = useState("");
  const [currentExpression, setCurrentExpression] = useState("");
  const [lastOperation, setLastOperation] = useState("");
  const [memory, setMemory] = useState<number | null>(null);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<{expression: string, result: string}[]>([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [lastPressedButton, setLastPressedButton] = useState<string | null>(null);
  
  // Animation controls
  const controls = useAnimation();
  const displayControls = useAnimation();
  
  // Define theme styling
  const themeStyles = {
    light: {
      bg: 'bg-gray-100',
      display: 'bg-white',
      text: 'text-gray-900',
      secondary: 'text-gray-500',
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
      operation: 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300',
      function: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
      number: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      clear: 'bg-red-100 text-red-800 hover:bg-red-200',
      memory: 'bg-green-100 text-green-800 hover:bg-green-200',
      shadow: 'shadow-lg'
    },
    dark: {
      bg: 'bg-gray-900',
      display: 'bg-gray-800',
      text: 'text-white',
      secondary: 'text-gray-400',
      primary: 'bg-purple-600 text-white hover:bg-purple-700',
      operation: 'bg-gray-700 text-purple-200 hover:bg-gray-600',
      function: 'bg-gray-800 text-purple-300 hover:bg-gray-700',
      number: 'bg-gray-800 text-white hover:bg-gray-700',
      clear: 'bg-red-900 text-red-100 hover:bg-red-800',
      memory: 'bg-green-900 text-green-100 hover:bg-green-800',
      shadow: 'shadow-xl shadow-indigo-900/20'
    },
    neon: {
      bg: 'bg-gray-900',
      display: 'bg-black',
      text: 'text-indigo-400',
      secondary: 'text-indigo-300',
      primary: 'bg-indigo-900 text-indigo-200 border border-indigo-500 hover:bg-indigo-800',
      operation: 'bg-purple-900 text-purple-300 border border-purple-600 hover:bg-purple-800',
      function: 'bg-blue-900 text-blue-300 border border-blue-600 hover:bg-blue-800',
      number: 'bg-gray-900 text-indigo-300 border border-indigo-800 hover:bg-gray-800',
      clear: 'bg-red-900 text-red-300 border border-red-600 hover:bg-red-800',
      memory: 'bg-green-900 text-green-300 border border-green-600 hover:bg-green-800',
      shadow: 'shadow-xl shadow-indigo-500/20'
    }
  };
  
  // Size variants
  const sizeVariants = {
    compact: {
      container: 'max-w-xs',
      display: 'text-lg',
      buttonText: 'text-xs',
      padding: 'p-3',
      buttonPadding: 'p-1',
      gap: 'gap-1'
    },
    regular: {
      container: 'max-w-sm',
      display: 'text-xl',
      buttonText: 'text-sm',
      padding: 'p-4',
      buttonPadding: 'p-2',
      gap: 'gap-2'
    },
    large: {
      container: 'max-w-md',
      display: 'text-2xl',
      buttonText: 'text-base',
      padding: 'p-5',
      buttonPadding: 'p-3',
      gap: 'gap-3'
    }
  };
  
  // Button animation variants based on animation level
  type ButtonAnimation = {
    scale: number;
    y?: number;
    boxShadow?: string;
    transition: { type: string; stiffness: number; damping: number };
  };
  
  const buttonAnimations: Record<string, ButtonAnimation> = {
    minimal: {
      scale: 0.95,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    moderate: {
      scale: 0.9,
      y: 2,
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    },
    advanced: {
      scale: 0.85,
      y: 4,
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
      transition: { type: 'spring', stiffness: 500, damping: 15 }
    }
  };
  
  // Selected styles from theme and size
  const style = themeStyles[theme];
  const dimensions = sizeVariants[size];
  
  // Handle scientific functions
  const handleScientificFunction = (func: string) => {
    try {
      let value = parseFloat(display);
      let result: number;
      
      switch (func) {
        case 'sin':
          result = angleMode === 'DEG' ? Math.sin(value * Math.PI / 180) : Math.sin(value);
          break;
        case 'cos':
          result = angleMode === 'DEG' ? Math.cos(value * Math.PI / 180) : Math.cos(value);
          break;
        case 'tan':
          result = angleMode === 'DEG' ? Math.tan(value * Math.PI / 180) : Math.tan(value);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'x2':
          result = Math.pow(value, 2);
          break;
        case 'x3':
          result = Math.pow(value, 3);
          break;
        case '1/x':
          result = 1 / value;
          break;
        case 'π':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        case 'exp':
          result = Math.exp(value);
          break;
        case 'abs':
          result = Math.abs(value);
          break;
        case 'fact':
          if (value < 0 || value % 1 !== 0) throw new Error("Invalid input for factorial");
          result = factorial(value);
          break;
        default:
          result = value;
      }
      
      // Set secondary display to show the calculation
      setSecondaryDisplay(`${func}(${display}) = `);
      setDisplay(result.toString());
      setLastOperation("=");
      
    } catch (error) {
      setDisplay("Error");
    }
  };
  
  // Calculate factorial
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };
  
  // Handle memory functions
  const handleMemoryFunction = (func: string) => {
    try {
      const value = parseFloat(display);
      
      switch (func) {
        case 'MC': // Memory Clear
          setMemory(null);
          break;
        case 'MR': // Memory Recall
          if (memory !== null) {
            setDisplay(memory.toString());
          }
          break;
        case 'M+': // Memory Add
          setMemory((prev) => (prev || 0) + value);
          break;
        case 'M-': // Memory Subtract
          setMemory((prev) => (prev || 0) - value);
          break;
        case 'MS': // Memory Store
          setMemory(value);
          break;
      }
    } catch (error) {
      // Ignore errors in memory operations
    }
  };
  
  // Handle number input
  const handleNumberClick = (num: number | string) => {
    setLastPressedButton(num.toString());
    
    // Animate the display
    displayControls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.3 }
    });
    
    if (display === "0" || lastOperation || display === "Error") {
      setDisplay(num.toString());
      setLastOperation("");
    } else {
      setDisplay(display + num.toString());
    }
  };
  
  // Handle operation input
  const handleOperationClick = (op: string) => {
    setLastPressedButton(op);
    
    if (display === "Error") {
      setDisplay("0");
      setCurrentExpression("");
      return;
    }
    
    setCurrentExpression(currentExpression + display + " " + op + " ");
    setLastOperation(op);
    
    // Add to history if this is a completed calculation
    if (op === "=") {
      try {
        const expr = currentExpression + display;
        // Using Function constructor for safer evaluation
        const result = new Function(`return ${expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")}`)();
        
        // Update history
        setHistory(prev => [...prev, { 
          expression: currentExpression + display, 
          result: result.toString()
        }]);
        
        // Clear current expression
        setCurrentExpression("");
        
        // Display result
        setDisplay(result.toString());
        setSecondaryDisplay(expr + " =");
        
      } catch (error) {
        setDisplay("Error");
      }
    }
  };
  
  // Clear the calculator
  const handleClear = () => {
    setLastPressedButton('C');
    setDisplay("0");
    setCurrentExpression("");
    setLastOperation("");
    setSecondaryDisplay("");
    
    // Animate the display clearing
    displayControls.start({
      opacity: [1, 0.5, 1],
      transition: { duration: 0.3 }
    });
  };
  
  // Calculate the result
  const handleCalculate = () => {
    setLastPressedButton('=');
    try {
      if (display === "Error" || currentExpression === "") return;
      
      const fullExpression = currentExpression + display;
      // Using Function constructor for safer evaluation with replacements for display symbols
      const result = new Function(`return ${fullExpression.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")}`)();
      
      // Add to history
      setHistory(prev => [...prev, { 
        expression: fullExpression, 
        result: result.toString()
      }]);
      
      // Update display
      setSecondaryDisplay(fullExpression + " =");
      setDisplay(result.toString());
      setCurrentExpression("");
      setLastOperation("=");
      
      // Animate the display for calculation
      displayControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.4, type: 'spring' }
      });
      
    } catch (error) {
      setDisplay("Error");
    }
  };
  
  // Toggle calculator mode
  const toggleAdvancedMode = () => {
    setAdvancedMode(!advancedMode);
    
    // Animate the container when switching modes
    controls.start({
      scale: [1, 0.95, 1],
      opacity: [1, 0.9, 1],
      transition: { duration: 0.4 }
    });
  };
  
  // Toggle angle mode (DEG/RAD)
  const toggleAngleMode = () => {
    setAngleMode(prev => prev === 'DEG' ? 'RAD' : 'DEG');
  };
  
  // Create an animated button component
  const CalcButton: React.FC<{
    onClick: () => void,
    className?: string,
    children: React.ReactNode,
    value: string
  }> = ({ onClick, className = "", children, value }) => {
    const isPressed = lastPressedButton === value;
    
    return (
      <motion.button
        onClick={() => {
          onClick();
          controls.start({
            transition: { duration: 0.2 }
          });
        }}
        className={`rounded-lg ${dimensions.buttonPadding} font-medium flex items-center justify-center transition-colors ${className} ${dimensions.buttonText}`}
        whileTap={{
          scale: buttonAnimations[animationLevel].scale,
          y: buttonAnimations[animationLevel]?.y || 0,
          ...(buttonAnimations[animationLevel].boxShadow ? { boxShadow: buttonAnimations[animationLevel].boxShadow } : {}),
          transition: buttonAnimations[animationLevel].transition
        }}
        animate={isPressed ? { 
          scale: buttonAnimations[animationLevel].scale,
          y: buttonAnimations[animationLevel]?.y || 0,
          transition: { duration: 0.1 }
        } : { scale: 1, y: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.button>
    );
  };
  
  return (
    <motion.div 
      className={`${style.bg} rounded-2xl ${dimensions.padding} ${style.shadow} ${className} ${dimensions.container}`}
      animate={controls}
      initial={{ scale: 1 }}
    >
      {/* Calculator Header with Mode Toggle */}
      <div className="flex justify-between items-center mb-3">
        <div className={`text-xs font-medium ${style.secondary} flex items-center`}>
          <span>{angleMode}</span>
          {memory !== null && (
            <span className="ml-2 px-1 text-xs rounded bg-opacity-20 bg-green-500 text-green-300">M</span>
          )}
        </div>
        
        <motion.button
          onClick={toggleAdvancedMode}
          className={`text-xs px-2 py-1 rounded ${style.function} transition-colors`}
          whileTap={{ scale: 0.95 }}
        >
          {advancedMode ? "Basic" : "Advanced"}
        </motion.button>
      </div>
      
      {/* Calculator Display */}
      <motion.div 
        className={`${style.display} rounded-lg p-3 mb-4 ${style.text}`}
        animate={displayControls}
      >
        <div className={`${style.secondary} text-xs overflow-x-auto whitespace-nowrap`}>
          {secondaryDisplay || currentExpression}
        </div>
        <div className={`${dimensions.display} font-mono text-right overflow-x-auto`}>
          {display}
        </div>
      </motion.div>
      
      {/* History Drawer */}
      {showHistory && (
        <motion.div 
          className={`${style.display} rounded-lg p-2 mb-2 max-h-32 overflow-y-auto ${style.secondary}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {history.length === 0 ? (
            <div className="text-center text-xs py-2">No calculation history</div>
          ) : (
            history.map((item, index) => (
              <div key={index} className="text-xs border-b border-gray-700 py-1">
                <div>{item.expression}</div>
                <div className={`text-right ${style.text}`}>{item.result}</div>
              </div>
            ))
          )}
        </motion.div>
      )}
      
      {/* Button Grid */}
      <div className={`grid ${advancedMode ? 'grid-cols-5' : 'grid-cols-4'} ${dimensions.gap}`}>
        {/* History Toggle Button */}
        <CalcButton 
          onClick={() => setShowHistory(!showHistory)} 
          className={style.function}
          value="history"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </CalcButton>
        
        {/* Common buttons for both modes */}
        <CalcButton onClick={handleClear} className={style.clear} value="C">C</CalcButton>
        
        {/* Mode specific buttons */}
        {advancedMode ? (
          // Advanced Mode Buttons
          <>
            <CalcButton onClick={toggleAngleMode} className={style.function} value="angle">{angleMode}</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('x2')} className={style.function} value="x2">x²</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('sqrt')} className={style.function} value="sqrt">√</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('sin')} className={style.function} value="sin">sin</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('cos')} className={style.function} value="cos">cos</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('tan')} className={style.function} value="tan">tan</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('log')} className={style.function} value="log">log</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('ln')} className={style.function} value="ln">ln</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('π')} className={style.function} value="π">π</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('e')} className={style.function} value="e">e</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('fact')} className={style.function} value="fact">n!</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('abs')} className={style.function} value="abs">|x|</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('1/x')} className={style.function} value="1/x">1/x</CalcButton>
            <CalcButton onClick={() => handleScientificFunction('exp')} className={style.function} value="exp">exp</CalcButton>
          </>
        ) : (
          // Basic Mode Buttons
          <>
            <CalcButton onClick={() => setDisplay(prev => prev === "0" ? "0" : (prev.startsWith('-') ? prev.substring(1) : '-' + prev))} className={style.function} value="±">±</CalcButton>
            <CalcButton onClick={() => handleOperationClick("%")} className={style.function} value="%">%</CalcButton>
          </>
        )}
        
        {/* Common operation buttons */}
        <CalcButton onClick={() => handleOperationClick("÷")} className={style.operation} value="÷">÷</CalcButton>
        
        {/* Memory buttons if in advanced mode */}
        {advancedMode && (
          <>
            <CalcButton onClick={() => handleMemoryFunction('MC')} className={style.memory} value="MC">MC</CalcButton>
            <CalcButton onClick={() => handleMemoryFunction('MR')} className={style.memory} value="MR">MR</CalcButton>
            <CalcButton onClick={() => handleMemoryFunction('M+')} className={style.memory} value="M+">M+</CalcButton>
            <CalcButton onClick={() => handleMemoryFunction('M-')} className={style.memory} value="M-">M-</CalcButton>
            <CalcButton onClick={() => handleMemoryFunction('MS')} className={style.memory} value="MS">MS</CalcButton>
          </>
        )}
        
        {/* Number buttons */}
        <CalcButton onClick={() => handleNumberClick(7)} className={style.number} value="7">7</CalcButton>
        <CalcButton onClick={() => handleNumberClick(8)} className={style.number} value="8">8</CalcButton>
        <CalcButton onClick={() => handleNumberClick(9)} className={style.number} value="9">9</CalcButton>
        <CalcButton onClick={() => handleOperationClick("×")} className={style.operation} value="×">×</CalcButton>
        
        <CalcButton onClick={() => handleNumberClick(4)} className={style.number} value="4">4</CalcButton>
        <CalcButton onClick={() => handleNumberClick(5)} className={style.number} value="5">5</CalcButton>
        <CalcButton onClick={() => handleNumberClick(6)} className={style.number} value="6">6</CalcButton>
        <CalcButton onClick={() => handleOperationClick("−")} className={style.operation} value="−">−</CalcButton>
        
        <CalcButton onClick={() => handleNumberClick(1)} className={style.number} value="1">1</CalcButton>
        <CalcButton onClick={() => handleNumberClick(2)} className={style.number} value="2">2</CalcButton>
        <CalcButton onClick={() => handleNumberClick(3)} className={style.number} value="3">3</CalcButton>
        <CalcButton onClick={() => handleOperationClick("+")} className={style.operation} value="+">+</CalcButton>
        
        <CalcButton 
          onClick={() => handleNumberClick(0)} 
          className={`${style.number} ${advancedMode ? '' : 'col-span-2'}`}
          value="0"
        >
          0
        </CalcButton>
        
        {advancedMode && (
          <CalcButton onClick={() => handleNumberClick("00")} className={style.number} value="00">00</CalcButton>
        )}
        
        <CalcButton onClick={() => handleNumberClick(".")} className={style.number} value=".">.</CalcButton>
        <CalcButton onClick={handleCalculate} className={style.primary} value="=">=</CalcButton>
      </div>
      
      {/* Visual effects for advanced calculator */}
      {theme === 'neon' && (
        <>
          <motion.div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ 
              boxShadow: ['0 0 10px rgba(79, 70, 229, 0.4), 0 0 20px rgba(79, 70, 229, 0.2)', 
                          '0 0 15px rgba(79, 70, 229, 0.5), 0 0 30px rgba(79, 70, 229, 0.3)', 
                          '0 0 10px rgba(79, 70, 229, 0.4), 0 0 20px rgba(79, 70, 229, 0.2)'] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none opacity-30">
            <motion.div 
              className="absolute -inset-[10px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ filter: 'blur(20px)' }}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};

// Legacy Calculator (Simpler Version) for backward compatibility
export const SimpleCalculator: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [display, setDisplay] = useState("0");
  const [currentExpression, setCurrentExpression] = useState("");
  const [lastOperation, setLastOperation] = useState("");
  
  const handleNumberClick = (num: number | string) => {
    if (display === "0" || lastOperation) {
      setDisplay(num.toString());
      setLastOperation("");
    } else {
      setDisplay(display + num.toString());
    }
  };
  
  const handleOperationClick = (op: string) => {
    setCurrentExpression(currentExpression + display + op);
    setLastOperation(op);
  };
  
  const handleClear = () => {
    setDisplay("0");
    setCurrentExpression("");
    setLastOperation("");
  };
  
  const handleCalculate = () => {
    try {
      const fullExpression = currentExpression + display;
      // Using Function constructor for safer evaluation
      const result = new Function(`return ${fullExpression}`)();
      setDisplay(result.toString());
      setCurrentExpression("");
      setLastOperation("=");
    } catch (error) {
      setDisplay("Error");
    }
  };
  
  return (
    <div className={`bg-gray-100 rounded-xl p-4 shadow-lg ${className}`}>
      <div className="bg-white rounded-lg p-2 mb-4 text-right text-xl font-mono">
        <div className="text-gray-500 text-xs">{currentExpression}</div>
        <div className="text-xl">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="calc-button bg-red-100 text-red-800 hover:bg-red-200">C</button>
        <button className="calc-button bg-indigo-100 text-indigo-800 hover:bg-indigo-200">±</button>
        <button className="calc-button bg-indigo-100 text-indigo-800 hover:bg-indigo-200">%</button>
        <button onClick={() => handleOperationClick("/")} className="calc-button bg-indigo-200 text-indigo-800 hover:bg-indigo-300">÷</button>
        
        <button onClick={() => handleNumberClick(7)} className="calc-button bg-gray-200 hover:bg-gray-300">7</button>
        <button onClick={() => handleNumberClick(8)} className="calc-button bg-gray-200 hover:bg-gray-300">8</button>
        <button onClick={() => handleNumberClick(9)} className="calc-button bg-gray-200 hover:bg-gray-300">9</button>
        <button onClick={() => handleOperationClick("*")} className="calc-button bg-indigo-200 text-indigo-800 hover:bg-indigo-300">×</button>
        
        <button onClick={() => handleNumberClick(4)} className="calc-button bg-gray-200 hover:bg-gray-300">4</button>
        <button onClick={() => handleNumberClick(5)} className="calc-button bg-gray-200 hover:bg-gray-300">5</button>
        <button onClick={() => handleNumberClick(6)} className="calc-button bg-gray-200 hover:bg-gray-300">6</button>
        <button onClick={() => handleOperationClick("-")} className="calc-button bg-indigo-200 text-indigo-800 hover:bg-indigo-300">−</button>
        
        <button onClick={() => handleNumberClick(1)} className="calc-button bg-gray-200 hover:bg-gray-300">1</button>
        <button onClick={() => handleNumberClick(2)} className="calc-button bg-gray-200 hover:bg-gray-300">2</button>
        <button onClick={() => handleNumberClick(3)} className="calc-button bg-gray-200 hover:bg-gray-300">3</button>
        <button onClick={() => handleOperationClick("+")} className="calc-button bg-indigo-200 text-indigo-800 hover:bg-indigo-300">+</button>
        
        <button onClick={() => handleNumberClick(0)} className="col-span-2 calc-button bg-gray-200 hover:bg-gray-300">0</button>
        <button onClick={() => handleNumberClick(".")} className="calc-button bg-gray-200 hover:bg-gray-300">.</button>
        <button onClick={handleCalculate} className="calc-button bg-indigo-600 text-white hover:bg-indigo-700">=</button>
      </div>
    </div>
  );
};

// Polynomial Factorization Component
export const PolynomialFactorization: React.FC<{
  className?: string;
  greenTheme?: boolean;
  designStyle?: 'glass' | 'dark' | 'gradient' | 'minimal';
}> = ({
  className = "",
  greenTheme = true,
  designStyle = 'glass'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Define the steps of the polynomial factorization
  const steps = [
    // Initial quadratic expression
    {
      expression: "x² - 5x + 6",
      explanation: "Let's factor this quadratic expression"
    },
    // Find factors of the constant term
    {
      expression: "6 = 1 × 6 = 2 × 3",
      explanation: "Find factors of the constant term (6)"
    },
    // Identify correct factors
    {
      expression: "2 + 3 = 5",
      explanation: "We need factors that sum to 5 (coefficient of x)"
    },
    // Write factors as binomials
    {
      expression: "(x - 2)(x - 3)",
      explanation: "Write as product of binomials"
    },
    // Verify through expansion
    {
      expression: "x² - 3x - 2x + 6",
      explanation: "Verify: (x - 2)(x - 3) = x² - 3x - 2x + 6"
    },
    // Final simplified form
    {
      expression: "x² - 5x + 6",
      explanation: "Simplified: x² - 5x + 6 ✓"
    }
  ];
  
  // Set up automatic stepping through the animation
  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      } else {
        // Loop back to the beginning after a longer pause
        setTimeout(() => {
          setCurrentStep(0);
        }, 2000);
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [currentStep, steps.length, isAnimating]);
  
  // Design style variations
  const designStyles = {
    glass: {
      container: `backdrop-filter backdrop-blur-md bg-white bg-opacity-20 border border-white border-opacity-30 shadow-lg ${greenTheme ? 'text-white' : 'text-indigo-50'}`,
      heading: 'text-white text-opacity-90',
      expression: 'text-white font-medium',
      explanation: 'bg-white bg-opacity-20 text-white text-opacity-90',
      dot: `${greenTheme ? 'bg-emerald-400' : 'bg-indigo-400'}`,
      inactiveDot: 'bg-white bg-opacity-30'
    },
    dark: {
      container: `${greenTheme ? 'bg-emerald-900' : 'bg-indigo-900'} shadow-lg border ${greenTheme ? 'border-emerald-700' : 'border-indigo-700'}`,
      heading: `${greenTheme ? 'text-emerald-200' : 'text-indigo-200'}`,
      expression: 'text-white font-medium',
      explanation: `${greenTheme ? 'bg-emerald-800 text-emerald-100' : 'bg-indigo-800 text-indigo-100'}`,
      dot: `${greenTheme ? 'bg-emerald-400' : 'bg-indigo-400'}`,
      inactiveDot: `${greenTheme ? 'bg-emerald-700' : 'bg-indigo-700'}`
    },
    gradient: {
      container: `${greenTheme ? 'bg-gradient-to-br from-emerald-800 to-green-900' : 'bg-gradient-to-br from-indigo-800 to-purple-900'} shadow-lg`,
      heading: 'text-white text-opacity-90',
      expression: 'text-white font-bold',
      explanation: `${greenTheme ? 'bg-emerald-700 bg-opacity-50 text-white' : 'bg-indigo-700 bg-opacity-50 text-white'}`,
      dot: `${greenTheme ? 'bg-green-400' : 'bg-indigo-400'}`,
      inactiveDot: 'bg-white bg-opacity-30'
    },
    minimal: {
      container: 'bg-transparent border-0 shadow-none',
      heading: 'text-white text-opacity-80',
      expression: 'text-white font-bold',
      explanation: 'bg-black bg-opacity-30 text-white',
      dot: `${greenTheme ? 'bg-green-400' : 'bg-indigo-400'}`,
      inactiveDot: 'bg-white bg-opacity-20'
    }
  };
  
  // Select the appropriate style
  const style = designStyles[designStyle];
  
  // Visualization of the polynomial factorization steps
  const PolynomialVisualization = ({ step }: { step: number }) => {
    // Only show visualization from step 1 onwards
    const isVisible = step >= 1;
    
    // Visual representation of factorization
    return (
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.7 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-white text-opacity-30">
          {/* Background grid for polynomial visualization */}
          <g strokeWidth="0.5" stroke="currentColor" strokeOpacity="0.3">
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
            
            {/* Coordinate markings */}
            <text x="92" y="52" fill="currentColor" fontSize="8">x</text>
            <text x="48" y="10" fill="currentColor" fontSize="8">y</text>
          </g>
          
          {/* Step-specific visualizations */}
          {step >= 3 && (
            <>
              {/* Parabola for x² - 5x + 6 */}
              <path
                d="M 20,80 Q 50,20 80,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              
              {/* Root markers (x = 2 and x = 3) */}
              <circle cx="35" cy="50" r="2" fill="currentColor" />
              <circle cx="65" cy="50" r="2" fill="currentColor" />
              
              {/* Root labels */}
              <text x="35" y="45" fill="currentColor" fontSize="8" textAnchor="middle">2</text>
              <text x="65" y="45" fill="currentColor" fontSize="8" textAnchor="middle">3</text>
            </>
          )}
          
          {/* Binomial factors visualization for steps 4+ */}
          {step >= 4 && (
            <>
              <line x1="35" y1="30" x2="35" y2="70" stroke="currentColor" strokeDasharray="1,1" />
              <line x1="65" y1="30" x2="65" y2="70" stroke="currentColor" strokeDasharray="1,1" />
              <text x="30" y="85" fill="currentColor" fontSize="7">(x-2)</text>
              <text x="60" y="85" fill="currentColor" fontSize="7">(x-3)</text>
            </>
          )}
        </svg>
      </motion.div>
    );
  };
  
  // Render the component
  return (
    <div 
      className={`font-serif ${className} ${style.container} rounded-xl p-5 relative overflow-hidden`}
      onClick={() => setIsAnimating(!isAnimating)}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mathematical symbols */}
        <div className="text-white text-opacity-10 font-serif absolute top-2 right-2 text-4xl transform rotate-12">x²</div>
        <div className="text-white text-opacity-10 font-serif absolute bottom-4 left-4 text-3xl transform -rotate-12">+</div>
        <div className="text-white text-opacity-5 font-serif absolute bottom-2 right-8 text-4xl">-</div>
        
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      {/* Top label */}
      <div className={`text-xs ${style.heading} mb-2 font-sans font-medium tracking-wide`}>
        Polynomial Factorization
      </div>
      
      {/* Expression display */}
      <div className="text-center my-5 relative z-10">
        <motion.div
          className={`text-3xl sm:text-4xl ${style.expression}`}
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {steps[currentStep].expression}
        </motion.div>
      </div>
      
      {/* Polynomial visualization */}
      <div className="relative h-28">
        <PolynomialVisualization step={currentStep} />
      </div>
      
      {/* Explanation */}
      <motion.div
        className={`text-xs sm:text-sm mt-3 px-3 py-2 rounded-lg ${style.explanation} relative z-10`}
        key={`explanation-${currentStep}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {steps[currentStep].explanation}
      </motion.div>
      
      {/* Progress dots */}
      <div className="flex justify-center mt-4 space-x-2 relative z-10">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${currentStep === index ? style.dot : style.inactiveDot}`}
            initial={{ scale: 1 }}
            animate={{ scale: currentStep === index ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
      
      {/* Interactive hint */}
      <div className="absolute bottom-2 right-2 text-[10px] text-white text-opacity-60">
        Click to {isAnimating ? 'pause' : 'play'}
      </div>
      
      {/* Glow effect for glass style */}
      {designStyle === 'glass' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 blur-xl" 
               style={{ transform: 'rotate(-15deg) translateY(-30%)' }}></div>
        </div>
      )}
    </div>
  );
};