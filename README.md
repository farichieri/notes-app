## 3. Technologies

### Frontend:

- TypeScript
- NextJs (ReactJs)
- Redux Toolkit
- Redux Toolkit Query
- Redux Persist

### Backend

- TypeScript
- NestJs (NodeJs)
- PostgreSQL
- TypeORM
- Auth: Jwt & bcrypt

- All routes are protected with JWT
- Both phases of the user stories are completed

## Prerequisites

The following software is required to run this application:

- TypeScript: 5.2.2
- Node.js: 19.8.1
- npm: 9.5.1
- React.js: 18.x
- Next.js: 14.x
- nest: 10.2.1
- PostgreSQL: 16.0

## Installation

1. Clone the repository: `git clone https://github.com/ensolvers-github-challenges/Richieri-214844`
2. Fill the .env files in both frontend and backend folders. (.env.example)
3. Navigate to the frontend project directory: `cd frontend`
4. Install the dependencies: `npm install`
5. Start the application: `npm run dev`
6. Navigate to the backend project directory: `cd backend`
7. Install the dependencies: `npm install`
8. Start the application: `npm run start`

## Run with Docker-compose

1. Run `docker compose build`
2. Run `docker compose up -d`

## Run deployed app

- Deployed app: [https://notes-app-alpha-seven.vercel.app/](https://notes-app-alpha-seven.vercel.app/)
- Register or Login with `test@test.com` `12345678`
- there are 3 pages in the app: `/` `/app` `/app/categories`
- Perform CRUD operations with notes
- Perform CRUD operations with categories
- Filter notes w/ isArchived
- Filter notes w/ the categories created

## Demo

Please go to this [link](https://www.loom.com/share/d644901b5e184599a100075625dd1002) to see a video demo
