import { Injectable } from "@angular/core";
import { Coupon } from "../graphql/graphq";

@Injectable({
    providedIn: "root"
})
export class CouponService {
    private _coupon!: Coupon;
    constructor() {}

    
    public get coupon() : Coupon {
        return this._coupon;
    }

    public set coupon(coupon: Coupon) {
        this._coupon = coupon;
    }
    
}