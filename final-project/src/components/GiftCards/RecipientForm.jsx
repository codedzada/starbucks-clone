import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from './FloatingInput';

const RecipientForm = ({
  recipients,
  errors = [],
  touched = [],
  onAdd,
  onRemove,
  onChangeField,
  onBlur,
}) => {
  const maxRecipients = 10;

  return (
    <div className="space-y-6">
      {/* Title with bottom divider */}
      <div className="pb-1">
        <h3 className="text-xl font-bold text-[#212121] tracking-tight">Who are you gifting to?</h3>
        <div className="w-full h-[3px] bg-[#d4e9e2] rounded-full mt-2 mb-6" />
      </div>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {recipients.map((recipient, index) => {
            const recErrors = (Array.isArray(errors) ? errors[index] : {}) || {};
            const recTouched = (Array.isArray(touched) ? touched[index] : {}) || {};

            return (
              <motion.div
                key={recipient.id || index}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 my-1 relative">
                  {/* Recipient Item header with trash icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#006241] uppercase tracking-wider">
                      Recipient {index + 1}
                    </span>
                    {recipients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="text-black hover:text-red-600 transition-colors p-1 cursor-pointer"
                        aria-label={`Remove recipient ${index + 1}`}
                      >
                        <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Recipient Name and Email fields */}
                  <div className="space-y-4">
                    <FloatingInput
                      id={`rec-name-${index}`}
                      name={`recipients[${index}].name`}
                      label="Recipient Name"
                      value={recipient.name}
                      onChange={(e) => onChangeField(index, 'name', e.target.value)}
                      onBlur={onBlur}
                      error={recErrors.name}
                      touched={recTouched.name}
                      required={true}
                    />

                    <FloatingInput
                      id={`rec-email-${index}`}
                      name={`recipients[${index}].email`}
                      label="Recipient Email"
                      type="email"
                      value={recipient.email}
                      onChange={(e) => onChangeField(index, 'email', e.target.value)}
                      onBlur={onBlur}
                      error={recErrors.email}
                      touched={recTouched.email}
                      required={true}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Actions & Help Text */}
      <div className="flex flex-col items-center space-y-4 pt-2">
        {recipients.length < maxRecipients && (
          <button
            type="button"
            onClick={onAdd}
            className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2 font-bold text-sm transition-all duration-200 cursor-pointer shadow-md"
          >
            + Add another recipient
          </button>
        )}

        {/* Muted centered help text */}
        <div className="text-[13px] text-gray-500 font-normal text-center select-none pt-1">
          Maximum of 10 recipients
        </div>
      </div>
    </div>
  );
};

export default RecipientForm;
