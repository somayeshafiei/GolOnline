'use client';
import { ConfigProvider } from 'antd';
export default function WrapperLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#46a358',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
