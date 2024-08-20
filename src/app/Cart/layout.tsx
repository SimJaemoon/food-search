import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header pageName="Cart" />
      {children}
      <Footer />
    </>
  );
}
