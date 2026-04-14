import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import DemoBanner from '../components/DemoBanner';
import { registerStudent } from '../services/api';
import type { ApiStatus } from '../types';

interface FormData {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  rollNumber?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.rollNumber.trim()) errors.rollNumber = 'Roll number is required';
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address';
  if (!data.password || data.password.length < 6)
    errors.password = 'Password must be at least 6 characters';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';
  return errors;
}

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    rollNumber: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [apiError, setApiError] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setStatus('loading');
    setApiError('');
    setIsDemo(false);

    const result = await registerStudent({
      rollNumber: formData.rollNumber,
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.isDemo) {
      // Backend not connected — simulate success
      setIsDemo(true);
      setStatus('success');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (result.error) {
      setApiError(result.error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative"
      style={{ background: '#080808' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 20%, rgba(255,85,0,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className="h-px w-12"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,85,0,0.4))' }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: '#FF5500', fontWeight: 300, letterSpacing: '0.22em' }}
            >
              Create Account
            </span>
            <span
              className="h-px w-12"
              style={{ background: 'linear-gradient(90deg, rgba(255,85,0,0.4), transparent)' }}
            />
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              fontWeight: 200,
              color: '#F5F0E8',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Student
            <br />
            <span
              style={{
                color: '#FF5500',
                textShadow:
                  '0 0 20px rgba(255,85,0,0.7), 0 0 40px rgba(255,85,0,0.3)',
              }}
            >
              Registration
            </span>
          </h1>
        </div>

        {/* Demo banner */}
        <DemoBanner visible={isDemo} />

        {/* Success state */}
        {status === 'success' && (
          <div
            className="mb-6 p-4 rounded-xl flex items-center gap-3"
            style={{
              background: 'rgba(255,85,0,0.08)',
              border: '1px solid rgba(255,85,0,0.25)',
              boxShadow: '0 0 20px rgba(255,85,0,0.1)',
            }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(255,85,0,0.2)',
                border: '1px solid rgba(255,85,0,0.4)',
              }}
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="#FF5500"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p
              className="text-sm"
              style={{ color: '#F5F0E8', fontWeight: 300 }}
            >
              {isDemo
                ? 'Demo: Registration simulated. Redirecting to login...'
                : 'Registration successful. Redirecting to login...'}
            </p>
          </div>
        )}

        {/* API error */}
        {apiError && (
          <div
            className="mb-6 p-4 rounded-xl"
            style={{
              background: 'rgba(204,34,0,0.08)',
              border: '1px solid rgba(204,34,0,0.3)',
            }}
          >
            <p className="text-sm" style={{ color: '#FF6B6B', fontWeight: 300 }}>
              {apiError}
            </p>
          </div>
        )}

        {/* Form card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#0f0f0f',
            border: '1px solid rgba(255,85,0,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <FormInput
              id="rollNumber"
              label="Roll Number"
              type="text"
              placeholder="CS2024001"
              value={formData.rollNumber}
              onChange={handleChange('rollNumber')}
              error={errors.rollNumber}
              autoComplete="off"
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="12"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M4 5H10M4 7.5H8M4 10H6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />

            <FormInput
              id="name"
              label="Full Name"
              type="text"
              placeholder="Aishwarya Sharma"
              value={formData.name}
              onChange={handleChange('name')}
              error={errors.name}
              autoComplete="name"
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle
                    cx="7"
                    cy="5"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M1.5 12.5C1.5 10.57 4.07 9 7 9C9.93 9 12.5 10.57 12.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              }
            />

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@college.edu"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              autoComplete="email"
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="1"
                    y="3"
                    width="12"
                    height="9"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M1 4L7 8.5L13 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />

            <div className="relative">
              <FormInput
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                autoComplete="new-password"
                icon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect
                      x="3"
                      y="6"
                      width="8"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <path
                      d="M4.5 6V4.5C4.5 3.12 5.62 2 7 2C8.38 2 9.5 3.12 9.5 4.5V6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-4 transition-colors duration-200"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#3D3530',
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5500')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3D3530')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8C2 8 4.5 3.5 8 3.5C11.5 3.5 14 8 14 8C14 8 11.5 12.5 8 12.5C4.5 12.5 2 8 2 8Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <path
                      d="M2 2L14 14"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8C2 8 4.5 3.5 8 3.5C11.5 3.5 14 8 14 8C14 8 11.5 12.5 8 12.5C4.5 12.5 2 8 2 8Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                  </svg>
                )}
              </button>
            </div>

            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              autoComplete="new-password"
              icon={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7.5L5.5 11L12 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />

            <div className="mt-2">
              <Button type="submit" loading={status === 'loading'}>
                {status === 'loading' ? 'Creating Account' : 'Create Account'}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <span
              className="h-px flex-1"
              style={{ background: 'rgba(255,85,0,0.08)' }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: '#3D3530', fontWeight: 300, letterSpacing: '0.16em' }}
            >
              or
            </span>
            <span
              className="h-px flex-1"
              style={{ background: 'rgba(255,85,0,0.08)' }}
            />
          </div>

          <p
            className="text-center text-sm"
            style={{ color: '#8A7A6A', fontWeight: 300 }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="transition-all duration-200"
              style={{
                color: '#FF5500',
                textDecoration: 'none',
                textShadow: '0 0 8px rgba(255,85,0,0)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.textShadow =
                  '0 0 8px rgba(255,85,0,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.textShadow =
                  '0 0 8px rgba(255,85,0,0)';
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
