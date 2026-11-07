import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Do Starbucks gift cards expire?",
    answer: "Starbucks gift cards do not have an expiration date, nor does the value on your gift card ever expire."
  },
  {
    question: "What is the security code used for? Where is the security code on a Starbucks gift card?",
    answer: "The security code ensures that only the person in possession of the physical card is able to use the gift card. You can find the security code on the back of your Starbucks Card."
  },
  {
    question: "Can I check my balance without the security code?",
    answer: (
      <div className="space-y-3">
        <p>
          You may check your gift card balance without the security code only if it is registered with your Starbucks Rewards account. Once registered, you can view your balance in the following ways:
        </p>
        <p>
          <strong>Online:</strong> Visit our <a href="/card" className="text-[#006241] underline font-semibold hover:text-[#004d33]">Card page</a> and select "Manage" to view the card balances.
        </p>
        <p>
          <strong>Starbucks app:</strong> Select the "Scan" tab to view balances on all of the cards associated with your Starbucks Rewards account.
        </p>
        <p>
          For new or unregistered cards, you must provide the security code. Visit our <a href="/card" className="text-[#006241] underline font-semibold hover:text-[#004d33]">Card page</a> to get started.
        </p>
      </div>
    )
  },
  {
    question: "Why is my Starbucks gift card balance not showing?",
    answer: "Your gift card balance will automatically refresh every 4 hours."
  },
  {
    question: "How can I reload my Starbucks gift card?",
    answer: (
      <div className="space-y-3">
        <p>
          You can reload your Starbucks gift card at participating Starbucks locations, by visiting our <a href="/card" className="text-[#006241] underline font-semibold hover:text-[#004d33]">card page</a> online or on the Starbucks app. You can also set up Auto Reload, which allows you to set an amount on your registered Starbucks Card to reload when the balance falls below a set amount that you choose.
        </p>
        <p>
          You can set up Auto Reload or change your Auto Reload settings by logging into your <a href="/account" className="text-[#006241] underline font-semibold hover:text-[#004d33]">Starbucks account</a> and selecting "Manage". These options are also available within the Starbucks app. If you're having trouble reloading your gift card:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Check your billing information:</strong> Ensure that the name and address entered on your account matches exactly what your financial institution has on file for you. If you recently moved or changed your name, make sure to also change it in your billing information.</li>
          <li><strong>Check your credit card information:</strong> Make sure your credit card is current with a valid expiration date, and you are entering the correct security code.</li>
        </ul>
        <p>Other ways to reload your card include PayPal and Apple Pay.</p>
        <p>If you are still experiencing trouble, contact your financial institution for additional assistance.</p>
        <div className="bg-[#F1F0EB] p-4 rounded-xl mt-4">
          <p className="font-bold text-[#006241] mb-1">Digital Starbucks Card Reload Bonus Star Benefit:</p>
          <p>Digitally reload $30 to your Starbucks Card in your Starbucks account to receive 10 Bonus Stars or $50 to receive 25 Bonus Stars. Max 25 Bonus Stars per transaction. At participating stores.</p>
        </div>
      </div>
    )
  },
  {
    question: "Where can I buy physical Starbucks gift cards?",
    answer: "You can find a selection of physical Starbucks gift cards by visiting Starbucks retail stores, various grocery, drug, and national retailers, as well as online retailers such as Amazon.com."
  },
  {
    question: "Can I buy a Starbucks gift card online?",
    answer: (
      <span>
        If you would like to purchase an eGift (a digital Starbucks gift card), visit <a href="https://www.starbucks.com/gift" target="_blank" rel="noopener noreferrer" className="text-[#006241] underline font-semibold hover:text-[#004d33]">www.starbucks.com/gift</a>. Digital gift cards may also be purchased in the app by selecting the Gift icon at the bottom of the splash page upon opening the app. You can also send an eGift through iMessage, which you can learn more about <a href="/imessage" className="text-[#006241] underline font-semibold hover:text-[#004d33]">here</a>.
      </span>
    )
  },
  {
    question: "Can I send a Starbucks gift card by text or via other messaging and social media apps?",
    answer: (
      <div className="space-y-3">
        <p>
          Yes! You can send Starbucks gift cards by text through the Starbucks app. Launch the app, select the Gift tab, and choose your design. Once you input the recipient name and your gift amount, you can choose to send your eGift via text. After checkout, you will be able to send a link to your recipient through any messaging app. This includes text message, Instagram, Facebook Messenger, Slack, etc.
        </p>
        <p>
          If you have an iPhone, you can send a Starbucks gift card directly through the Messages app! Once you have the Starbucks app installed on your device, you can start a new message or open an existing one, click the + button next to the message field and select Starbucks Gifts to choose a design and dollar amount. Send a gift card to anyone, whether they’re an iPhone or Android user! They’ll be able to enjoy their gift. Note: gift cards cannot be sent in group messages.
        </p>
      </div>
    )
  }
];

export default function GiftCardFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#F9F9F9] py-16">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight mb-2">
            Questions about Starbucks gift cards?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Dive into our FAQ or review our <a href="/terms" className="text-[#006241] underline font-semibold hover:text-[#004d33]">Card Terms and Conditions</a> for more information.
          </p>
        </div>

        {/* Accordion List */}
        <div className="border-t border-gray-200">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-medium text-[#212121] pr-4">
                    {item.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-gray-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}