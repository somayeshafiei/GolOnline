export default function loginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center bg-green-300">
      {/* <header>headerLoginLayout</header> */}
      <div className="p-5 bg-green-100 rounded-md">{children}</div>
    </div>
  );
}
