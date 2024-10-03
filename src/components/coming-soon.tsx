"use client";

import React from 'react';

type ComingSoonProps = {
  title: string;
  message: string;
  backgroundGradient?: string;
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  message,
  backgroundGradient = 'linear-gradient(120deg, #FECFD7, #F9EBE2, #D6F4EC, #F2E5F9)',
}) => {
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        background: backgroundGradient,
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl text-black font-gloock">
          {title}
        </h1>
        <p className="mt-4 text-3xl sm:text-4xl text-black font-gloock">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;