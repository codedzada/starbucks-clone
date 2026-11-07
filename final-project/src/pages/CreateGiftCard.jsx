import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { message } from 'antd';

import { giftCardCategories } from '../api/giftCardsApi';
import { giftCardSchema, giftCardInitialValues } from '../validation/giftCardSchema';
import { useAuth } from '../features/auth/AuthContext';

import AmountSelector from '../components/GiftCards/AmountSelector';
import RecipientForm from '../components/GiftCards/RecipientForm';
import PersonalNote from '../components/GiftCards/PersonalNote';
import SenderInfo from '../components/GiftCards/SenderInfo';
import CheckoutSuccessModal from '../components/GiftCards/CheckoutSuccessModal';
import AuthGuardModal from '../components/GiftCards/AuthGuardModal';

export default function CreateGiftCard() {
  const { cardId } = useParams();
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let found = null;
    if (cardId) {
      found = giftCardCategories
        .flatMap((cat) => cat.cards)
        .find((c) => String(c.id) === String(cardId));
    }
    if (!found && giftCardCategories.length > 0 && giftCardCategories[0].cards.length > 0) {
      found = giftCardCategories[0].cards[0];
    }
    setActiveCard(found);
  }, [cardId]);

  const formik = useFormik({
    initialValues: giftCardInitialValues,
    validationSchema: giftCardSchema,
    onSubmit: (values, { setSubmitting }) => {
      const giftAmount = values.isCustomAmount
        ? parseFloat(values.customAmount)
        : parseFloat(values.amount);

      const totalCharged = giftAmount * values.recipients.length;

      setOrderDetails({
        cardImage: activeCard?.image || 'https://cloudassets.starbucks.com/is/image/sbuxcorp/SummerSeasonalFY26',
        cardAlt: activeCard?.alt || 'Starbucks eGift Card',
        amount: giftAmount,
        recipients: values.recipients,
        personalNote: values.personalNote,
        senderName: values.senderName,
        senderEmail: values.senderEmail,
        total: totalCharged,
      });

      setTimeout(() => {
        setSubmitting(false);
        setIsSuccessModalOpen(true);
        message.success('Your gift card has been successfully ordered!');
      }, 1000);
    },
  });

  const handleAddRecipient = () => {
    if (formik.values.recipients.length < 10) {
      formik.setFieldValue('recipients', [
        ...formik.values.recipients,
        { name: '', email: '' },
      ]);
    }
  };

  const handleRemoveRecipient = (index) => {
    if (formik.values.recipients.length > 1) {
      const filtered = formik.values.recipients.filter((_, idx) => idx !== index);
      formik.setFieldValue('recipients', filtered);
    }
  };

  const handleRecipientFieldChange = (index, field, value) => {
    const updated = formik.values.recipients.map((rec, idx) => {
      if (idx === index) {
        return { ...rec, [field]: value };
      }
      return rec;
    });
    formik.setFieldValue('recipients', updated);
  };

  const handleAmountChange = ({ amount, isCustom, customAmount }) => {
    formik.setFieldValue('amount', amount);
    formik.setFieldValue('isCustomAmount', isCustom);
    formik.setFieldValue('customAmount', customAmount);
  };

  const selectedAmount = formik.values.isCustomAmount
    ? parseFloat(formik.values.customAmount) || 0
    : parseFloat(formik.values.amount) || 0;

  const totalAmount = selectedAmount * formik.values.recipients.length;

  // Auth guard: block checkout for unauthenticated users
  const handleCheckout = () => {
    if (!user) {
      message.error('Please sign in or create an account to proceed with checkout.');
      setIsAuthModalOpen(true);
      return;
    }
    formik.handleSubmit();
  };

  return (
    <div className="min-h-screen bg-white pb-32 pt-6 md:pt-10 antialiased">
      <div className="max-w-[500px] mx-auto px-4">

        <nav className="text-xs sm:text-sm font-semibold mb-2">
          <Link to="/giftcards" className="text-gray-500 hover:text-black transition-colors">
            Gift
          </Link>
          <span className="text-gray-400 mx-1.5">/</span>
          <span className="text-gray-800">Create eGift</span>
        </nav>

        <h1 className="text-2xl sm:text-[32px] font-bold text-[#212121] tracking-tight mb-6">
          Create eGift
        </h1>

        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full aspect-[1.58/1] rounded-2xl overflow-hidden shadow-sm border border-gray-200"
          >
            {activeCard ? (
              <img
                src={activeCard.image}
                alt={activeCard.alt}
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <div className="w-full h-full bg-[#f2f0eb] flex items-center justify-center text-gray-400">
                Loading Card Preview...
              </div>
            )}
          </motion.div>

          <Link
            to="/giftcards"
            className="mt-3.5 text-sm font-bold text-[#006241] hover:underline inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            Select another design
          </Link>
        </div>

        <span className="text-xs text-gray-500 block mb-6 font-semibold select-none">
          <span className="text-[#006241] font-bold">*</span> indicates required field
        </span>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">

          <section className="space-y-6">
            <div className="pb-1">
              <h2 className="text-xl font-bold text-[#212121] tracking-tight">Gift amount</h2>
              <div className="w-full h-[3px] bg-[#d4e9e2] rounded-full mt-2 mb-6" />
            </div>
            <AmountSelector
              value={formik.values.amount}
              isCustom={formik.values.isCustomAmount}
              customValue={formik.values.customAmount}
              onChange={handleAmountChange}
              error={formik.errors.customAmount}
              touched={formik.touched.customAmount}
            />
          </section>

          <section>
            <RecipientForm
              recipients={formik.values.recipients}
              errors={formik.errors.recipients}
              touched={formik.touched.recipients}
              onAdd={handleAddRecipient}
              onRemove={handleRemoveRecipient}
              onChangeField={handleRecipientFieldChange}
              onBlur={formik.handleBlur}
            />
          </section>

          <section>
            <PersonalNote
              value={formik.values.personalNote}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.personalNote}
              touched={formik.touched.personalNote}
            />
          </section>

          <section>
            <SenderInfo
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </section>
        </form>
      </div>

      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={formik.isSubmitting}
          className="px-6 py-3.5 bg-[#006241] hover:bg-[#006241]/90 text-white font-bold text-base rounded-full shadow-[0_4px_16px_rgba(0,98,65,0.4)] active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {formik.isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            `Checkout $${totalAmount.toFixed(2)}`
          )}
        </button>
      </div>

      {/* <CheckoutSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        orderDetails={orderDetails}
      /> */}

      {/* Auth Guard Modal — shown when unauthenticated user attempts checkout */}
      <AuthGuardModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}