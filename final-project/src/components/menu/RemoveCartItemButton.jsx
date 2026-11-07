import React from 'react';

/**
 * RemoveCartItemButton - Mobile-first, accessible remove button for basket items.
 *
 * UX & Accessibility Highlights:
 * - Touch Target: 48x48px minimum hit area (WCAG AAA & Mobile HIG standard).
 * - Micro-interactions: Tactile active scale-down (`active:scale-90`), smooth color state transitions, and focus indicator.
 * - Design Consistency: Matches desktop "X" icon geometry with stroke width 2.2 and rounded caps.
 * - Mobile Adaptation: Highly visible and tap-friendly on touch viewports without hover dependencies.
 */
const RemoveCartItemButton = ({ onRemove, itemName = 'item', className = '' }) => {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${itemName} from order`}
      title={`Remove ${itemName}`}
      className={`
        w-12 h-12 min-w-[48px] min-h-[48px]
        rounded-full flex items-center justify-center
        text-gray-400 hover:text-red-600 hover:bg-red-50/80
        active:bg-red-100 active:scale-90
        transition-all duration-150 ease-out cursor-pointer
        opacity-100 sm:opacity-80 sm:hover:opacity-100
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default RemoveCartItemButton;
