import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from '../components/GiftCards/FloatingInput';
import { loginSchema } from '../validation/authSchema'; 
import CircularSpinner from '../components/common/CircularSpinner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      message.success('Welcome back! You have successfully signed in.');
      if (sessionStorage.getItem('pending_order')) {
        sessionStorage.removeItem('pending_order');
        navigate('/menu');
        setTimeout(() => window.dispatchEvent(new Event('order-confirmed')), 300);
      } else {
        navigate('/');
      }
    } catch (error) {
      message.error(error.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-[calc(100vh-100px)] bg-white flex flex-col items-center py-12 px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        className="text-[28px] sm:text-[32px] font-extrabold text-[#1e3932] tracking-tight text-center mb-8"
      >
        Sign in or create an account
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="w-full max-w-[540px] bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-8"
      >
        <p className="text-[13px] text-[#212121] mb-5">
          <span className="text-red-600 font-bold">*</span> indicates required field
        </p>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema} 
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form className="space-y-4" noValidate autoComplete="off">
              <FloatingInput
                id="login-email"
                name="email"
                label="Username or email address"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                required
                autoComplete="new-email"
              />

              <FloatingInput
                id="login-password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                required
                showPasswordToggle
                autoComplete="new-password"
              />

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="keepSignedIn"
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="mt-[2px] w-4 h-4 accent-[#006241] cursor-pointer flex-shrink-0 border border-gray-400 rounded"
                />
                <label htmlFor="keepSignedIn" className="text-[14px] text-[#212121] font-medium cursor-pointer select-none">
                  Keep me signed in.{' '}
                  <a href="#" className="font-bold underline text-[#212121] hover:text-[#006241] transition-colors duration-150">
                    Details
                  </a>
                </label>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <a href="#" className="text-[14px] font-bold text-[#1e3932] underline hover:text-[#006241] transition-colors duration-150 w-fit">
                  Forgot your username?
                </a>
                <a href="#" className="text-[14px] font-bold text-[#1e3932] underline hover:text-[#006241] transition-colors duration-150 w-fit">
                  Forgot your password?
                </a>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2.5 px-8 py-3 bg-[#006241] hover:bg-[#004d33] text-white font-bold text-[15px] rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CircularSpinner size="w-5 h-5" />
                        Signing in…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sign in
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-[540px] mt-10 text-center px-4"
      >
        <p className="text-[11px] font-bold tracking-[0.14em] text-[#006241] uppercase mb-3">
          Join Starbucks® Rewards
        </p>
        <p className="text-[14px] text-[#212121] leading-relaxed mb-6 max-w-[360px] mx-auto">
          As a member, start earning free food and drinks, unlock our best offers and celebrate your birthday with a treat from us. Best of all, it's free to join.
        </p>
        <Link
          to="/account/create"
          className="inline-flex items-center px-7 py-[9px] border-2 border-[#1e3932] text-[#1e3932] font-bold text-[14px] rounded-full hover:bg-[#1e3932] hover:text-white transition-all duration-200"
        >
          Join now
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Login;