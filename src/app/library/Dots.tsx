import * as React from 'react';
import { CarouselApi } from '@/components/ui/carousel'; 

interface DotsProps {
  count: number;  
  current: number;
  api?: CarouselApi;  
}

export const Dots: React.FC<DotsProps> = ({ count, current, api }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`mx-1 h-2 w-2 rounded-full ${current === index + 1 ? 'bg-blue' : 'bg-gray-300'}`}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  );
};
