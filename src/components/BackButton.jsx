import React from 'react';

const BackButton = ({ onClick, className = "", children = "Back" }) => {
    const handleBack = () => {
        if (onClick) {
            onClick();
        } else {
            window.history.back();
        }
    };

    return (
        <div className="w-full h-auto flex justify-start">
            <button
                onClick={handleBack}
                className={`cursor-pointer px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 mb-10 inline-flex items-center ${className}`}
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                {children}
            </button>
        </div>

    );
};

export default BackButton;