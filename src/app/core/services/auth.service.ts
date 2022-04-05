import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { RefreshTokenGQL, User } from "../graphql/graphq";

@Injectable({
    providedIn: "root",
})
export class AuthService {

    private _user: User | null = null;

    constructor(
        private refreshTokenGQL: RefreshTokenGQL
    ) { }

    get user(): User {
        return JSON.parse(localStorage.getItem("user") || "{}");
    }

    set user(user: User | null) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    refreshToken() {
        return this.refreshTokenGQL.mutate({
            refreshToken: this.user.refresh_token!
        }).pipe(tap(({ data }) => {
            this.user = data?.refresh as User;
        }),
            catchError((error) => {
                console.log('On Refresh Error: ', error);
                this.logout();
                return throwError(() => new Error("Refresh Token Error"));
            })
        );

    }

    logout() {
        this.user = null;
        localStorage.removeItem("user");

    }
}