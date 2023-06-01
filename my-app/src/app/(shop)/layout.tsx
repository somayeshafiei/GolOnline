export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col">
        <header className="h-14 p-10 bg-green-300 text-center">فروشگاه</header>
        {children}
        <footer className="bg-green-500 h-20">فوتر</footer>
      </div>
    </>
  );
}
