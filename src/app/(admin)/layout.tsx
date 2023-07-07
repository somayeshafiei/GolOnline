import SideBar from '@/components/layout/SideBar';

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row h-full w-full justify-center items-center py-10 px-80 bg-gray-200">
        <div className="flex flex-row h-full w-full justify-center items-center border-2 rounded-lg shadow-lg bg-white">
          <SideBar />
          <div className="bg-[#F0E1EA] w-full h-full">{children}</div>
        </div>
      </div>
    </>
  );
}
