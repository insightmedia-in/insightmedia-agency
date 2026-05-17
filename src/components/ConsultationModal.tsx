"use client";

import React, { useState, useEffect } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Detect theme from document class
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
    setMounted(true);
    
    // Listen for theme changes
    const handleThemeChange = (e: any) => {
      setIsDark(e.detail?.theme === 'dark');
    };
    
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);
  
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Auto-close after 3 seconds
    setTimeout(() => {
      resetForm();
      onClose();
    }, 3000);
  };

  // Reset form
  const resetForm = () => {
    setFullName("");
    setMobileNumber("");
    setErrors({});
    setIsSuccess(false);
  };

  // Handle modal close
  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Lock scrolling on body
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      // Unlock scrolling
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen, isLoading]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur - Theme-aware */}
      <div
        className={`
          fixed inset-0 z-40 transition-all duration-500
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        style={{
          backdropFilter: isOpen ? "blur(8px)" : "blur(0px)",
          backgroundColor: isDark 
            ? isOpen ? "rgba(10, 10, 10, 0.6)" : "rgba(10, 10, 10, 0)"
            : isOpen ? "rgba(248, 247, 245, 0.5)" : "rgba(248, 247, 245, 0)",
        }}
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <div
        className={`
          fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2
          w-full max-w-md mx-4 transition-all duration-500
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >
        {/* Dark Theme Modal */}
        {isDark ? (
          <div
            className={`
              relative rounded-2xl xs:rounded-3xl overflow-hidden
              bg-gradient-to-br from-brand-dark/80 via-brand-dark/70 to-black/80
              border border-brand-orange/20 shadow-2xl
              backdrop-blur-xl p-5 xs:p-6 sm:p-8 md:p-10
            `}
            style={{
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 40px rgba(255, 90, 31, 0.15),
                inset 0 1px 1px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Glow effect - Dark */}
            <div
              className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl -z-10"
              style={{
                filter: "blur(60px)",
                opacity: 0.3,
              }}
            />

            {/* Content - Hidden on success */}
            {!isSuccess ? (
              <>
                {/* Header - Dark */}
                <div className="mb-6 xs:mb-7 sm:mb-8">
                  <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl font-bold text-white mb-1.5 xs:mb-2">
                    Get Free Consultation
                  </h2>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                    Join 100+ businesses that transformed with us
                  </p>
                </div>

                {/* Form - Dark */}
                <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
                  {/* Full Name Field - Dark */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs xs:text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors({ ...errors, fullName: "" });
                        }
                      }}
                      placeholder="Your full name"
                      disabled={isLoading}
                      className={`
                        w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg xs:rounded-xl text-white placeholder-gray-500
                        bg-white/5 border border-gray-600/30 backdrop-blur-sm
                        transition-all duration-300
                        focus:outline-none focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20
                        hover:border-gray-500/50 hover:bg-white/10
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.fullName ? "border-red-500/60 focus:ring-red-500/20" : ""}
                      `}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number Field - Dark */}
                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs xs:text-sm font-medium text-gray-300 mb-2">
                      Mobile Number
                    </label>
                    <input
                      id="mobileNumber"
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (errors.mobileNumber) {
                          setErrors({ ...errors, mobileNumber: "" });
                        }
                      }}
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                      className={`
                        w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg xs:rounded-xl text-white placeholder-gray-500
                        bg-white/5 border border-gray-600/30 backdrop-blur-sm
                        transition-all duration-300
                        focus:outline-none focus:border-brand-orange/60 focus:ring-2 focus:ring-brand-orange/20
                        hover:border-gray-500/50 hover:bg-white/10
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.mobileNumber ? "border-red-500/60 focus:ring-red-500/20" : ""}
                      `}
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-400 text-xs mt-1">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* CTA Button - Dark */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                      w-full font-bold text-xs xs:text-sm sm:text-base py-2.5 xs:py-3 sm:py-3 px-4 xs:px-6 rounded-lg xs:rounded-xl
                      bg-gradient-to-r from-brand-orange to-orange-600
                      text-white shadow-lg
                      transition-all duration-300
                      hover:from-orange-600 hover:to-orange-700
                      hover:scale-105 hover:shadow-xl
                      active:scale-95
                      disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100
                      focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:ring-offset-2 focus:ring-offset-brand-dark/50
                      flex items-center justify-center gap-2
                      group relative overflow-hidden
                    `}
                    style={{
                      boxShadow: `0 0 20px rgba(255, 90, 31, 0.3)`,
                    }}
                  >
                    {/* Animated background gradient */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ zIndex: -1 }}
                    />

                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get Free Consultation
                        <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </>
                    )}
                  </button>

                  {/* Privacy Text - Dark */}
                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. No spam, just helpful insights.
                  </p>
                </form>
              </>
            ) : (
              /* Success State - Dark */
              <div className="py-8 text-center animate-fade-in">
                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-brand-orange to-orange-600 rounded-full flex items-center justify-center animate-bounce"
                    style={{
                      boxShadow: "0 0 30px rgba(255, 90, 31, 0.4)",
                    }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Success Message */}
                <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 xs:mb-2">
                  Thanks! 🚀
                </h3>
                <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                  Our team will contact you shortly
                </p>
                <p className="text-gray-500 text-xs xs:text-sm mt-3 xs:mt-4">
                  Redirecting in a moment...
                </p>
              </div>
            )}

            {/* Close Button - Dark */}
            <button
              onClick={handleClose}
              disabled={isLoading}
              className={`
                absolute top-3 xs:top-4 right-3 xs:right-4 p-1.5 xs:p-2 rounded-lg
                bg-white/5 hover:bg-white/10
                border border-gray-600/30 hover:border-brand-orange/30
                text-gray-400 hover:text-white
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <svg
                className="w-4 xs:w-5 h-4 xs:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          /* Light Theme Modal */
          <div
            className="relative rounded-2xl xs:rounded-3xl overflow-hidden backdrop-blur-xl p-5 xs:p-6 sm:p-8 md:p-10"
            style={{
              background: "linear-gradient(135deg, #F8F7F5 0%, #FDFCFB 100%)",
              border: "1.5px solid rgb(255, 107, 0, 0.12)",
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.06),
                0 0 1px rgba(255, 107, 0, 0.2),
                inset 0 1px 1px rgba(255, 255, 255, 0.6)
              `,
            }}
          >
            {/* Glow effect - Light */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -z-10"
              style={{
                background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0) 70%)",
                filter: "blur(60px)",
              }}
            />

            {/* Content - Hidden on success */}
            {!isSuccess ? (
              <>
                {/* Header - Light */}
                <div className="mb-6 xs:mb-7 sm:mb-8">
                  <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl font-bold mb-1.5 xs:mb-2" style={{ color: "#0F172A" }}>
                    Get Free Consultation
                  </h2>
                  <p className="text-xs xs:text-sm sm:text-base" style={{ color: "#64748B" }}>
                    Join 100+ businesses that transformed with us
                  </p>
                </div>

                {/* Form - Light */}
                <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
                  {/* Full Name Field - Light */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs xs:text-sm font-medium mb-2" style={{ color: "#0F172A" }}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors({ ...errors, fullName: "" });
                        }
                      }}
                      placeholder="Your full name"
                      disabled={isLoading}
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg xs:rounded-xl backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        border: errors.fullName ? "1.5px solid rgb(239, 68, 68)" : "1.5px solid rgba(255, 107, 0, 0.15)",
                        color: "#0F172A",
                        boxShadow: errors.fullName 
                          ? "0 0 12px rgba(239, 68, 68, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.05)"
                          : "0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.border = "1.5px solid rgb(255, 107, 0, 0.4)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 107, 0, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.05)";
                      }}
                      onBlur={(e) => {
                        if (!errors.fullName) {
                          e.currentTarget.style.border = "1.5px solid rgba(255, 107, 0, 0.15)";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.5)";
                        }
                      }}
                    />
                    {errors.fullName && (
                      <p className="text-xs mt-1.5" style={{ color: "#dc2626" }}>{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number Field - Light */}
                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs xs:text-sm font-medium mb-2" style={{ color: "#0F172A" }}>
                      Mobile Number
                    </label>
                    <input
                      id="mobileNumber"
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (errors.mobileNumber) {
                          setErrors({ ...errors, mobileNumber: "" });
                        }
                      }}
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg xs:rounded-xl backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        border: errors.mobileNumber ? "1.5px solid rgb(239, 68, 68)" : "1.5px solid rgba(255, 107, 0, 0.15)",
                        color: "#0F172A",
                        boxShadow: errors.mobileNumber 
                          ? "0 0 12px rgba(239, 68, 68, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.05)"
                          : "0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.border = "1.5px solid rgb(255, 107, 0, 0.4)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 107, 0, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.05)";
                      }}
                      onBlur={(e) => {
                        if (!errors.mobileNumber) {
                          e.currentTarget.style.border = "1.5px solid rgba(255, 107, 0, 0.15)";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.5)";
                        }
                      }}
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* CTA Button - Light */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-bold text-xs xs:text-sm sm:text-base py-2.5 xs:py-3 sm:py-3 px-4 xs:px-6 rounded-lg xs:rounded-xl text-white transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 group relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #FF6B00 0%, #FF8530 100%)",
                      boxShadow: "0 0 20px rgba(255, 107, 0, 0.25), inset 0 -2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 107, 0, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 107, 0, 0.25), inset 0 -2px 8px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get Free Consultation
                        <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </>
                    )}
                  </button>

                  {/* Privacy Text - Light */}
                  <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
                    We respect your privacy. No spam, just helpful insights.
                  </p>
                </form>
              </>
            ) : (
              /* Success State - Light */
              <div className="py-8 text-center animate-fade-in">
                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce"
                    style={{
                      background: "linear-gradient(135deg, #FF6B00 0%, #FF8530 100%)",
                      boxShadow: "0 0 30px rgba(255, 107, 0, 0.3)",
                    }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Success Message */}
                <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold mb-1.5 xs:mb-2" style={{ color: "#0F172A" }}>
                  Thanks! 🚀
                </h3>
                <p className="text-xs xs:text-sm sm:text-base" style={{ color: "#64748B" }}>
                  Our team will contact you shortly
                </p>
                <p className="text-xs xs:text-sm mt-3 xs:mt-4" style={{ color: "#94a3b8" }}>
                  Redirecting in a moment...
                </p>
              </div>
            )}

            {/* Close Button - Light */}
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="absolute top-3 xs:top-4 right-3 xs:right-4 p-1.5 xs:p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "rgba(255, 107, 0, 0.08)",
                border: "1.5px solid rgba(255, 107, 0, 0.15)",
                color: "#64748B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 0, 0.15)";
                e.currentTarget.style.color = "#FF6B00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 0, 0.08)";
                e.currentTarget.style.color = "#64748B";
              }}
            >
              <svg
                className="w-4 xs:w-5 h-4 xs:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLight {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeInLight 0.6s ease-out;
        }
      `}</style>
    </>
  );
};
