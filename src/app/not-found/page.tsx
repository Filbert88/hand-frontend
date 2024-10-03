"use client";
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{
        background: 'linear-gradient(120deg, #D6F4EC, #F9EBE2, #F2E5F9, #FECFD7)',
      }}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:text-right text-center pr-0 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-[6rem] md:text-[10rem] font-bold text-black">404</h1>
        </div>

        <div className="border-l-4 border-black h-16 md:h-32 mx-0 md:mx-8 hidden md:block"></div>

        <div className="text-center md:text-left">
          <p className="text-xl md:text-2xl mb-4 text-gray-700">
            It seemed you&apos;ve wandered pretty far! <br />
            Let's get you <span className="font-bold">back!</span>
          </p>
          <button
            className="px-6 py-3 bg-black text-white rounded-full shadow-md hover:scale-105 transition-transform"
            onClick={handleGoHome}
          >
            Go back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
