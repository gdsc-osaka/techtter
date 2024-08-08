// log4js.configure(log4jsConfig);
// export const logger = log4js.getLogger();

export const logger = {
    log(message: string) {
        console.log(message);
    },
    error(error: unknown) {
        console.error(error);
    }
}
