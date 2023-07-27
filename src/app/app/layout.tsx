import { ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat box - Messages',
  description: 'Real time chat application',
};

function AppLayout({ children }: { children: ReactNode }) {
  return children;
}

export default AppLayout;
