import { Injectable } from "@angular/core";
import { User } from "../graphql/graphq";

@Injectable({
    providedIn: "root",
})
export class AuthService {

    private _user!: User;
    constructor() {}

    get user(): User {
        return JSON.parse(localStorage.getItem("user") || "{}");
    }

    set user(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }
}