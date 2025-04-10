import { type ReactNode } from 'react';
import { Providers } from '@/lib/providers';

// this is the layout for the app (we need to wrap the app in the providers as in the wallet connect provider)

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}