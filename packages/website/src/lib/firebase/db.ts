import admin from 'firebase-admin'

import serviceAccount from './serviceAccount.json'

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccount as unknown as admin.ServiceAccount
      ),
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Firebase admin initialization error', (error as Error).stack)
  }
}
export default admin.firestore()
