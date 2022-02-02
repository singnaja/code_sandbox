import { ErrorDTO } from './error.dto';
export declare class ResponseDTO<T> {
    data: T;
    message: string;
    constructor(data?: T, message?: string);
}
export declare class ResponseOffsetDTO<T> {
    data: T;
    limit: number;
    offset: number;
    message: string;
    constructor(data?: T, limit?: number, offset?: number, message?: string);
}
export declare const fromError: <T>(err: Error | string, code?: string, message?: string) => ErrorDTO;