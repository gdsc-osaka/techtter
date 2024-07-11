import * as admin from 'firebase-admin';

// 二重初期化を防止
const app = admin.apps.length === 1 ? admin : admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIRE_SA_TYPE,
        project_id: process.env.FIRE_PROJECT_ID,
        private_key_id: process.env.FIRE_SA_PRIVATE_KEY_ID,
        // .env は \n が \\n になるので置換する
        private_key: process.env.FIRE_SA_PRIVATE_KEY?.replaceAll('\\n', '\n'),
        client_email: process.env.FIRE_SA_CLIENT_EMAIL,
        client_id: process.env.FIRE_SA_CLIENT_ID,
        auth_uri: process.env.FIRE_SA_AUTH_URI,
        token_uri: process.env.FIRE_SA_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIRE_SA_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIRE_SA_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIRE_SA_UNIVERSE_DOMAIN,
    } as any),
});

export namespace Admin {
    export const auth = app.auth();
    export const messaging = app.messaging();
}
