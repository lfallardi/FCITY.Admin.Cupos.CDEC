import { Role } from './role';

export class InternalUser {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    status:string;
    registerDate:string;
}