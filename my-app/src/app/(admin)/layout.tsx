export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<>
  <div>
    <header>header adminLayout</header>
    {children}
    </div></>);
}
