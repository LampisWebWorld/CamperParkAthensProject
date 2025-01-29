const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model')
const Customer = require('./models/customer.model')

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Camper Park API",
        "description": "Backend CRUD, Authentication and Authorization operations for the Camper Park Athens Web App",
        "contact": {
            "name": "Lampis Antonopoulos",
            "email": "lampisantonopoulos@gmail.com"
        }
    },
    "components": {
        "schemas": {
            User: m2s(User),
            Customer: m2s(Customer)
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "Local server"
        }
    ],
    tags: [
        {
            "name": "Token",
            "description": "Generates a JWT Token to use for specific calls that require it"
        },
        {
            "name": "Users",
            "description": "Requests for user"
        },
        {
            "name": "Customers",
            "description": "Requests for customers"
        }
    ],
    "paths": {
        "/auth/generate-token":{
            "post": {
                "tags": ["Token"],
                "description": "Generates a JWT token for the given password. The secret key is securely stored on the server and is used to sign the token.",
                "requestBody": {
                    "description": "The raw password to encode as a JWT token",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "password": {
                                        "type": "string",
                                        "description": "The raw password to encode",
                                        "example": "test1234"
                                    }
                                },
                                "required": ["password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Token generated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "token": {
                                            "type": "string",
                                            "description": "The generated JWT token",
                                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InRlc3QxMjM0IiwiZXhwIjoxNzM4MDAyNjk4fQ.FyjGy5nR2Bat186etxwiFqa4MFGNTNaI7oy5E2DyMdE"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/register": {
            "post": {
                "tags": ["Users"],
                "description": " Creates a new user. **Note**: The `password` field must be a JWT-encoded token for the POST call to work correctly. Please use the Token POST above to generate a valid token for the new password you want to create.",
                "requestBody": {
                    "description": "Data for the User to be created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": {"type": "string"},
                                    "username": {"type": "string"},
                                    "password": {
                                        "type": "string",
                                        "description": "Encoded password (JWT)",
                                        "example": "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InRlc3QxMTExIiwiZXhwIjoxNzM4MDAyNjk4fQ.FyjGy5nR2Bat186etxwiFqa4MFGNTNaI7oy5E2DyMdE"
                                    },
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "idNumber": {"type": "string"},
                                    "phone": {"type": "string"},
                                    "role": {
                                        "type": "string", 
                                        "enum": ["admin", "user"]
                                    }
                                },
                                "required": ["email", "username", "password", "name", "surname", "idNumber", "phone", "role"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New User is created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                "tags": ["Users"],
                "description": " Login with username and encoded password. **Note**: The `password` field must be a JWT-encoded token for the POST call to work correctly. Please use the Token POST above to generate a valid token by inserting the known password for the user.",
                "requestBody": {
                    "description": "Data that will be used to log the user in",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string",
                                    },
                                    "password": {
                                        "type": "string",
                                        "description": "Encoded password (JWT)",
                                        "example": "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InRlc3QxMTExIiwiZXhwIjoxNzM4MDAyNjk4fQ.FyjGy5nR2Bat186etxwiFqa4MFGNTNaI7oy5E2DyMdE"
                                    }
                                },
                                "required": ["username", "password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Login successful",
                        "content": {
                            "application/json": {
                                "schema": {
                                "type": "object",
                                "properties": {
                                    "token": {
                                    "type": "string",
                                    "example": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsic3ViIjoiVVNFUl9OQU1FIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjgwMDI3MzE0LCJleHAiOjE2ODAwMzA5MTR9.PG8gf5NVufS3IYPKuF-1gFEmtEJMAqimH-ESYstq30M",
                                    "description": "JWT token for authenticated requests"
                                }
                                }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users": {
            "get": {
                "tags": ["Users"],
                "description": "Returns all Users",
                "responses": {
                    "200": {
                        "description": "List of all Users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users/{username}":{
            "get":{
                "tags": ["Users"],
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type":"string"
                    }
                ],
                "description": "Get user with specific username",
                "responses": {
                    "200":{
                        "description": "User result",
                        "schema":{
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch":{
                "tags":["Users"],
                "description": "Update user",
                "parameters":[
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to update",
                        "type":"string"
                    }
                ],
                "requestBody":{
                    "description": "User to update",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"object",
                                "properties":{
                                    "email": {"type":"string"},
                                    "name":{"type":"string"},
                                    "surname":{"type":"string"},
                                    "idNumber":{"type":"string"},
                                    "phone":{"type":"string"}
                                },
                                "required":["email"]
                            }
                        }
                    }
                },
                "responses":{
                    "200":{
                        "description": "Update user",
                        "schema":{
                            "$ref":"#/components/schema/User"
                        }
                    }
                }
            },
            "delete":{
                "tags":["Users"],
                "description": "Deletes user",
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required":true,
                        "description": "Username of user that we want to delete",
                        "type":"string"
                    }
                ],
                "responses":{
                    "200":{
                        "description":"Delete a user"
                    }
                }
            }
        },
        "/customer": {
            "get": {
                "tags": ["Customers"],
                "description": "Returns all Customers",
                "responses": {
                    "200": {
                        "description": "List of all Customers",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Customer"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Customers"],
                "description": " Creates a new Customer.",
                "requestBody": {
                    "description": "Data for the Customer to be created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": {"type": "string"},
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "idNumber": {"type": "string"},
                                    "phone": {"type": "string"},
                                    "rv": {
                                        "type": "object",
                                        "properties": {
                                            "brand": {"type": "string"},
                                            "model": {"type": "string"},
                                            "year": {"type": "string"},
                                            "liscencePlate": {"type": "string"},
                                            "length": {"type": "string"},
                                        }  
                                    }
                                },
                                "required": ["email", "name", "surname", "idNumber", "phone", "rv"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New Customer is created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Customer"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/customer/{email}":{
            "get":{
                "tags": ["Customers"],
                "parameters":[
                    {
                        "name":"email",
                        "in":"path",
                        "required": true,
                        "description": "Email of customer that we want to find",
                        "type":"string"
                    }
                ],
                "description": "Get customer with specific email",
                "responses": {
                    "200":{
                        "description": "Customer result",
                        "schema":{
                            "$ref": "#/components/schemas/Customer"
                        }
                    }
                }
            },
            "patch":{
                "tags":["Customers"],
                "description": "Update customer",
                "parameters":[
                    {
                        "name": "email",
                        "in": "path",
                        "required": true,
                        "description": "Email of customer that we want to update",
                        "type":"string"
                    }
                ],
                "requestBody":{
                    "description": "Customer to update",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"object",
                                "properties":{
                                    "email": {"type":"string"},
                                    "name":{"type":"string"},
                                    "surname":{"type":"string"},
                                    "idNumber":{"type":"string"},
                                    "phone":{"type":"string"},
                                    "rv": {
                                        "type": "object",
                                        "properties": {
                                            "brand": {"type": "string"},
                                            "model": {"type": "string"},
                                            "year": {"type": "string"},
                                            "liscencePlate": {"type": "string"},
                                            "length": {"type": "string"},
                                        }  
                                    }
                                },
                                "required":["email"]
                            }
                        }
                    }
                },
                "responses":{
                    "200":{
                        "description": "Updated customer",
                        "schema":{
                            "$ref":"#/components/schema/Customer"
                        }
                    }
                }
            },
            "delete":{
                "tags":["Customers"],
                "description": "Deletes customer",
                "parameters":[
                    {
                        "name":"email",
                        "in":"path",
                        "required":true,
                        "description": "Email of customer that we want to delete",
                        "type":"string"
                    }
                ],
                "responses":{
                    "200":{
                        "description":"Delete a customer"
                    }
                }
            }
        }
    }
}