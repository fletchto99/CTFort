import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'}) });
    private baseUrl = 'https://api.ctfort.com';

    constructor(private http: Http) { }

    login(username: string, password: string): Promise<void> {
        const body = JSON.stringify({username, password});
        return this.http.post(`${this.baseUrl}/login`, body, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    logout(): Promise<void> {
        return this.http.post(`${this.baseUrl}/logout`, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    register(username: string, email: string, password: string): Promise<void> {
        const body = JSON.stringify({username, email, password});
        return this.http.put(`${this.baseUrl}/register`, body, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        const body = error.json();
        if (body.error && body.error.error) {
            Materialize.toast(body.error.error, 4000);
        }

        return Promise.reject(error.message || error);
    }
}
