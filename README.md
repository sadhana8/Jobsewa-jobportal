# Job Portal (Next.js + MongoDB)

A full-stack Job Portal application built using **Next.js** (frontend & backend API routes) and **MongoDB** as the database.  
It includes **full form validation**, **role-based dashboards** (Job Seekers & Recruiters), and a **job recommendation algorithm** based on TF-IDF vectorization and cosine similarity.  
Deployed on **Vercel** for fast and reliable hosting.

---

## 🚀 Features

- **Authentication & Authorization**
  - Email/Password login & registration
  - Role-based access (Job Seeker / Recruiter)
  - JWT authentication

- **Job Posting & Management**
  - Recruiters can post, edit, and delete jobs
  - Geo-location radius filter for nearby jobs

- **Job Applications**
  - Job Seekers can apply to jobs
  - Track applied jobs and saved jobs

- **Recommendation System**
  - TF-IDF vectorization on job descriptions
  - Cosine similarity to match skills with job postings
  - Recent & relevant jobs prioritized

- **Form Validation**
  - `express-validator` & custom validation hooks
  - Prevents empty fields, invalid emails, weak passwords, etc.

- **Responsive UI**
  - Built with **Tailwind CSS**
  - Dark mode support
  - Mobile-friendly design

---

## 📂 Tech Stack

**Frontend & Backend**:
- [Next.js](https://nextjs.org/)
- API routes for backend logic

**Database**:
- [MongoDB](https://www.mongodb.com/)
- Mongoose ODM

**Authentication**:
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- bcrypt for password hashing

**Validation**:
- express-validator
- Custom client-side validation

**Styling**:
- Tailwind CSS
- shadcn/ui components

**Deployment**:
- Vercel

**Algorithms**:
- [natural](https://www.npmjs.com/package/natural) for TF-IDF
- Cosine Similarity calculations

---

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables
Create a .env.local file in the root directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
Run locally

bash
Copy
Edit
npm run dev
Build for production

bash
Copy
Edit
npm run build
npm start
📡 API Endpoints
Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login user

Jobs
POST /api/job/create → Create a job (Recruiter only)

GET /api/job/list → List all jobs

GET /api/job/recommended → Get recommended jobs for a user

PUT /api/job/update/:id → Update a job (Recruiter only)

DELETE /api/job/delete/:id → Delete a job

Applications
POST /api/job/apply/:id → Apply for a job

GET /api/job/applied → Get user’s applied jobs

🧠 Recommendation Algorithm
We use TF-IDF (Term Frequency – Inverse Document Frequency) and Cosine Similarity to suggest jobs:

Convert job descriptions and user skills into TF-IDF vectors.

Use cosine similarity to measure closeness between the user and each job.

Sort jobs by similarity score and prioritize recent ones.

Formula:

ini
Copy
Edit
similarity = (A · B) / (||A|| * ||B||)
Where A and B are TF-IDF vectors.

🌍 Deployment (Vercel)
Push your project to GitHub.

Go to Vercel and import your repo.

Add your .env variables in the Vercel dashboard.

Deploy with one click.

✅ Validation Rules
Registration

Name: Required, min length 3

Email: Valid format, unique

Password: Min length 6, must contain letters & numbers

Job Posting

Title: Required

Description: Min length 20

Skills: At least one required

Location: Required

📸 Screenshots
(Add screenshots of your UI here)

📜 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

If you want, I can also add **a diagram** showing how the TF-IDF + cosine similarity recommendation works in your README so it looks more professional and visual. That would make recruiters and contributors understand it instantly.







You said:
also add place to show demo to provide link of vercel


ChatGPT said:
Got it ✅
I’ll add a "Live Demo" section in the README where you can put your deployed Vercel link.

Here’s the updated README with that included:

markdown
Copy
Edit
# Job Portal (Next.js + MongoDB)

A full-stack Job Portal application built using **Next.js** (frontend & backend API routes) and **MongoDB** as the database.  
It includes **full form validation**, **role-based dashboards** (Job Seekers & Recruiters), and a **job recommendation algorithm** based on TF-IDF vectorization and cosine similarity.  
Deployed on **Vercel** for fast and reliable hosting.

---

## 🔗 Live Demo

🚀 **[View the Live Application](jobsewa-jobportal-five.vercel.app)**  
_(Replace the link above with your actual Vercel deployment URL)_

---

## 🚀 Features

- **Authentication & Authorization**
  - Email/Password login & registration
  - Role-based access (Job Seeker / Recruiter)
  - JWT authentication

- **Job Posting & Management**
  - Recruiters can post, edit, and delete jobs
  - Geo-location radius filter for nearby jobs

- **Job Applications**
  - Job Seekers can apply to jobs
  - Track applied jobs and saved jobs

- **Recommendation System**
  - TF-IDF vectorization on job descriptions
  - Cosine similarity to match skills with job postings
  - Recent & relevant jobs prioritized

- **Form Validation**
  - `express-validator` & custom validation hooks
  - Prevents empty fields, invalid emails, weak passwords, etc.

- **Responsive UI**
  - Built with **Tailwind CSS**
  - Dark mode support
  - Mobile-friendly design

---

## 📂 Tech Stack

**Frontend & Backend**:
- [Next.js](https://nextjs.org/)
- API routes for backend logic

**Database**:
- [MongoDB](https://www.mongodb.com/)
- Mongoose ODM

**Authentication**:
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- bcrypt for password hashing

**Validation**:
- express-validator
- Custom client-side validation

**Styling**:
- Tailwind CSS
- shadcn/ui components

**Deployment**:
- Vercel

**Algorithms**:
- [natural](https://www.npmjs.com/package/natural) for TF-IDF
- Cosine Similarity calculations

---

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sadhana8/Jobsewa-jobportal.git
   cd job-portal
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables
Create a .env.local file in the root directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
Run locally

bash
npm run dev
Build for production

bash
npm run build
npm start
📡 API Endpoints
Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login user

Jobs
POST /api/job/create → Create a job (Recruiter only)

GET /api/job/list → List all jobs

GET /api/job/recommended → Get recommended jobs for a jobseeker

PUT /api/job/update/:id → Update a job (Recruiter only)

DELETE /api/job/delete/:id → Delete a job

Applications
POST /api/job/apply/:id → Apply for a job

GET /api/job/applied → Get user’s applied jobs

🧠 Recommendation Algorithm
We use TF-IDF (Term Frequency – Inverse Document Frequency) and Cosine Similarity to suggest jobs:

Convert job descriptions and user skills into TF-IDF vectors.

Use cosine similarity to measure closeness between the user and each job.

Sort jobs by similarity score and prioritize recent ones.

Formula:

ini
Copy
Edit
similarity = (A · B) / (||A|| * ||B||)
Where A and B are TF-IDF vectors.

🌍 Deployment (Vercel)
Push your project to GitHub.

Go to Vercel and import your repo.

Add your .env variables in the Vercel dashboard.

Deploy with one click.

✅ Validation Rules
Registration

Name: Required, min length 3

Email: Valid format, unique

Password: Min length 6, must contain letters & numbers

Job Posting

Title: Required

Description: Min length 20

Skills: At least one required

Location: Required

📸 Screenshots
(![Add screenshots of your UI here](<Screenshot 2025-08-14 211037.png>) ![Add screenshots of your UI here](<Screenshot 2025-08-14 212133.png>) ![Add screenshots of your UI here](<Screenshot 2025-08-14 212334.png>) ![Add screenshots of your UI here](<Screenshot 2025-08-14 212545.png>) ![Add screenshots of your UI here](<Screenshot 2025-08-14 212810.png>) ![Add screenshots of your UI here](<Screenshot 2025-08-14 212837.png>))

📜 License
This project is licensed under the MIT License.
