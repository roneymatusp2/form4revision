import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import topics from '../data/topics';
import AdminAccessButton from './AdminAccessButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Math symbols for decorative purposes
  const mathSymbols = ['π', '∑', '∫', '√', '∞', 'θ', 'Δ', '≡'];
  
  const getTopicColor = (id: string) => {
    switch(id) {
      case 'unit-1': return {
        bg: 'bg-indigo-500',
        hover: 'hover:bg-indigo-600',
        text: 'text-white',
      };
      case 'unit-2': return {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-white',
      };
      case 'unit-3': return {
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        text: 'text-white',
      };
      case 'unit-4': return {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-white',
      };
      case 'unit-5': return {
        bg: 'bg-amber-500',
        hover: 'hover:bg-amber-600',
        text: 'text-white',
      };
      case 'unit-6': return {
        bg: 'bg-rose-500',
        hover: 'hover:bg-rose-600',
        text: 'text-white',
      };
      case 'unit-7': return {
        bg: 'bg-violet-500',
        hover: 'hover:bg-violet-600',
        text: 'text-white',
      };
      case 'unit-8': return {
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-white',
      };
      default: return {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-white',
      };
    }
  };
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white text-emerald-900 shadow-md' 
        : 'bg-emerald-900 text-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 relative">
          {/* Decorative math symbols - visible only when scrolled */}
          {scrolled && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {mathSymbols.map((symbol, i) => (
                <span 
                  key={i}
                  className="absolute text-emerald-100 opacity-10 select-none"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${i * 12 + Math.random() * 5}%`,
                    fontSize: `${Math.random() * 0.8 + 0.8}rem`,
                    transform: `rotate(${Math.random() * 30 - 15}deg)`
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>
          )}
          
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl font-bold flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                scrolled ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-800 text-white'
              }`}>
                <span className="font-serif">∫</span>
              </div>
              <span className="hidden sm:inline">Form 4 Mathematics</span>
              <span className="sm:hidden">Math</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" scrolled={scrolled}>
              Home
            </NavLink>
            
            <NavLink to="/topic/unit-1" scrolled={scrolled} unitId="unit-1">
              Linear Patterns
            </NavLink>
            
            <NavLink to="/topic/unit-2" scrolled={scrolled} unitId="unit-2">
              Angles
            </NavLink>
            
            <NavLink to="/topic/unit-4" scrolled={scrolled} unitId="unit-4">
              Algebraic Manipulation
            </NavLink>
            
            <NavLink to="/topic/unit-5" scrolled={scrolled} unitId="unit-5">
              Quadratic Patterns
            </NavLink>
            
            <NavLink to="/topic/unit-6" scrolled={scrolled} unitId="unit-6">
              Sequences
            </NavLink>
            
            <NavLink to="/topic/unit-7" scrolled={scrolled} unitId="unit-7">
              Functions
            </NavLink>
            
            <NavLink to="/resources" scrolled={scrolled}>
              Resources
            </NavLink>

            <div className="ml-2">
              <AdminAccessButton />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled 
                  ? 'hover:bg-emerald-100' 
                  : 'hover:bg-emerald-800'
              }`}
              aria-label="Toggle menu"
            >
              {!isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden md:hidden ${scrolled ? 'bg-white' : 'bg-emerald-800'}`}
          >
            <div className="py-2 space-y-1">
              <MobileNavLink to="/" scrolled={scrolled}>Home</MobileNavLink>
              <MobileNavLink to="/topic/unit-1" scrolled={scrolled} unitId="unit-1">Linear Patterns</MobileNavLink>
              <MobileNavLink to="/topic/unit-2" scrolled={scrolled} unitId="unit-2">Angles</MobileNavLink>
              <MobileNavLink to="/topic/unit-4" scrolled={scrolled} unitId="unit-4">Algebraic Manipulation</MobileNavLink>
              <MobileNavLink to="/topic/unit-5" scrolled={scrolled} unitId="unit-5">Quadratic Patterns</MobileNavLink>
              <MobileNavLink to="/topic/unit-6" scrolled={scrolled} unitId="unit-6">Sequences</MobileNavLink>
              <MobileNavLink to="/topic/unit-7" scrolled={scrolled} unitId="unit-7">Functions</MobileNavLink>
              <MobileNavLink to="/resources" scrolled={scrolled}>Resources</MobileNavLink>
              <div className="px-4 py-2">
                <AdminAccessButton />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  scrolled: boolean;
  unitId?: string;
}

// Desktop navigation link
const NavLink: React.FC<NavLinkProps> = ({ to, children, scrolled, unitId }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const getActiveStyles = () => {
    if (!unitId) {
      return {
        active: scrolled 
          ? 'bg-emerald-100 text-emerald-900' 
          : 'bg-emerald-800 text-white',
        hover: scrolled 
          ? 'hover:bg-emerald-50' 
          : 'hover:bg-emerald-800',
        underline: 'bg-emerald-600'
      };
    }
    
    const colors = {
      'unit-1': {
        bg: 'bg-indigo-500',
        hover: 'hover:bg-indigo-600',
        text: 'text-white',
      },
      'unit-2': {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-white',
      },
      'unit-3': {
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        text: 'text-white',
      },
      'unit-4': {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-white',
      },
      'unit-5': {
        bg: 'bg-amber-500',
        hover: 'hover:bg-amber-600',
        text: 'text-white',
      },
      'unit-6': {
        bg: 'bg-rose-500',
        hover: 'hover:bg-rose-600',
        text: 'text-white',
      },
      'unit-7': {
        bg: 'bg-violet-500',
        hover: 'hover:bg-violet-600',
        text: 'text-white',
      },
      'unit-8': {
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-white',
      }
    }[unitId] || {
      bg: 'bg-emerald-500',
      hover: 'hover:bg-emerald-600',
      text: 'text-white',
    };
    
    return {
      active: scrolled 
        ? `bg-${unitId.replace('unit-', '')}-100 text-${unitId.replace('unit-', '')}-900` 
        : `${colors.bg} ${colors.text}`,
      hover: scrolled 
        ? `hover:bg-${unitId.replace('unit-', '')}-50` 
        : colors.hover,
      underline: `bg-${unitId.replace('unit-', '')}-600`
    };
  };
  
  const styles = getActiveStyles();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={to} 
        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive 
            ? styles.active
            : scrolled 
              ? 'hover:bg-emerald-50' 
              : 'hover:bg-emerald-800'
        }`}
      >
        {children}
        {isActive && (
          <motion.div 
            className={`absolute bottom-0 left-0 right-0 h-0.5 mx-3 ${unitId ? `bg-${unitId.replace('unit-', '')}-600` : 'bg-emerald-600'}`}
            layoutId="navbar-underline"
          />
        )}
      </Link>
    </motion.div>
  );
};

// Mobile navigation link
const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, scrolled, unitId }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const getActiveStyles = () => {
    if (!unitId) {
      return scrolled 
        ? 'bg-emerald-100 text-emerald-900' 
        : 'bg-emerald-700 text-white';
    }
    
    const colors = {
      'unit-1': {
        bg: 'bg-indigo-500',
        hover: 'hover:bg-indigo-600',
        text: 'text-white',
      },
      'unit-2': {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-white',
      },
      'unit-3': {
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        text: 'text-white',
      },
      'unit-4': {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-white',
      },
      'unit-5': {
        bg: 'bg-amber-500',
        hover: 'hover:bg-amber-600',
        text: 'text-white',
      },
      'unit-6': {
        bg: 'bg-rose-500',
        hover: 'hover:bg-rose-600',
        text: 'text-white',
      },
      'unit-7': {
        bg: 'bg-violet-500',
        hover: 'hover:bg-violet-600',
        text: 'text-white',
      },
      'unit-8': {
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-white',
      }
    }[unitId] || {
      bg: 'bg-emerald-500',
      hover: 'hover:bg-emerald-600',
      text: 'text-white',
    };
    
    return scrolled 
      ? `bg-${unitId.replace('unit-', '')}-100 text-${unitId.replace('unit-', '')}-900` 
      : `${colors.bg} ${colors.text}`;
  };
  
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={to} 
        className={`block px-4 py-2 text-base font-medium ${
          isActive 
            ? getActiveStyles()
            : scrolled 
              ? 'text-emerald-900 hover:bg-emerald-50' 
              : 'text-white hover:bg-emerald-700'
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Navbar;