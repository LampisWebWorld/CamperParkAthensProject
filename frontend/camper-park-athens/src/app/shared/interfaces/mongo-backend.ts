export interface User {
    email: string
    username: string
    password: string
    name: string
    surname: string
    idNumber: string
    phone: string,
    role: string
}

export interface Customer {
    email: string
    name: string
    surname: string
    idNumber: string
    phone: string,
    rv: Rv
}

export interface Rv {
    brand: string
    model: string
    year: string
    liscencePlate: string
    length: string
}

export interface Credentials {
    username: string,
    password: string,
    role: string
}

export interface LoggedInUser {
    username: string
    email: string,
    role: string
}