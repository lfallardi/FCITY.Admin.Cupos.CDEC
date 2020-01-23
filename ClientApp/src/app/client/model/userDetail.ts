import { Theme } from './theme';
import { Profile } from './profile';

export class UserDetail {
    key: string;
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
    provinceName: string;
    registerDate: Date;
    updatedAt: Date;
    updatedBy: string;
    sourceSystem: string;
    registrationMethod: string;
    status: string;
    city: string;
    street: string;
    number: string;
    floor: string;
    departmentNumber: string;
    postalCode: string;

    themes: Theme[];
    profiles: Profile[];
    dynamicFields: DynamicFieldResponse;
}

export class DynamicDataItem {
    name: string;
    value: string;
    attempts: string;
}

export class DynamicFieldResponse {
    completed: DynamicDataItem[];
    pending: DynamicDataItem[];
    expired: DynamicDataItem[];
}
