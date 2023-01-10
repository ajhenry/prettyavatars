import admin from 'firebase-admin';

import serviceAccount from './serviceAccount.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccount as unknown as admin.ServiceAccount
      ),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();
