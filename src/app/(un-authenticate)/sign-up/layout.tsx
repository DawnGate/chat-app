import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up - Chat box',
  description: 'Sign up - Let give a try - Real time chat application',
};

function SignUpLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default SignUpLayout;
