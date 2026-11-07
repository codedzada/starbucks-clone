import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

export default function QuestionsSection() {
  return (
    <section className="py-16 md:py-32 px-4 text-center bg-[#FEFCF7]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3932] mb-3">
          Questions?
        </h2>
        <p className="text-gray-600 text-lg flex items-center justify-center gap-1.5 flex-wrap">
          <span>We have answers.</span>
          <a 
            href="https://about.starbucks.com/starbucks-rewards-faq/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#006241] font-semibold underline hover:text-[#1e3932] inline-flex items-center gap-1 transition-colors"
          >
            Check out the FAQs
            <FiExternalLink className="w-4 h-4" />
          </a>
        </p>
      </div>
    </section>
  );
}