export default function loginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500 ">
      <div className=" bg-slate-100 rounded-md">{children}</div>
    </div>
  );
}
