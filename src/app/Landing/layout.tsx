import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

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
      {modal}
      <Footer />
    </>
  );
}
