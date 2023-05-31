export default function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <header>header shop Layout</header>
        {children}
      </div>
    </>
  );
}
