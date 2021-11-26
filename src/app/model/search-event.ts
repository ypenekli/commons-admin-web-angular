import { Injectable } from "@angular/core";

@Injectable()
export class SearchEvent{

    private eventHandlersMap: Map<string, Function> = new Map();

    constructor() {
    }

    public callEvent(eventName: string, data?: any): void {
        const search = this.eventHandlersMap.get(eventName);
        if(search)
            search(data);
    }

    public addListener(eventName: string, callback: Function): void {
        this.eventHandlersMap.set(eventName, callback);
    }
}