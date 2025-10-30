import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log('✅ Already authenticated, redirecting to dashboard');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await login(credentials);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-text-dark-heading font-mono tracking-tighter mb-2">
            DemoHub Admin
          </h1>
          <p className="text-text-dark-body">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <div className="bg-surface-dark border border-white/10 rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="admin@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-dark-body/70 mt-6">
          © 2024 Bilal Abic. All Rights Reserved. ADMIN_EMAIL=admin@demohub.com
          ADMIN_PASSWORD=ChangeThisPassword123! 
        </p>
      </div>
    </div>
  );
}

