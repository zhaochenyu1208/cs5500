import {User} from '../model/user.client.model';
import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {MatSelectTrigger} from "@angular/material";


@Injectable()
export class UserService {
    constructor(private _http: HttpClient, private sharedService: SharedService, private router: Router) {}
    baseUrl = environment.baseUrl;
    options = {withCredentials: false};

    findAllUsersByType(type: String) {
        return this._http.get<User>(this.baseUrl + '/api/allusers/' + type);
    }

    // createUser(user: User) {
    //     return this._http.post(this.baseUrl + '/api/user', user);
    // }

    findUserById(userId: String) {
        return this._http.get(this.baseUrl + '/api/user/' + userId);
    }

    findUserByUsername(username: String) {
        return this._http.get(this.baseUrl + '/api/user?username=' + username);
    }

    findUserByCredentials(username: String, password: String) {
        return this._http.get<User>(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
    }

    updateUser(userId: String, user: User) {
        return this._http.put(this.baseUrl + '/api/user/' + userId, user);
    }

    deleteUser(userId: String) {
        return this._http.delete(this.baseUrl + '/api/user/' + userId);
    }

    login(username: String, password: String, userType: String) {
        this.options.withCredentials = true; // jga

        const body = {
            username: username,
            password: password,
            userTpye: userType
        };

        return this._http.post(this.baseUrl + '/api/login', body, this.options);
    }


    logout() {
        this.options.withCredentials = true;
        return this._http
            .get(this.baseUrl + '/api/logout');
    }

    register(username: String, password: String, userType: String) {
        this.options.withCredentials = true;
        const user = {username: username, password: password, userType: userType};
        return this._http
            .post(this.baseUrl + '/api/register', user);
    }

    isLoggedIn() {
        return this._http
            .post(this.baseUrl + '/api/isLoggedIn', '', this.options)
            .pipe(
                map((user) => {
                        if (user !== 0) {
                            this.sharedService.user = user;
                            return true;
                        } else {
                            this.router.navigate(['/login']);
                            return false;
                        }
                    }
                ));
    }
}

