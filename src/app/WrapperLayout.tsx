'use client';
import { ConfigProvider } from 'antd';
export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#AF6EA0',
          fontFamily: 'iransans',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
