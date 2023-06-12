export interface User {
    id: string,
    name: string,
    password: string,
    email: string,
    role: string
    isActive: boolean,
    bookmarks: string[]
}

export interface Users extends Array<User> {}

