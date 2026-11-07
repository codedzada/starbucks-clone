import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccessModal = ({ isOpen, onClose, orderDetails }) => {
  const navigate = useNavigate();
  if (!orderDetails) return null;

  const {
    cardImage,
    cardAlt,
    amount,
    recipients,
    personalNote,
    senderName,
    senderEmail,
    total,
  } = orderDetails;

  // Backdrop (arxa fon) kliklənəndə sadəcə modal bağlansın, səhifə dəyişməsin
  const handleBackdropClick = () => {
    onClose();
  };

  // Yalnız "Back to Gift Cards" düyməsinə basanda səhifə dəyişsin
  const handleNavigateToGiftCards = () => {
    onClose();
    navigate('/giftcards');
  };

  const transactionId = React.useMemo(() => {
    return 'SBX-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }, []);

  const formattedDate = React.useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Success Top Accent */}
            <div className="bg-[#006241] px-6 py-8 text-white text-center relative flex-shrink-0">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Order Placed Successfully!</h2>
              <p className="text-white/80 text-sm mt-1">Thank you for sharing the Starbucks experience.</p>
            </div>

            {/* Content Scroll Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
              {/* Receipt Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-4 text-sm text-gray-500 gap-2">
                <div>
                  <span className="font-semibold text-gray-800">Transaction ID:</span> {transactionId}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Date:</span> {formattedDate}
                </div>
              </div>

              {/* Side-by-Side Card and Total */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 flex justify-center">
                  <div className="relative w-full max-w-[260px] aspect-[1.58/1] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <img
                      src={cardImage}
                      alt={cardAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-[#212121] shadow-sm">
                      ${parseFloat(amount).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 space-y-3">
                  <div className="bg-[#EFF7F0] p-4 rounded-2xl border border-[#d4e9e2] text-center md:text-left">
                    <div className="text-xs text-[#006241] uppercase tracking-wider font-bold">Total Charged</div>
                    <div className="text-3xl font-extrabold text-[#212121] mt-0.5">${parseFloat(total).toFixed(2)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {recipients.length} {recipients.length === 1 ? 'Recipient' : 'Recipients'} &times; ${parseFloat(amount).toFixed(2)} each
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Sender & Recipients Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-bold text-gray-800 uppercase tracking-wide text-xs mb-3 text-[#006241]">Sender Information</h3>
                  <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                    <div className="font-bold text-gray-800">{senderName}</div>
                    <div className="text-gray-500 text-xs">{senderEmail}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 uppercase tracking-wide text-xs mb-3 text-[#006241]">
                    Recipients ({recipients.length})
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-2xl max-h-48 overflow-y-auto space-y-3 divide-y divide-gray-200/60">
                    {recipients.map((rec, index) => (
                      <div key={index} className={`${index > 0 ? 'pt-2' : ''} flex flex-col`}>
                        <div className="font-bold text-gray-800 flex items-center justify-between">
                          <span>{rec.name}</span>
                          <span className="text-xs text-[#006241] font-semibold bg-white border border-[#006241]/20 px-1.5 py-0.5 rounded-full">
                            Recipient {index + 1}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs">{rec.email}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Note */}
              {personalNote && (
                <div className="bg-[#EFF7F0]/40 p-4 rounded-2xl border border-[#d4e9e2]/60">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-[#006241] mb-2">Personal Message</h3>
                  <p className="text-gray-700 text-sm italic leading-relaxed whitespace-pre-wrap">
                    &ldquo;{personalNote}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-end gap-3 flex-shrink-0">
              <button
                onClick={handleNavigateToGiftCards}
                className="w-full sm:w-auto px-8 py-3 bg-[#006241] text-white font-bold rounded-full hover:bg-[#006241]/90 shadow-md transition-all duration-200 cursor-pointer text-center"
              >
                Back to Gift Cards
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutSuccessModal;