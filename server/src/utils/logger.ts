import chalk from "chalk";
const LOG_TYPES = {
    NONE: 0,
    ERROR: 1,
    NORMAL: 2,
    DEBUG: 3,
    FFDEBUG: 4,
};

let logType = LOG_TYPES.NORMAL;

class CoreLogger {
    setLogType(type: string) {
        if (typeof type !== "number") return;

        logType = type;
    }

    logTime() {
        let nowDate = new Date();
        return nowDate.toLocaleDateString() + " " + nowDate.toLocaleTimeString([], { hour12: false });
    }

    log(...args: any) {
        if (logType < LOG_TYPES.NORMAL) return;

        console.log(this.logTime(), process.pid, chalk.bold.green("[INFO]"), ...args);
    }

    error(...args: any) {
        if (logType < LOG_TYPES.ERROR) return;

        console.log(this.logTime(), process.pid, chalk.bold.red("[ERROR]"), ...args);
    }

    debug(...args: any) {
        if (logType < LOG_TYPES.DEBUG) return;

        console.log(this.logTime(), process.pid, chalk.bold.blue("[DEBUG]"), ...args);
    }

    ffdebug(...args: any) {
        if (logType < LOG_TYPES.FFDEBUG) return;

        console.log(this.logTime(), process.pid, chalk.bold.blue("[FFDEBUG]"), ...args);
    }
}

const Logger = new CoreLogger();

export default Logger;
