export class UserSearchFilter {
    email: string;
    province: string;
    firstName: string;
    lastName: string;
    dni: string;
    registrationDateFrom: string;
    registrationDateTo: string;
    dateOfBirthFrom: string;
    dateOfBirthTo: string;
    status: string;

    constructor()

    constructor(email?: string, province?: string, firstName?: string, lastName?: string, dni?: string,
                registrationDateFrom?: Date, registrationDateTo?: Date, dateOfBirthFrom?: Date, dateOfBirthTo?: Date ) {
        this.email = email === undefined ? '' : email;
        this.province = province === undefined ? '' : province;
        this.firstName = firstName === undefined ? '' : firstName;
        this.lastName = lastName === undefined ? '' : lastName;
        this.dni = dni === undefined ? '' : dni;
        this.status = status === undefined ? '' : status;
        this.registrationDateFrom = registrationDateFrom === undefined ? '' : registrationDateFrom.toDateString();
        this.registrationDateTo = registrationDateTo === undefined ? '' : registrationDateTo.toDateString();
        this.dateOfBirthFrom = dateOfBirthFrom === undefined ? '' : dateOfBirthFrom.toDateString();
        this.dateOfBirthTo = dateOfBirthTo === undefined ? '' : dateOfBirthTo.toDateString();
    }
}
