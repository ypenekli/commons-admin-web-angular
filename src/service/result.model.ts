import { AppFunc } from 'src/app/model/entities/app-func.model';
import { App } from 'src/app/model/entities/app.model';
import { Common } from 'src/app/model/entities/common.model';
import { Group } from 'src/app/model/entities/group.model';
import { User } from 'src/app/model/entities/user.model';
import { DataEntity } from './entity.model';

export class Result<T>{
    private dataLength: number;

    constructor(
        private success: boolean = false,
        private message: string,
        private data: T | null,
        private errorCode: number
    ) {
        this.message = "";
        this.errorCode = 0;
        this.dataLength = 0;
    }

    isSuccess() {
        return this.success;
    }
    setSuccess(success: boolean) {
        this.success = success;
    }
    getMessage(): string {
        return this.message;
    }
    setMessage(message: string) {
        this.message = message;
    }
    getData(): any {
        return this.data;
    }
    setData(data: any) {
        this.data = data;
    }
    getErrorCode(): number {
        return this.errorCode;
    }
    setErrorCode(errorCode: number) {
        this.errorCode = errorCode;
    }
    getDataLength(): number {
        return this.dataLength;
    }
    setDataLength(dataLength: number) {
        this.dataLength = dataLength;
    }

    static fromPlain(payload: Partial<any>, target: any | null): Result<any> {
        let result = new Result(payload['success'], payload['message'], null, 0);
        let data = payload['data'];
        if (Array.isArray(data)) {
            let list = new Array();
            data.forEach(e => {
                list.push(DataEntity.fromPlain(e, target));
            });
            result.setData(list);
        } else {
            result.data = DataEntity.fromPlain(data, target);
        }
        result.errorCode = payload['errorCode'];
        result.dataLength = payload['dataLength'];
        return result;
    }
}