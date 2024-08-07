import * as admin from 'firebase-admin';

// 二重初期化を防止
const app =
    admin.apps.length === 1
        ? admin
        : admin.initializeApp({
              credential: admin.credential.cert(
                  JSON.parse(atob(process.env.FIRE_SA_KEY))
              ),
          });

export namespace Admin {
    export const auth = app.auth();
    export const messaging = app.messaging();
    export const db = app.firestore();
    export const storage = app
        .storage()
        .bucket(process.env.FIRE_STORAGE_BUCKET);
}
