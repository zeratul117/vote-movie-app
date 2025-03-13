'use client'
import React, { useEffect, useState } from 'react';

export default function MainContent({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                const ismobile = window.innerWidth < 1200;
                setIsMobile((prevIsMobile) => {
                    if (ismobile !== prevIsMobile) {
                        return ismobile;
                    }
                    return prevIsMobile;
                });
            };

            handleResize();

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <main className={`${isMobile ? "" : "flex flex-row justify-center items-center"}`}>
            {children}
        </main>
    );
}