import { Injectable } from "@angular/core";
import { Subscription, User } from "../graphql/graphq";

@Injectable({
    providedIn: "root"
})

export class SubscriptionService {

    user!: User;
    subscription!: Subscription;

    constructor() { }

    setSubscription(subscription: Subscription) {
        this.subscription = subscription;
    }

    getSubscription() {
        return this.subscription;
    }

    setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}