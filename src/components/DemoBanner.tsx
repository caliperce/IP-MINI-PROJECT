interface DemoBannerProps {
  visible: boolean;
}

export default function DemoBanner({ visible }: DemoBannerProps) {
  if (!visible) return null;

  return (
    <div
      className="w-full flex items-center justify-center gap-3 py-3 px-4"
      style={{
        background: 'rgba(255,85,0,0.08)',
        border: '1px solid rgba(255,85,0,0.2)',
        borderRadius: '8px',
        marginBottom: '2rem',
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full animate-pulse"
        style={{
          background: '#FF5500',
          boxShadow: '0 0 8px rgba(255,85,0,0.8)',
        }}
      />
      <p
        className="text-xs uppercase tracking-widest"
        style={{ color: '#FF8C00', fontWeight: 300, letterSpacing: '0.16em' }}
      >
        Demo Mode — Backend not connected. Showing sample data.
      </p>
    </div>
  );
}
