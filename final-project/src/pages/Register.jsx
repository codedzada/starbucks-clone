import React from 'react';
import { Formik, Form } from 'formik';
import { message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from '../components/GiftCards/FloatingInput';
import { registerSchema } from '../validation/authSchema';
import { useRegisterForm } from '../hooks/useAuthForm';
import CircularSpinner from '../components/common/CircularSpinner';

const SectionHeading = ({ title }) => (
  <div className="pb-1 mb-5">
    <h2 className="text-[17px] font-bold text-[#212121] tracking-tight">{title}</h2>
    <div className="w-full h-[3px] bg-[#d4e9e2] rounded-full mt-2" />
  </div>
);

const TermsError = ({ error, touched }) =>
  touched && error ? (
    <div className="mt-1.5 flex items-center gap-1 text-xs text-red-500 font-medium leading-none">
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <span>{error}</span>
    </div>
  ) : null;

const Register = () => {
  const { initialValues, handleSubmit } = useRegisterForm();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-[calc(100vh-100px)] bg-white flex flex-col items-center py-12 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#1e3932] tracking-tight mb-4">
          Create an account
        </h1>
        <p className="text-[11px] font-bold tracking-[0.14em] text-[#006241] uppercase mb-2">
          Starbucks® Rewards
        </p>
        <p className="text-[14px] text-[#212121] max-w-[380px] mx-auto leading-relaxed">
          Join Starbucks Rewards to earn Stars for free food and drinks, any way you pay. Get access to mobile ordering, a birthday Reward, and{' '}
          <a href="#" className="underline text-[#212121] hover:text-[#006241] transition-colors duration-150">more</a>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="w-full max-w-[540px] bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-8"
      >
        <p className="text-[13px] text-[#212121] mb-6">
          <span className="text-red-600 font-bold">*</span> indicates required field
        </p>

        
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form className="space-y-5" noValidate autoComplete="off">
              <SectionHeading title="Personal Information" />

              <FloatingInput
                id="reg-firstName"
                name="firstName"
                label="First name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.firstName}
                touched={touched.firstName}
                required
                autoComplete="off"
              />

              <FloatingInput
                id="reg-lastName"
                name="lastName"
                label="Last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lastName}
                touched={touched.lastName}
                required
                autoComplete="off"
              />

              <div className="pt-2">
                <SectionHeading title="Account Security" />
              </div>

              <div>
                <FloatingInput
                  id="reg-email"
                  name="email"
                  label="Email address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  required
                  autoComplete="new-email"
                />
                {!(touched.email && errors.email) && (
                  <p className="mt-1.5 text-[13px] text-[#212121]">This will be your username</p>
                )}
              </div>

              <FloatingInput
                id="reg-password"
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

              <FloatingInput
                id="reg-confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                required
                showPasswordToggle
                autoComplete="new-password"
              />

              <div className="pt-2 space-y-3">
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#212121] uppercase">
                  Terms of Use
                </p>

                <div className="flex items-start gap-2.5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={values.agreeToTerms}
                    onChange={(e) => setFieldValue('agreeToTerms', e.target.checked)}
                    onBlur={handleBlur}
                    className="mt-[2px] w-4 h-4 accent-[#006241] cursor-pointer flex-shrink-0 border border-gray-400 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="text-[13px] text-[#212121] leading-relaxed cursor-pointer select-none">
                    <span className="text-red-600 font-bold">* </span>
                    I agree to the{' '}
                    <a href="#" className="text-[#006241] underline hover:text-[#004d33] transition-colors duration-150 font-medium">Starbucks® Rewards Terms</a>
                    {' '}and the{' '}
                    <a href="#" className="text-[#006241] underline hover:text-[#004d33] transition-colors duration-150 font-medium">Starbucks Card Terms</a>
                    {' '}and have read the{' '}
                    <a href="#" className="text-[#006241] underline hover:text-[#004d33] transition-colors duration-150 font-medium">Starbucks Privacy Statement</a>.
                  </label>
                </div>

                <TermsError error={errors.agreeToTerms} touched={touched.agreeToTerms} />
              </div>

              <p className="text-[13px] text-[#1e3932]/70 text-center pt-1">
                Already have an account?{' '}
                <Link to="/account/signin" className="font-bold text-[#006241] hover:text-[#004d33] transition-colors duration-200">
                  Sign in
                </Link>
              </p>

              <div className="flex justify-end pt-1">
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
                        Creating account…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Create account
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default Register;