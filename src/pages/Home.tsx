import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: '#080808' }}
    >
      {/* Ambient glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,85,0,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(204,34,0,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,85,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,85,0,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Hero section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #FF5500)' }}
          />
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: '#FF5500', fontWeight: 300, letterSpacing: '0.22em' }}
          >
            Student Event Management
          </span>
          <span
            className="inline-block w-8 h-px"
            style={{ background: 'linear-gradient(90deg, #FF5500, transparent)' }}
          />
        </div>

        {/* Main headline */}
        <h1
          className={`text-center mb-6 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionDelay: '0.2s',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 200,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: '#F5F0E8',
            maxWidth: '900px',
          }}
        >
          Your Campus.{' '}
          <span
            style={{
              color: '#FF5500',
              textShadow:
                '0 0 20px rgba(255,85,0,0.9), 0 0 60px rgba(255,85,0,0.4), 0 0 100px rgba(255,85,0,0.15)',
            }}
          >
            Your Events.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-center mb-12 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionDelay: '0.35s',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: 300,
            color: '#8A7A6A',
            maxWidth: '560px',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          Register for college events, track your participation, and stay
          connected with everything happening on campus.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          <Link to="/register">
            <button
              className="px-10 py-4 text-sm uppercase tracking-widest rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #FF5500 0%, #CC2200 100%)',
                border: 'none',
                color: '#F5F0E8',
                fontFamily: 'inherit',
                fontWeight: 300,
                letterSpacing: '0.18em',
                cursor: 'pointer',
                boxShadow:
                  '0 0 24px rgba(255,85,0,0.4), 0 4px 20px rgba(0,0,0,0.4)',
                minWidth: '200px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 40px rgba(255,85,0,0.6), 0 8px 30px rgba(0,0,0,0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 24px rgba(255,85,0,0.4), 0 4px 20px rgba(0,0,0,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button
              className="px-10 py-4 text-sm uppercase tracking-widest rounded-lg transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,85,0,0.3)',
                color: '#F5F0E8',
                fontFamily: 'inherit',
                fontWeight: 300,
                letterSpacing: '0.18em',
                cursor: 'pointer',
                minWidth: '200px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,85,0,0.7)';
                e.currentTarget.style.boxShadow =
                  '0 0 20px rgba(255,85,0,0.2)';
                e.currentTarget.style.color = '#FF5500';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,85,0,0.3)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = '#F5F0E8';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Sign In
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-20 flex flex-col items-center gap-2 transition-all duration-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.2em' }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8 animate-pulse"
            style={{ background: 'linear-gradient(180deg, rgba(255,85,0,0.4), transparent)' }}
          />
        </div>
      </section>

      {/* Features section */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <span
              className="h-px flex-1"
              style={{ background: 'rgba(255,85,0,0.12)' }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.22em' }}
            >
              Features
            </span>
            <span
              className="h-px flex-1"
              style={{ background: 'rgba(255,85,0,0.12)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section
        className="border-t border-b px-6 py-12"
        style={{
          borderColor: 'rgba(255,85,0,0.08)',
          background: '#0a0a0a',
        }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span
                className="text-3xl sm:text-4xl"
                style={{
                  color: '#FF5500',
                  fontWeight: 200,
                  textShadow:
                    '0 0 16px rgba(255,85,0,0.7), 0 0 32px rgba(255,85,0,0.3)',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs uppercase tracking-widest text-center"
                style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.18em' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 flex items-center justify-center">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.2em' }}
        >
          EventHub — Student Event Management System
        </p>
      </footer>
    </main>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="3"
          width="16"
          height="15"
          rx="2"
          stroke="#FF5500"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M2 8H18" stroke="#FF5500" strokeWidth="1.5" />
        <path
          d="M7 1V5M13 1V5"
          stroke="#FF5500"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#FF5500" />
      </svg>
    ),
    title: 'Event Registration',
    desc: 'Browse and register for campus events with a single click. Track all upcoming events in one dashboard.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle
          cx="10"
          cy="7"
          r="4"
          stroke="#FF5500"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M3 17C3 14.24 6.13 12 10 12C13.87 12 17 14.24 17 17"
          stroke="#FF5500"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    title: 'Student Profile',
    desc: 'Maintain your academic profile with roll number and contact details. Secure and private.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L12.09 7.26L18 8.27L14 12.14L14.99 18L10 15.27L5.01 18L6 12.14L2 8.27L7.91 7.26L10 2Z"
          stroke="#FF5500"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Participation Tracking',
    desc: 'View your complete event history. Know exactly where you have been and what achievements you have earned.',
  },
];

const STATS = [
  { value: '500+', label: 'Students' },
  { value: '120+', label: 'Events' },
  { value: '1,200+', label: 'Registrations' },
];

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof FEATURES)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl p-6 transition-all duration-400"
      style={{
        background: hovered ? '#111111' : '#0d0d0d',
        border: `1px solid ${hovered ? 'rgba(255,85,0,0.2)' : 'rgba(255,85,0,0.07)'}`,
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(255,85,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
        style={{
          background: 'rgba(255,85,0,0.08)',
          border: '1px solid rgba(255,85,0,0.15)',
          boxShadow: hovered ? '0 0 20px rgba(255,85,0,0.2)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {feature.icon}
      </div>
      <h3
        className="mb-3"
        style={{
          color: '#F5F0E8',
          fontWeight: 300,
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
        }}
      >
        {feature.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: '#8A7A6A', fontWeight: 300, letterSpacing: '0.01em' }}
      >
        {feature.desc}
      </p>
    </div>
  );
}
