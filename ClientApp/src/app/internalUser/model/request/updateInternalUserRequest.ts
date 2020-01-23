
export class UpdateInternalUserRequest {
    key: string;
    role: string;

    constructor(public InternalUserkey: string, public newRole: string) {
        this.key = InternalUserkey;
        this.role = newRole;
    }
}

