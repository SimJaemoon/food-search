import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import { Suspense } from 'react';

export default function LandingLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header pageName="Landing" />
      {children}
      <Suspense>{modal}</Suspense>
      <Footer />
    </>
  );
}
