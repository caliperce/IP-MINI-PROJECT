import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('studentData') !== null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('studentData');
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/register', label: 'Register' },
    { to: '/login', label: 'Login' },
    ...(isLoggedIn ? [{ to: '/events', label: 'My Events' }] : []),
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(8,8,8,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,85,0,0.12)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 30px rgba(0,0,0,0.5)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #FF5500, #CC2200)',
              boxShadow: '0 0 16px rgba(255,85,0,0.5)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="7" r="3" fill="white" />
              <circle
                cx="7"
                cy="7"
                r="6"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
          <span
            className="text-lg tracking-widest uppercase transition-all duration-300 group-hover:text-glow-sm"
            style={{
              color: '#F5F0E8',
              fontWeight: 200,
              letterSpacing: '0.2em',
            }}
          >
            EventHub
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm uppercase tracking-widest transition-all duration-300 relative group"
              style={{
                color:
                  location.pathname === link.to
                    ? '#FF5500'
                    : '#8A7A6A',
                fontWeight: 300,
                letterSpacing: '0.18em',
                textDecoration: 'none',
                textShadow:
                  location.pathname === link.to
                    ? '0 0 12px rgba(255,85,0,0.7)'
                    : 'none',
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                style={{
                  width: location.pathname === link.to ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #FF5500, transparent)',
                }}
              />
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-full"
                style={{
                  width: '0%',
                  background: 'linear-gradient(90deg, #FF8C00, transparent)',
                }}
              />
            </Link>
          ))}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-sm uppercase tracking-widest transition-all duration-300 px-4 py-2 rounded"
              style={{
                color: '#F5F0E8',
                fontWeight: 300,
                letterSpacing: '0.18em',
                border: '1px solid rgba(255,85,0,0.3)',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,85,0,0.7)';
                e.currentTarget.style.boxShadow =
                  '0 0 16px rgba(255,85,0,0.3)';
                e.currentTarget.style.color = '#FF5500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,85,0,0.3)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = '#F5F0E8';
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: '#FF5500',
                boxShadow: '0 0 6px rgba(255,85,0,0.6)',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'rotate(45deg) translate(4px, 4px)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'rotate(-45deg) translate(4px, -4px)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(8,8,8,0.98)',
          borderTop: menuOpen ? '1px solid rgba(255,85,0,0.12)' : 'none',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm uppercase tracking-widest"
              style={{
                color:
                  location.pathname === link.to ? '#FF5500' : '#8A7A6A',
                fontWeight: 300,
                letterSpacing: '0.18em',
                textDecoration: 'none',
                textShadow:
                  location.pathname === link.to
                    ? '0 0 12px rgba(255,85,0,0.7)'
                    : 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-sm uppercase tracking-widest text-left"
              style={{
                color: '#8A7A6A',
                fontWeight: 300,
                letterSpacing: '0.18em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
