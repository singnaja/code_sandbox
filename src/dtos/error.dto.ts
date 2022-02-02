export declare class ErrorDTO {
    code: string;
    details: string;
    message: string;
    constructor(err: any, code?: string, message?: string);
}