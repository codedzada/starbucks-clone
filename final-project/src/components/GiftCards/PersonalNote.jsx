import React, { useState } from 'react';

const PersonalNote = ({ value = '', error, touched, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 160;

  const hasError = touched && !!error;
  const isFloating = isFocused || value.length > 0;

  const handleTextareaChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      onChange(e);
    }
  };

  return (
    <div className="space-y-2">
      {/* Prominent heading with light green underline */}
      <div className="pb-1">
        <h3 className="text-xl font-bold text-[#212121] tracking-tight">Personal note (optional)</h3>
        <div className="w-full h-[3px] bg-[#d4e9e2] rounded-full mt-2 mb-6" />
      </div>

      <div className="w-full relative mt-4">
        <div
          className={`relative rounded-lg transition-all duration-200 ${
            hasError
              ? 'border-2 border-red-500 bg-[#faebe8]'
              : isFocused
                ? 'border-2 border-[#006241] bg-[#EFF7F0]'
                : 'border border-gray-400 bg-white hover:border-gray-500'
          }`}
        >
          <textarea
            id="personalNote"
            name="personalNote"
            value={value}
            maxLength={maxLength}
            onChange={handleTextareaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            className="w-full min-h-[100px] max-h-[200px] px-4 pt-6 pb-2 bg-transparent border-none outline-none text-base text-black font-semibold resize-y block transition-all"
            {...props}
          />

          <label
            htmlFor="personalNote"
            className={`absolute left-4 transition-all duration-200 pointer-events-none origin-[0_0] ${
              isFloating
                ? 'top-0 -translate-y-1/2 text-xs px-1.5 font-semibold bg-white'
                : 'top-4 text-base font-normal'
            } ${
              hasError
                ? 'text-red-500'
                : isFocused
                  ? 'text-[#006241]'
                  : 'text-gray-500'
            }`}
          >
            Personal message
          </label>
        </div>

        <div className="flex justify-between items-center mt-1 px-1">
          <div>
            {hasError && (
              <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
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
          </div>
          <span className="text-xs text-gray-500 font-semibold select-none ml-auto">
            {value.length} / {maxLength} characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalNote;
