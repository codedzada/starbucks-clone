import React from 'react';
import FloatingInput from './FloatingInput';

const SenderInfo = ({
  values,
  errors = {},
  touched = {},
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-4">
      {/* Prominent heading with light green underline */}
      <div className="pb-1">
        <h3 className="text-xl font-bold text-[#212121] tracking-tight">From</h3>
        <div className="w-full h-[3px] bg-[#d4e9e2] rounded-full mt-2 mb-6" />
      </div>

      <div className="space-y-4">
        <FloatingInput
          id="senderName"
          name="senderName"
          label="Sender name"
          value={values.senderName}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.senderName}
          touched={touched.senderName}
          required={true}
        />

        <FloatingInput
          id="senderEmail"
          name="senderEmail"
          label="Sender email"
          type="email"
          value={values.senderEmail}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.senderEmail}
          touched={touched.senderEmail}
          required={true}
        />
      </div>
    </div>
  );
};

export default SenderInfo;
