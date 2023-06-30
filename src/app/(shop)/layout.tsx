import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Suspense } from 'react';
import Loading from '../loading';

export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
