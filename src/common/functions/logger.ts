import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
            (info) =>
                `${info.timestamp} ${info.level}: ${info.message}` +
                (info.splat !== undefined ? `${info.splat}` : " ")
        )
    ),
    transports: [new transports.Console()],
});

const error = (error: any, message = "An error occured") => {
    logger.debug(message);
    logger.error(JSON.stringify(error));
};

class PrintObject {
    Provider: any;
    P_orderId: any;
    p_referenceId: any;
    status: any;
    userId: any;
    orderId: any;
    itemId: any;
    constructor(Provider: any, P_orderId: any, p_referenceId: any, status: any, userId: any, orderId: any, itemId: any) {
        this.Provider = Provider;
        this.P_orderId = P_orderId;
        this.p_referenceId = p_referenceId;
        this.status = status;
        this.userId = userId;
        this.orderId = orderId;
        this.itemId = itemId;
    }
}

class PrintMigrationObject {
    Provider: any;
    P_orderId: any;
    p_referenceId: any;
    status: any;
    userId: any;
    orderId: any;
    itemId: any;
    sku: any;
    dateKey: any;
    constructor(
        Provider: any,
        P_orderId: any,
        p_referenceId: any,
        status: any,
        userId: any,
        orderId: any,
        itemId: any,
        sku: any,
        dateKey: any
    ) {
        this.Provider = Provider;
        this.P_orderId = P_orderId;
        this.p_referenceId = p_referenceId;
        this.status = status;
        this.userId = userId;
        this.orderId = orderId;
        this.itemId = itemId;
        this.sku = sku;
        this.dateKey = dateKey;
    }
}

export { logger, error, PrintObject as processorLogs, PrintMigrationObject as printMigrationObject };