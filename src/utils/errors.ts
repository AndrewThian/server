export class AppError extends Error {
    public type: object
    public error?: Error | null
    public status: number
    public description: string
    public isOperational: boolean

    constructor(
        type: object, 
        description: string,
        isOperational: boolean,
        error: Error = null,
    ) {
        super(description)
        this.type = type;
        this.error = error
        this.isOperational = isOperational;
    }
}

export const commonErrors = {
    DatabaseError: {
        httpCode: 500,
        location: "[Database Connection]"
    },
    DataLayerError: {
        httpCode: 500
    },
    DataNotFound: {
        httpCode: 404
    },
    AlreadyInDatabase: {
        httpCode: 409
    },
    MissingDataError: {
        httpCode: 422
    }
}