# CamperPark Athens Project

Μία full-stack web εφαρμογή που χρησιμοποιεί **Angular** για το frontend και **Node.js** με **Express** για το backend. Είναι μια πλατφόρμα διαχείρησης των χρηστών και των πελατών, με features όπως authentication, user management, CRUD operations και άλλα.

---

## Πίνακας περιεχομένων

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
   - [Frontend (Angular)](#frontend-angular)
   - [Backend (Node.js)](#backend-nodejs)
4. [Deployment](#deployment)
5. [API Documentation](#api-documentation)

---

## Features

- **User Authentication**: Ασφαλές login και registration με JWT (JSON Web Tokens).
- **User Management**: Create, read, update, και delete users.
- **Customer Management**: Create, read, update, και delete customers.
- **Role-Based Access Control**: Δυο ρόλοι (admin, user) με πρόσβαση βάση ρόλου.

---

## Prerequisites

Πριν ξεκινήσετε, βεβαιωθείτε ότι έχετε εγκατεστημένα τα παρακάτω:

- **Node.js** (v18 or higher)
- **Angular CLI** (v16 or higher)
- **MongoDB** (or a MongoDB Atlas connection string)

---

## Setup

### Frontend (Angular)

1. Κατευθυνθείτε στο `frontend/camper-park-athens`:
   ```bash
   cd frontend/camper-park-athens

2. Εγκαταστήστε τα dependencies:
   ```bash
   npm install

3. Εκκινήστε τον server:
   ```bash
   ng serve

To frontend τρέχει στο http://localhost:4200

### Backend (Node.js)

1. Κατευθυνθείτε στο `backend`:

2. Εγκαταστήστε τα dependencies:
   ```bash
   npm install

3. Εκκινήστε τον server:
   ```bash
   npm start

To backend τρέχει στο http://localhost:3000

To swagger αρχείο για δοκιμές του backend τρέχει στο http://localhost:3000/api-docs/

## Deployment

### Frontend (Angular)

1. Κάνουμε build το project για production
   ```bash
   ng build --configuration production

2. Ο φάκελος /dist θα γίνει deploy σε όποιο hosting service έχουμε επιλέξει (εφόσον θα γινόταν live η εφαρμογή)

### Backend (Node.js)

1. Για την διευκόλυνση της εξέτασης της εργασίας, έχω συμπεριλάβει όλα τα env files στο commit που έχω κάνει στο GitHub. Υπό κανονικές συνθήκες θα διαχειριζόμουν τις πληροφορίες που περιέχονται σε αυτά τα αρχεία με τις απαραίτητες διαδικασίες ασφαλείας.

2. Ξεκινήστε τον server του backend σε production mode:
   ```bash
   npm start
3. Αντίστοιχα με το frontend, το backend θα γίνει deploy σε όποιο hosting service έχουμε επιλέξει.

## API Documentation

Το ΑPI του backend υποστηρίζει τα ακόλουθα endpoints:

### Authentication

- **Register a new user**:
  ```http
  POST /auth/register

- **Log in**:
  ```http
  POST /auth/login

### Users

- **Get all users**:
  ```http
  GET /users

- **Get a specific user**:
  ```http
  GET /users/:username

- **Update a user**:
  ```http
  PATCH /users/:username

- **Delete a user**:
  ```http
  DELETE /users/:username

### Customers

- **Get all customers**:
  ```http
  GET /customers

- **Get a specific customer**:
  ```http
  GET /customers/:username

- **Update a customer**:
  ```http
  PATCH /customers/:username

- **Delete a customer**:
  ```http
  DELETE /customers/:username

Ευχαριστώ.
