import Header from "@/components/layout/Header";

export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* <header className="h-14 p-10 bg-green-300 text-center">فروشگاه</header> */}
      <Header />
      <main className="flex-1 h-full">{children}</main>
      <footer className="bg-green-500 h-20 text-center">فوتر</footer>
    </div>
  );
}
