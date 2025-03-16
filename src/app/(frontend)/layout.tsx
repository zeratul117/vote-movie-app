import React, { Suspense } from 'react';
import './styles.css';
import Header from './Header';
import Footer from './Footer';
import Loading from './loading';
import dynamic from 'next/dynamic';

const MainContent = dynamic(() => import('./MainContent'), {
  ssr: true,
  loading: () => <Loading />,
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Suspense fallback={<Loading />}>
            <MainContent>{children}</MainContent>
          </Suspense>
          <Footer />
        </div>
      </body>
    </html>
  );
}