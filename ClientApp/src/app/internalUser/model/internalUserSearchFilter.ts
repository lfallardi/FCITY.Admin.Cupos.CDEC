export class InternalUserSearchFilter {
    email: string;
    firstName: string;
    lastName: string;
    role: string;

    constructor()

    constructor(email?: string, role?: string, firstName?: string, lastName?: string, dni?: string) {
        this.email = email === undefined ? '' : email;
        this.role = role === undefined ? '' : role;
        this.firstName = firstName === undefined ? '' : firstName;
        this.lastName = lastName === undefined ? '' : lastName;
    }
}
