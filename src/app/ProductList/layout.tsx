import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header pageName="ProductList" />
      {children}
      <Footer />
    </>
  );
}
