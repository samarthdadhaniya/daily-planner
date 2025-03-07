// src/components/SignupForm.js
import React, { useState } from 'react';
import { Button } from '@/components/ui-custom/Button';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook

const SignupForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth(); // Use the signup function from AuthContext

  const passwordStrength = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const strength = [minLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength === 0) return { label: "", color: "" };
    if (strength <= 2) return { label: "Weak", color: "text-red-500" };
    if (strength <= 4) return { label: "Medium", color: "text-yellow-500" };
    return { label: "Strong", color: "text-green-500" };
  };

  const { label: strengthLabel, color: strengthColor } = passwordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await signup(name, email, password);
      if (success) {
        if (onSuccess) onSuccess();
        navigate('/dashboard', { replace: true });
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className="input-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="input-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="input-primary pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">Password strength:</span>
              <span className={`text-xs font-medium ${strengthColor}`}>{strengthLabel}</span>
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < passwordStrength(password).label.length ?
                    (i < 2 ? 'bg-red-400' : i < 4 ? 'bg-yellow-400' : 'bg-green-400') :
                    'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <ul className="mt-3 space-y-1">
              <li className={`text-xs flex items-center ${password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`}>
                {password.length >= 8 ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1" />}
                At least 8 characters
              </li>
              <li className={`text-xs flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                {/[A-Z]/.test(password) ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1" />}
                At least one uppercase letter
              </li>
              <li className={`text-xs flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                {/[0-9]/.test(password) ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1" />}
                At least one number
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
          I agree to the <a href="#" className="text-primary hover:text-primary/80 transition-colors">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</a>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
};

export default SignupForm;
