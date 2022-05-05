import { Injectable } from "@angular/core";
import { Role } from "../graphql/graphq";

@Injectable({
    providedIn: "root"
})
export class RoleService{
    private _role!: Role | null;
    constructor(){}

    public get role() : Role {
        return this._role!;
    }

    public set role(role: Role | null) {
        this._role = role;
    }
}
