import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RefreshRequest } from './refresh-request'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class RefreshRequestService {
    constructor(
        private http: Http
    ) { }

    getRequests(): Promise<RefreshRequest[]> {
        return this.http.get('/api/refreshrequest')
            .toPromise()
            .then(response => response.json() as RefreshRequest[]);
    }

    getRequest(id: string): Promise<RefreshRequest> {
        return this.http.get(`/api/refreshrequest/${id}`)
            .toPromise()
            .then(response => response.json() as RefreshRequest);
    }

    addRequest(newRequest): Promise<any> {
        return this.http.post('/api/refreshrequest/', newRequest)
            .toPromise()
            .then(response => response.json());
    }
}
