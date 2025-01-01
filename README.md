# Job Portal Website

This is a full-stack job portal website where users can apply for jobs, companies can post job openings, and admins can manage job applications and statuses. The project is divided into two main folders:

- **client**: The frontend of the application built with React.
- **server**: The backend API built with Node.js and Express.

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Project Structure](#project-structure)
  - [Client](#client-1)
  - [Server](#server-1)
- [API Routes](#api-routes)
  - [Job Routes](#job-routes)
  - [Application Routes](#application-routes)
  - [Company Routes](#company-routes)
  - [User Routes](#user-routes)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This job portal website allows job seekers to browse job listings and apply for jobs, while companies can post job opportunities. Additionally, the admin role can manage and review applications.

---

## Installation

### Client

1. Navigate to the `client` folder and install the dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the frontend development server:
```bash
    npm run dev
```

### Server
1. Navigate to the server folder and install the dependencies:
```bash
  cd server
  npm install
```
2. create a .env file in the server folder and define the necessary environment variables:
  ```bash
  JWT_SECRET_KEY=your_secret_key
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  CLOUD_NAME=your_cloudinary_cloud_name
  API_KEY=your_api_key
  API_SECRET=your_api_secret
```
3.Start the backend server
```bash
npm run dev
```


## Project Structure

### Client
The `client` folder contains the frontend application built with React.

#### Directory Structure:
- **src/**: Contains the main source code of the frontend application.
  - **components/**: Contains all the React components
  - **redux/**: Manages global state (e.g., jobs, user, companies,applications).
  - **utils/**: Contains utility functions and constants.
  - **App.jsx**: Main component that sets up routing and renders different views.

### Server
The `server` folder contains the backend API built with Express.js.

#### Directory Structure:
- **controllers/**: Contains logic for job posting, application management, user authentication, etc.
- **middlewares/**: Contains authentication middleware and file upload middleware.
- **model/**: Mongoose models for User, Job, Company, etc.
- **routes/**: Defines API routes for handling requests (job, application, user, company).
- **utils/**: Configuration for MongoDB and other utility settings.

## API Routes

### Job Routes
- **POST /jobs/post**: Allows an authenticated user to post a job.
- **GET /jobs/get**: Fetch all jobs.
- **GET /jobs/getadminjobs**: Fetch jobs posted by the authenticated admin.
- **GET /jobs/get/:id**: Get a specific job by ID.

### Application Routes
- **GET /applications/apply/:id**: Apply for a job (requires authentication).
- **GET /applications/get**: Get a list of jobs applied by the user (requires authentication).
- **GET /applications/:id/applicants**: Get a list of applicants for a job (requires authentication).
- **POST /applications/status/:id/update**: Update the status of an application (requires authentication).

### Company Routes
- **POST /companies/register**: Register a company (requires authentication).
- **GET /companies/get**: Get all companies.
- **GET /companies/get/:id**: Get a specific company by ID (requires authentication).
- **PUT /companies/update/:id**: Update company details (requires authentication).

### User Routes
- **POST /users/register**: Register a new user (with file upload for profile picture).
- **POST /users/login**: Log in and receive a JWT token.
- **GET /users/logout**: Log out and clear the session.
- **POST /users/profile/update**: Update the user's profile (requires authentication).

## Frontend Features

The frontend is built using **React** and communicates with the backend API via **Axios** to send HTTP requests. Key features include:

- **Job Posting**: Companies can post new job listings.
- **Job Applications**: Users can apply for jobs and track their applications.
- **Job Listings**: Users can view available job opportunities.
- **User Profiles**: Users can manage their profiles and view their job applications.
- **Authentication**: JWT-based authentication with cookies for secure login and session management.

## Backend Features

The backend is built using **Node.js**, **Express.js**, and **MongoDB**. It provides the necessary API routes for job postings, user management, company registration, and job applications.

Key features include:
- **Authentication Middleware**: Protects routes by verifying JWT tokens.
- **Role-based Access**: Admin and user roles for controlling access to specific routes.
- **File Uploads**: **Multer** middleware for handling file uploads (e.g., profile pictures).
- **Job and Application Management**: CRUD operations for jobs and applications.

## Environment Variables

Make sure to configure the backend with the necessary environment variables in a `.env` file located in the `server` directory.

### Example `.env` File:

```env
JWT_SECRET_KEY=your_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=5000
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```
## Contributing

Feel free to fork the repository, create a new branch, and submit a pull request for improvements or bug fixes. Please ensure that you:

- Write tests for any new features or changes.
- Provide documentation for any new functionality or changes to existing features.
- Follow the code style and conventions used in the project.
- Ensure that your changes do not break existing functionality.

To contribute:

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/job-portal.git
3. Make Your Changes

Make the necessary changes, such as fixing bugs, adding new features, or improving documentation. Once done, ensure everything works by running the development server:

```bash
npm run dev
```
3. Commit your changes:
   ```bash
       git commit -m "Description of your changes"
    ```
4.Push your changes to your fork:
```bash
git push origin your-feature-branch
```
5.Open a pull request to the main repository with a clear description of your changes.



