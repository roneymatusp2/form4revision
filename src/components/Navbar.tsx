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
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white text-indigo-900 shadow-md' 
        : 'bg-indigo-900 text-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 relative">
          {/* Decorative math symbols - visible only when scrolled */}
          {scrolled && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {mathSymbols.map((symbol, i) => (
                <span 
                  key={i}
                  className="absolute text-indigo-100 opacity-10 select-none"
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
                scrolled ? 'bg-indigo-100 text-indigo-900' : 'bg-indigo-800 text-white'
              }`}>
                <span className="font-serif">∫</span>
              </div>
              <span className="hidden sm:inline">Form 3 Mathematics</span>
              <span className="sm:hidden">Math</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" scrolled={scrolled}>
              Home
            </NavLink>
            
            <NavLink to="/topic/unit-1" scrolled={scrolled} color="blue">
              Number Systems
            </NavLink>
            
            <NavLink to="/topic/unit-2" scrolled={scrolled} color="green">
              Algebraic Manipulation
            </NavLink>
            
            <NavLink to="/topic/unit-3" scrolled={scrolled} color="emerald">
              Mensuration
            </NavLink>
            
            <NavLink to="/topic/unit-4" scrolled={scrolled} color="indigo">
              Linear Patterns
            </NavLink>
            
            <NavLink to="/topic/unit-5" scrolled={scrolled} color="amber">
              Angles
            </NavLink>
            
            <NavLink to="/topic/unit-8" scrolled={scrolled} color="purple">
              Trigonometry
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
                  ? 'hover:bg-indigo-100' 
                  : 'hover:bg-indigo-800'
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
            className={`overflow-hidden md:hidden ${scrolled ? 'bg-white' : 'bg-indigo-800'}`}
          >
            <div className="py-2 space-y-1">
              <MobileNavLink to="/" scrolled={scrolled}>Home</MobileNavLink>
              <MobileNavLink to="/topic/unit-1" scrolled={scrolled}>Number Systems</MobileNavLink>
              <MobileNavLink to="/topic/unit-2" scrolled={scrolled}>Algebraic Manipulation</MobileNavLink>
              <MobileNavLink to="/topic/unit-3" scrolled={scrolled}>Mensuration</MobileNavLink>
              <MobileNavLink to="/topic/unit-4" scrolled={scrolled}>Linear Patterns</MobileNavLink>
              <MobileNavLink to="/topic/unit-5" scrolled={scrolled}>Angles</MobileNavLink>
              <MobileNavLink to="/topic/unit-8" scrolled={scrolled}>Trigonometry</MobileNavLink>
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
  color?: string;
}

// Desktop navigation link
const NavLink: React.FC<NavLinkProps> = ({ to, children, scrolled, color }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const getActiveColor = () => {
    if (!isActive) return '';
    
    switch(color) {
      case 'blue': return scrolled ? 'bg-blue-100 text-blue-800' : 'bg-blue-800 text-white';
      case 'green': return scrolled ? 'bg-green-100 text-green-800' : 'bg-green-800 text-white';
      case 'emerald': return scrolled ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-800 text-white';
      case 'indigo': return scrolled ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-800 text-white';
      case 'amber': return scrolled ? 'bg-amber-100 text-amber-800' : 'bg-amber-800 text-white';
      case 'purple': return scrolled ? 'bg-purple-100 text-purple-800' : 'bg-purple-800 text-white';
      default: return scrolled ? 'bg-indigo-100 text-indigo-900' : 'bg-indigo-800 text-white';
    }
  };
  
  const getUnderlineColor = () => {
    switch(color) {
      case 'blue': return 'bg-blue-600';
      case 'green': return 'bg-green-600';
      case 'emerald': return 'bg-emerald-600';
      case 'indigo': return 'bg-indigo-600';
      case 'amber': return 'bg-amber-600';
      case 'purple': return 'bg-purple-600';
      default: return 'bg-indigo-600';
    }
  };
  
  return (
    <Link 
      to={to} 
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? getActiveColor()
          : scrolled 
            ? 'hover:bg-indigo-50' 
            : 'hover:bg-indigo-800'
      }`}
    >
      {children}
      {isActive && (
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 h-0.5 mx-3 ${getUnderlineColor()}`}
          layoutId="navbar-underline"
        />
      )}
    </Link>
  );
};

// Mobile navigation link
const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, scrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`block px-4 py-2 text-base font-medium ${
        isActive 
          ? scrolled 
            ? 'bg-indigo-100 text-indigo-900' 
            : 'bg-indigo-700 text-white'
          : scrolled 
            ? 'text-indigo-900 hover:bg-indigo-50' 
            : 'text-white hover:bg-indigo-700'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;