import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
