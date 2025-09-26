export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
}

export interface Schedule {
    id: string;
    userId: string;
    title: string;
    startTime: Date;
    endTime: Date;
}

export interface Reminder {
    id: string;
    userId: string;
    message: string;
    remindAt: Date;
}

export interface Note {
    id: string;
    userId: string;
    title: string;
    content: string;
}

export interface Recommendation {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
}