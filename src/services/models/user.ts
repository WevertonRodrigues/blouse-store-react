import { IModel } from "./model";

export interface User extends IModel {
    email: string,
    password: string,
    name: string
}