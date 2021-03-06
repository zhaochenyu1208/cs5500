import {Menu} from "../model/restaurant.client.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
@Injectable()
export class MenuService {


    constructor(private _http: HttpClient, private sharedService: SharedService, private router: Router) {
    }

    baseUrl = environment.baseUrl;
    options = {withCredentials: false};

    createDish(dish, restaurantId: String) {
        return this._http.post(this.baseUrl + '/api/restaurant/menu/' + restaurantId, dish);
    }

    findAllDishesForRestaurant(restaurantId: String) {
        console.log("find all dishes for restaurant:" + restaurantId);
        return this._http.get(this.baseUrl + '/api/restaurant/getmenu/' + restaurantId);
    }

    findDishById(dishId) {
        console.log('front call: find dishBy id');
        return this._http.get(this.baseUrl + '/api/restaurant/menu/' + dishId);
    }

    updateDish(dishId, dish: any) {
        return this._http.put(this.baseUrl + '/api/restaurant/menu/' + dishId, dish);
    }

    deleteDish(dishId) {
        return this._http.delete(this.baseUrl + '/api/restaurant/menu/' + dishId);
    }

    reorderDishes(startIndex: Number, endIndex: Number, dishes: Menu[]) {
        return this._http.put(this.baseUrl + '/api/restaurant/'
            + 'dish?initial=' + startIndex + '&final=' + endIndex, dishes);
    }

    findImage(imageName: String) {
        const url = this.baseUrl + '/api/image/' + imageName;
        return this._http.get(url);
    }
}
