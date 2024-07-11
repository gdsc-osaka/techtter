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
            }
        }
    }
}
