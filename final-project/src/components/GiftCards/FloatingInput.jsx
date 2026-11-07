import React, { useState } from 'react';

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const FloatingInput = ({
  id,
  name,
  label,
  value = '',
  type = 'text',
  error,
  touched,
  required = true,
  maxLength,
  helperText,
  showPasswordToggle = false,
  onChange,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = touched && !!error;
  const isFloating = isFocused || (value != null && String(value).length > 0);

  // Determine actual input type
  const inputType = showPasswordToggle
    ? showPassword ? 'text' : 'password'
    : type;

  return (
    <div className="w-full">
      <div
        className={`relative rounded-lg transition-all duration-200 ${
          hasError
            ? 'border-2 border-red-500 bg-[#faebe8]'
            : isFocused
              ? 'border-2 border-[#006241] bg-[#EFF7F0]'
              : 'border border-gray-400 bg-white hover:border-gray-500'
        }`}
      >
        <input
          id={id}
          name={name || id}
          type={inputType}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
            if (props.onBlur) props.onBlur(e);
          }}
          {...props}
          // Override onChange/onBlur from spread if passed explicitly
          className={`w-full h-[56px] bg-transparent border-none outline-none text-base text-black font-semibold transition-all ${
            showPasswordToggle ? 'px-4 pr-12 pt-5 pb-1' : 'px-4 pt-5 pb-1'
          }`}
        />

        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none origin-[0_0] ${
            isFloating
              ? 'top-0 -translate-y-1/2 text-xs px-1.5 font-semibold bg-white'
              : 'top-1/2 -translate-y-1/2 text-base font-normal'
          } ${
            hasError
              ? 'text-red-500'
              : isFocused
                ? 'text-[#006241]'
                : 'text-gray-500'
          }`}
        >
          {required && (
            <span className={hasError ? 'text-red-500' : 'text-[#006241]'}>
              *{' '}
            </span>
          )}
          {label}
        </label>

        {/* Password visibility toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors duration-150 ${
              hasError
                ? 'text-red-400 hover:text-red-600'
                : isFocused
                  ? 'text-[#006241] hover:text-[#004d33]'
                  : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>

      {hasError && (
        <div className="mt-1.5 flex items-center gap-1 text-xs text-red-500 font-medium leading-none">
          <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {helperText && <div className="mt-1.5">{helperText}</div>}
    </div>
  );
};

export default FloatingInput;