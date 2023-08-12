import { firebaseAuth } from '@/lib/firebase-config';
import { signOut } from 'firebase/auth';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

const signOutUser = (router: AppRouterInstance) => {
  signOut(firebaseAuth).then(() => {
    fetch('/api/signOut', {
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        router.replace('/login');
      }
    });
  });
};

export default signOutUser;
