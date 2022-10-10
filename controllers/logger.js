const winston = require('winston');
const logger = setupLogger(winston);

//set up winston logger
function setupLogger(winston){
    const loggerConfig = {
        transports: [
            new winston.transports.File({
                filename: "../logs/logs.txt",
                level: "info"
            }),
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            winston.format.printf(
                (log_info) => {
                    return `${log_info.level} - ${log_info.timestamp}: ${log_info.message}`
                }
            )
        )
    };
    
    const logger = winston.createLogger(loggerConfig);
    return logger; 
}

module.exports = logger;



