import Header from '@/components/layout/Header';

export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 h-full">{children}</main>
      <footer className="bg-green-500 h-20 text-center pt-4">
        تمام حقوق برای green shop رزرو شده است
      </footer>
    </div>
  );
}
