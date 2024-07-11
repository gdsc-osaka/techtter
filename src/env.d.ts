declare module 'process' {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                FIRE_API_KEY: string;
                FIRE_AUTH_DOMAIN: string;
                FIRE_PROJECT_ID: string;
                FIRE_STORAGE_BUCKET: string;
                FIRE_MESSAGING_SENDER_ID: string;
                FIRE_APP_ID: string;
                FIRE_MEASUREMENT_ID: string;

                FIRE_SA_TYPE: string;
                FIRE_SA_PROJECT_ID: string;
                FIRE_SA_PRIVATE_KEY_ID: string;
                FIRE_SA_PRIVATE_KEY: string;
                FIRE_SA_CLIENT_EMAIL: string;
                FIRE_SA_CLIENT_ID: string;
                FIRE_SA_AUTH_URI: string;
                FIRE_SA_TOKEN_URI: string;
                FIRE_SA_AUTH_PROVIDER_X509_CERT_URL: string;
                FIRE_SA_CLIENT_X509_CERT_URL: string;
                FIRE_SA_UNIVERSE_DOMAIN: string;
            }
        }
    }
}
