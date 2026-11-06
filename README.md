# WebDev001
This is an app which allows users to register and login whether through email or google.
Additionally, users are able to create and edit their own newsletters.


What was used?

Next.js
Auth.js
prisma - 7.10.1
Tailwind CSS and DaisyUI

#### Prerequisites

Node.js
npm
PostgreSQL database


### Install Dependencies

npm install

### Set up env variables

- Create a ".env" file in the project root:

Generate with "npx auth secret"
AUTH_SECRET="Your generated secret"
DATABASE_URL="Your database connection string"

### Google ones are not a must
AUTH_GOOGLE_ID="Your google client ID"
AUTH_GOOGLE_SECRET="Your google client seed"

### Set up database

npx prisma migrate dev
npx prisma generate

### Run the server

npm run dev

Open http://localhost:3000

### Using the App

The user will have to either create an account or login
They will then be able to create newsletters by either going to the "dashboard" or by going to "Create Newsletter" tab in the Navbar




