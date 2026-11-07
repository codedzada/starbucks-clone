import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from './FloatingInput';

const AmountSelector = ({
  value,
  isCustom,
  customValue,
  error,
  touched,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectChange = (e) => {
    const val = e.target.value;
    if (val === 'custom') {
      onChange({
        amount: '',
        isCustom: true,
        customAmount: '',
      });
    } else {
      onChange({
        amount: Number(val),
        isCustom: false,
        customAmount: '',
      });
    }
  };

  const handleCustomInputChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
      onChange({
        amount: val,
        isCustom: true,
        customAmount: val,
      });
    }
  };

  const selectValue = isCustom ? 'custom' : value;

  return (
    <div className="space-y-4">
      <div
        className={`relative rounded-lg transition-all duration-200 border bg-white ${
          isFocused
            ? 'border-2 border-[#006241] bg-[#EFF7F0]'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <select
          id="giftAmountSelect"
          value={selectValue}
          onChange={handleSelectChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-[56px] px-4 pt-5 pb-1 bg-transparent border-none outline-none text-base text-black font-semibold appearance-none cursor-pointer"
        >
          <option value="" disabled>Select amount</option>
          <option value="10">$10</option>
          <option value="15">$15</option>
          <option value="25">$25</option>
          <option value="50">$50</option>
          <option value="100">$100</option>
          <option value="custom">Custom Amount</option>
        </select>

        <label
          htmlFor="giftAmountSelect"
          className={`absolute left-4 transition-all duration-200 pointer-events-none origin-[0_0] top-0 -translate-y-1/2 text-xs px-1.5 font-semibold bg-white ${
            isFocused || selectValue ? 'text-[#006241]' : 'text-gray-500'
          }`}
        >
          <span className="text-[#006241]">* </span>
          Select gift amount
        </label>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#006241] flex items-center">
          <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isCustom && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="py-1">
              <FloatingInput
                id="customAmount"
                label="Enter custom dollar amount"
                value={customValue || ''}
                onChange={handleCustomInputChange}
                error={error}
                touched={touched}
                required={true}
                type="text"
                inputMode="decimal"
                
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AmountSelector;