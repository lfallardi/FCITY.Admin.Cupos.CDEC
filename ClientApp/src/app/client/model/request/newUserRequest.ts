export class NewUserRequest {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    dni: string;
    dniType: string;
    dateOfBirth: Date;
    phone: string;
    gender: string;
    province: string;
    registeredFrom: string;
    city: string;
    street: string;
    number: string;
    floor: string;
    departmentNumber: string;
    postalCode: string;
    themes: string[] = [];
    profiles: string[] = [];
}