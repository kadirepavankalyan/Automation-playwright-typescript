export class Logger {
    static info(message: string) {
        console.log(`INFO: ${message}`);
    }

    static error(message: string, error?: Error) {
        console.error(`ERROR: ${message}`);
        if (error) {
            console.error(`STACK TRACE: ${error.stack}`);
        }
    }
}