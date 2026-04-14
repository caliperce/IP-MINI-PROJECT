import { useState } from 'react';
import type { EventParticipation } from '../types';

const CARD_ACCENT_COLORS = [
  { top: '#FF5500', glow: 'rgba(255,85,0,0.35)' },
  { top: '#FF8C00', glow: 'rgba(255,140,0,0.35)' },
  { top: '#CC2200', glow: 'rgba(204,34,0,0.35)' },
  { top: '#E84E00', glow: 'rgba(232,78,0,0.35)' },
];

interface EventCardProps {
  event: EventParticipation;
  index: number;
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function getDayOfWeek(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'long' });
  } catch {
    return '';
  }
}

export default function EventCard({ event, index }: EventCardProps) {
  const [hovered, setHovered] = useState(false);
  const accent = CARD_ACCENT_COLORS[index % CARD_ACCENT_COLORS.length];

  return (
    <article
      className="relative rounded-xl overflow-hidden transition-all duration-500 cursor-default"
      style={{
        background: '#0f0f0f',
        border: `1px solid ${hovered ? 'rgba(255,85,0,0.25)' : 'rgba(255,85,0,0.08)'}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${accent.glow}`
          : '0 4px 20px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        animationDelay: `${index * 0.1}s`,
        animation: 'slide-up 0.5s ease-out forwards',
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${accent.top}, ${accent.top}80)`,
          boxShadow: hovered ? `0 0 20px ${accent.glow}` : 'none',
        }}
      />

      {/* Card content */}
      <div className="p-6 flex flex-col gap-5">
        {/* Event name + date column */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-lg leading-snug transition-all duration-300"
            style={{
              color: '#F5F0E8',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textShadow: hovered ? '0 0 20px rgba(255,85,0,0.3)' : 'none',
            }}
          >
            {event.eventName}
          </h3>

          {/* Date badge */}
          <div
            className="shrink-0 flex flex-col items-center px-3 py-2 rounded-lg"
            style={{
              background: 'rgba(255,85,0,0.08)',
              border: '1px solid rgba(255,85,0,0.15)',
              minWidth: '60px',
            }}
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: '#8A7A6A', fontWeight: 300, lineHeight: 1 }}
            >
              {getDayOfWeek(event.eventDate).slice(0, 3)}
            </span>
            <span
              className="text-2xl leading-tight"
              style={{ color: accent.top, fontWeight: 200 }}
            >
              {new Date(event.eventDate).getDate()}
            </span>
            <span
              className="text-xs"
              style={{ color: '#8A7A6A', fontWeight: 300 }}
            >
              {new Date(event.eventDate).toLocaleDateString('en-IN', {
                month: 'short',
              })}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#8A7A6A', fontWeight: 300, letterSpacing: '0.01em' }}
        >
          {event.eventDescription}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: 'rgba(255,85,0,0.08)' }}
        />

        {/* Meta info grid */}
        <div className="grid grid-cols-2 gap-4">
          <MetaItem
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11C6 11 9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1ZM6 5.75C5.31 5.75 4.75 5.19 4.75 4.5C4.75 3.81 5.31 3.25 6 3.25C6.69 3.25 7.25 3.81 7.25 4.5C7.25 5.19 6.69 5.75 6 5.75Z"
                  fill="currentColor"
                />
              </svg>
            }
            label="Location"
            value={event.eventLocation}
          />
          <MetaItem
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect
                  x="1.5"
                  y="2"
                  width="9"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M1.5 5H10.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M4 1V3M8 1V3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            }
            label="Date"
            value={formatDate(event.eventDate)}
          />
          <MetaItem
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle
                  cx="6"
                  cy="4"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M1.5 10.5C1.5 8.57 3.57 7 6 7C8.43 7 10.5 8.57 10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            }
            label="Student"
            value={event.studentName}
          />
          <MetaItem
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="10"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M4 6H8M4 8.5H6.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            }
            label="Roll Number"
            value={event.rollNumber}
          />
        </div>

        {/* Registered badge */}
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: '#FF5500',
              boxShadow: '0 0 6px rgba(255,85,0,0.8)',
            }}
          />
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: '#FF5500', fontWeight: 300, letterSpacing: '0.16em' }}
          >
            Registered
          </span>
        </div>
      </div>
    </article>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5" style={{ color: '#3D3530' }}>
        {icon}
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.14em' }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-sm"
        style={{ color: '#8A7A6A', fontWeight: 300, letterSpacing: '0.01em' }}
      >
        {value}
      </span>
    </div>
  );
}
