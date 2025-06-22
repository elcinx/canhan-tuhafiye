import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [cartAddedAnim, setCartAddedAnim] = React.useState(false);
  const prevCartCount = React.useRef(cartItemCount);
  React.useEffect(() => {
    if (cartItemCount > prevCartCount.current) {
      setCartAddedAnim(true);
      setTimeout(() => setCartAddedAnim(false), 1200);
    }
    prevCartCount.current = cartItemCount;
  }, [cartItemCount]);

  // Search bar state
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close search input on Escape or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowSearch(false);
    }
    function handleClick(e: MouseEvent) {
      if (
        showSearch &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
      }
    }
    if (showSearch) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setShowSearch(false);
      setSearchValue("");
    }
  };

  const handleSearchBlur = () => {
    setShowSearch(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Ürünler', path: '/products' },

    { name: 'Hakkımızda', path: '/about' },
    { name: 'İletişim', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-white'}`} style={{borderBottom: '0', boxShadow: 'none'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pink strip under navbar */}
        <div style={{position:'absolute', left:0, right:0, bottom:-12, height: '16px', background: '#f94f9c', zIndex: 1}}></div>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/depositphotos_308670920-stock-illustration-pink-yellow-crochet-shop-logotype.jpg" 
                alt="Canhan Tuhafiye" 
                className="h-12 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">Canhan Tuhafiye</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-10 md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50/50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <button
                className="p-2 text-neutral-600 hover:text-primary-600 rounded-full hover:bg-neutral-100 transition-colors"
                onClick={() => setShowSearch((prev) => !prev)}
                aria-label="Ara"
              >
                <FiSearch className="h-5 w-5" />
              </button>
              {showSearch && (
                <input
                  ref={searchInputRef}
                  type="text"
                  className="absolute right-0 top-10 z-50 border border-primary-200 rounded-lg px-3 py-2 w-48 shadow focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
                  placeholder="Ürün ara..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onBlur={handleSearchBlur}
                  autoFocus
                />
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <Link
                to="/sepet"
                className="p-2 text-neutral-600 hover:text-primary-600 rounded-full hover:bg-neutral-100 transition-colors relative"
                aria-label="Sepetim"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
  <>
    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {cartItemCount > 9 ? '9+' : cartItemCount}
    </span>
    {/* Animasyonlu pembe nokta */}
    <span className="absolute -top-2 -right-2 h-3 w-3 bg-pink-400 rounded-full border-2 border-white animate-ping z-20"></span>
    {/* Sepete ürün eklendiğinde animasyonlu onay işareti */}
    {cartAddedAnim && (
      <span className="absolute -bottom-3 -right-3 z-40 animate-cart-added" style={{background:'#22c55e', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px #22c55e55', border:'3px solid #fff'}}>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 8.5l3 3 5-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    )}
  </>
)}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded={isOpen}
              aria-label="Menüyü aç"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Menüyü aç</span>
              {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary-600 bg-primary-50/70'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-100 mt-2">
            <div className="px-4 py-3 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                <FiUser className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-700">Hesabım</p>
                <p className="text-xs text-neutral-500">Giriş Yap / Üye Ol</p>
              </div>
            </div>

            <Link 
              to="/sepet" 
              className="px-4 py-3 flex items-center justify-between bg-neutral-50 rounded-lg mx-2 my-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <FiShoppingCart className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium">Sepetim</span>
              </div>
              {cartItemCount > 0 && (
                <span className="bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
