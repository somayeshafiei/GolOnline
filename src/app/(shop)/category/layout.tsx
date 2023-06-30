import SideBar from '@/components/pages/category/SideBar';

export default function categoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row h-full w-full px-5 sm:px-10 md:px-[120px] py-8">
        <SideBar />
        {children}
      </div>
    </>
  );
}
