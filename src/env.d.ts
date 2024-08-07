declare module 'process' {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                NEXT_PUBLIC_FIRE_CONFIG: string;
                FIRE_SA_KEY: string;
                FIRE_STORAGE_BUCKET: string;
            }
        }
    }
}
