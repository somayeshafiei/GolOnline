export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <header className="h-14 p-10 bg-green-300 text-center">فروشگاه</header>
        {children}
      </div>
    </>
  );
}
