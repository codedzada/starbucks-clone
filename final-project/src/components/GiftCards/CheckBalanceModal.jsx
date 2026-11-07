import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';

import FloatingInput from './FloatingInput';
import {
  checkBalanceSchema,
  checkBalanceInitialValues,
} from '../../validation/checkBalanceSchema';

const CheckBalanceModal = ({ isOpen, onClose }) => {
  const [mockBalance, setMockBalance] = useState(null);

  const formik = useFormik({
    initialValues: checkBalanceInitialValues,
    validationSchema: checkBalanceSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        const balance = (Math.random() * 80 + 10).toFixed(2);
        setMockBalance(balance);
      }, 1200);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setMockBalance(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/20"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col justify-between p-6 md:p-8 overflow-y-auto"
          >
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-black transition-colors p-2 cursor-pointer rounded-full hover:bg-black/5 flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="text-2xl font-bold text-[#212121] mb-3">Check balance</h2>
              <div className="w-full h-[3px] bg-[#d4e9e2] rounded-full mb-8" />

              {mockBalance === null ? (
                /* Form */
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <FloatingInput
                    id="cardNumber"
                    label="Card number"
                    maxLength="16"
                    {...formik.getFieldProps('cardNumber')}
                    error={formik.errors.cardNumber}
                    touched={formik.touched.cardNumber}
                    helperText={
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        No spaces or dashes
                      </p>
                    }
                  />

                  <FloatingInput
                    id="securityCode"
                    label="Security code"
                    type="password"
                    maxLength="8"
                    {...formik.getFieldProps('securityCode')}
                    error={formik.errors.securityCode}
                    touched={formik.touched.securityCode}
                  />

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="bg-[#212121] hover:bg-black disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 text-sm tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {formik.isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Checking...
                        </>
                      ) : (
                        'Check balance'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Balance Display */
                <div className="space-y-6 mt-4">
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-[#f1f8f5] flex items-center justify-center text-[#006241] mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#212121] mb-1">Balance Checked</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">
                      Card ending in ...{formik.values.cardNumber.slice(-4)}
                    </p>

                    <div className="bg-[#f1f8f5] px-8 py-6 rounded-2xl border border-[#d4e9e2] w-full max-w-[280px]">
                      <span className="text-xs font-semibold text-[#006241] uppercase tracking-wider block mb-1">
                        Current Balance
                      </span>
                      <span className="text-3xl font-extrabold text-[#1e3932] tracking-tight">
                        ${mockBalance}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full bg-[#006241] hover:bg-[#004d33] text-white font-semibold py-3.5 rounded-full transition-colors duration-200 text-sm tracking-wide shadow-md cursor-pointer"
                  >
                    Check another card
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckBalanceModal;