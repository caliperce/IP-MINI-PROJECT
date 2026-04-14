import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import DemoBanner from '../components/DemoBanner';
import { getStudentEvents, MOCK_EVENTS } from '../services/api';
import type { EventParticipation, LoginResponse, ApiStatus } from '../types';

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventParticipation[]>([]);
  const [status, setStatus] = useState<ApiStatus>('loading');
  const [isDemo, setIsDemo] = useState(false);
  const [student, setStudent] = useState<LoginResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const raw = sessionStorage.getItem('studentData');
    if (!raw) {
      navigate('/login');
      return;
    }

    const parsed = JSON.parse(raw) as LoginResponse;
    setStudent(parsed);

    const demoMode = sessionStorage.getItem('demoMode') === 'true';

    const fetchEvents = async () => {
      if (demoMode) {
        // Immediately show mock data in demo mode
        setIsDemo(true);
        setEvents(MOCK_EVENTS);
        setStatus('success');
        return;
      }

      setStatus('loading');
      const result = await getStudentEvents(parsed.rollNumber);

      if (result.isDemo) {
        setIsDemo(true);
        setEvents(MOCK_EVENTS);
        setStatus('success');
        return;
      }

      if (result.error) {
        setError(result.error);
        setStatus('error');
        return;
      }

      setEvents(result.data ?? []);
      setStatus('success');
    };

    void fetchEvents();
  }, [navigate]);

  if (status === 'loading') {
    return <LoadingView />;
  }

  if (status === 'error') {
    return <ErrorView message={error} onRetry={() => setStatus('loading')} />;
  }

  return (
    <main
      className="min-h-screen pt-24 pb-20 px-6 relative"
      style={{ background: '#080808' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,85,0,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="h-px w-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,85,0,0.4))' }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: '#FF5500', fontWeight: 300, letterSpacing: '0.22em' }}
            >
              Event Participation
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 200,
                  color: '#F5F0E8',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.05,
                }}
              >
                {student?.name
                  ? `${student.name.split(' ')[0]}'s`
                  : 'Your'}{' '}
                <span
                  style={{
                    color: '#FF5500',
                    textShadow:
                      '0 0 16px rgba(255,85,0,0.7), 0 0 40px rgba(255,85,0,0.3)',
                  }}
                >
                  Events
                </span>
              </h1>
              {student && (
                <p
                  className="mt-2 text-sm"
                  style={{ color: '#8A7A6A', fontWeight: 300, letterSpacing: '0.02em' }}
                >
                  Roll No: {student.rollNumber} &nbsp;·&nbsp; {student.email}
                </p>
              )}
            </div>

            {/* Stats pill */}
            <div
              className="shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{
                background: '#0f0f0f',
                border: '1px solid rgba(255,85,0,0.12)',
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: '#FF5500',
                  boxShadow: '0 0 8px rgba(255,85,0,0.8)',
                }}
              />
              <span
                className="text-sm"
                style={{ color: '#F5F0E8', fontWeight: 300 }}
              >
                {events.length}{' '}
                <span style={{ color: '#8A7A6A' }}>
                  {events.length === 1 ? 'event' : 'events'} registered
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Demo banner */}
        <DemoBanner visible={isDemo} />

        {/* Events grid */}
        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <EventCard
                key={event.id ?? `${event.eventName}-${index}`}
                event={event}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Bottom metadata strip */}
        {events.length > 0 && (
          <div
            className="mt-12 pt-8 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,85,0,0.08)' }}
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.2em' }}
            >
              EventHub — Student Management System
            </span>
            {isDemo && (
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.18em' }}
              >
                Sample Data
              </span>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function LoadingView() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#080808' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning ring */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border border-transparent animate-spin"
            style={{ borderTopColor: '#FF5500', borderRightColor: 'rgba(255,85,0,0.3)' }}
          />
          <div
            className="absolute inset-2 rounded-full border border-transparent animate-spin"
            style={{
              borderBottomColor: '#CC2200',
              animationDirection: 'reverse',
              animationDuration: '0.8s',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 20px rgba(255,85,0,0.3)' }}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-sm uppercase tracking-widest animate-pulse"
            style={{ color: '#FF5500', fontWeight: 300, letterSpacing: '0.22em' }}
          >
            Loading Events
          </p>
          <p
            className="text-xs"
            style={{ color: '#3D3530', fontWeight: 300 }}
          >
            Fetching your registrations...
          </p>
        </div>
      </div>
    </main>
  );
}

function EmptyState() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center py-24 rounded-2xl"
      style={{
        background: '#0f0f0f',
        border: '1px solid rgba(255,85,0,0.07)',
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{
          background: 'rgba(255,85,0,0.06)',
          border: '1px solid rgba(255,85,0,0.15)',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="3"
            stroke="#FF5500"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M3 9H21" stroke="#FF5500" strokeWidth="1.5" />
          <path
            d="M8 2V6M16 2V6"
            stroke="#FF5500"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3
        className="mb-3"
        style={{ color: '#F5F0E8', fontWeight: 300, fontSize: '1.25rem' }}
      >
        No events registered
      </h3>
      <p
        className="text-sm mb-8 text-center max-w-xs"
        style={{ color: '#8A7A6A', fontWeight: 300, lineHeight: 1.7 }}
      >
        You have not registered for any events yet. Contact your administrator
        to get enrolled.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 text-sm uppercase tracking-widest rounded-lg transition-all duration-300"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,85,0,0.3)',
          color: '#F5F0E8',
          fontFamily: 'inherit',
          fontWeight: 300,
          letterSpacing: '0.18em',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,85,0,0.7)';
          e.currentTarget.style.color = '#FF5500';
          e.currentTarget.style.boxShadow = '0 0 16px rgba(255,85,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,85,0,0.3)';
          e.currentTarget.style.color = '#F5F0E8';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#080808' }}
    >
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(204,34,0,0.08)',
            border: '1px solid rgba(204,34,0,0.3)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#CC2200"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 8V12M12 16H12.01"
              stroke="#CC2200"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <h3
            className="mb-2"
            style={{ color: '#F5F0E8', fontWeight: 300, fontSize: '1.25rem' }}
          >
            Failed to load events
          </h3>
          <p
            className="text-sm"
            style={{ color: '#8A7A6A', fontWeight: 300, lineHeight: 1.6 }}
          >
            {message}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="px-8 py-3 text-sm uppercase tracking-widest rounded-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #FF5500, #CC2200)',
            border: 'none',
            color: '#F5F0E8',
            fontFamily: 'inherit',
            fontWeight: 300,
            letterSpacing: '0.18em',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255,85,0,0.3)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 40px rgba(255,85,0,0.5)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 20px rgba(255,85,0,0.3)')
          }
        >
          Retry
        </button>
      </div>
    </main>
  );
}
