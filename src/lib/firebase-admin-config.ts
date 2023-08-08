import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
};

const firebaseAdminInitApp = () => {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
};

export default firebaseAdminInitApp;
