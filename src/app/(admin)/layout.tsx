import SideBar from '@/components/layout/SideBar';

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row h-full w-full">
        <SideBar />
        {children}
      </div>
    </>
  );
}
