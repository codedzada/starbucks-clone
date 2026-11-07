import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AuthGuardModal = ({
  isOpen,
  onClose,
  title = 'Sign in to continue',
  description = 'You need a Starbucks account to complete your gift card purchase. Sign in or create a free account to proceed.',
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    navigate('/login');
  };

  const handleRegister = () => {
    onClose();
    navigate('/register');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Green accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#006241] via-[#00a862] to-[#006241]" />

            <div className="p-8 sm:p-10">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-black/5 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#f1f8f5] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#006241]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-[#1e3932] text-center tracking-tight mb-2">
                {title}
              </h2>
              <p className="text-sm text-gray-500 text-center leading-relaxed mb-8">
                {description}
              </p>

              {/* Divider */}
              <div className="w-full h-[2px] bg-[#d4e9e2] rounded-full mb-8" />

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  id="auth-guard-signin-btn"
                  type="button"
                  onClick={handleSignIn}
                  className="w-full py-3.5 bg-[#006241] hover:bg-[#004d33] active:scale-[0.98] text-white font-bold text-sm rounded-full shadow-md shadow-[#006241]/20 transition-all duration-150 cursor-pointer"
                >
                  Sign In
                </button>

                <button
                  id="auth-guard-register-btn"
                  type="button"
                  onClick={handleRegister}
                  className="w-full py-3.5 bg-transparent border-2 border-[#006241] hover:bg-[#006241]/5 active:scale-[0.98] text-[#006241] font-bold text-sm rounded-full transition-all duration-150 cursor-pointer"
                >
                  Create Account
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">
                By continuing, you agree to the{' '}
                <span className="text-[#006241] font-semibold cursor-pointer hover:underline">
                  Starbucks Terms of Use
                </span>{' '}
                and{' '}
                <span className="text-[#006241] font-semibold cursor-pointer hover:underline">
                  Privacy Policy
                </span>.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthGuardModal;
