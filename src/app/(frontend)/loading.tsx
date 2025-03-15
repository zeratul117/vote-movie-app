"use client"
import { Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev); 
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Spin size="large" />
    </div>
  </div>
  );
}