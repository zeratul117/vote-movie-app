import React, { Suspense }  from 'react'
import './styles.css'
import Header from './Header'
import Loading from './loading';
import dynamic from "next/dynamic";

const MainContent = dynamic(() => import("./MainContent"), {
  ssr: true,
  loading: () => <Loading />,
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <Suspense fallback={<Loading />}>
          <MainContent>{children}</MainContent>
        </Suspense>
      </body>
    </html>
  )
}
