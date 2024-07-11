declare module 'process' {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                FIRE_CONFIG: string;
                FIRE_SA_KEY: string;
            }
        }
    }
}
