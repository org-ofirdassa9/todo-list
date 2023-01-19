export interface User {
    id: string;
    email: string;
    has_password: boolean;
    first_name: string;
    last_name: string;
    created_at: Date;
}

export interface Task {
    tid: string;
    description: string;
    completed: boolean;
}