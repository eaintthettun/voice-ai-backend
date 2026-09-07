# Personal Workspace Diary API

## 🔗 Project Repositories

- 📱 **Frontend (React Native):** [View Repository](https://github.com/eaintthettun/voice-ai-frontend)
- 🖥️ **Backend (Node.js + Express):** [View Repository](https://github.com/eaintthettun/voice-ai-backend)
- 🤖 **AI Service (Python + Flask):** [View Repository](https://github.com/eaintthettun/voice-ai-python-service)

## Project structure
    src/
    ├── controllers/
    ├── services/
    ├── repositories/
    ├── routes/
    ├── middleware/
    └── app.js

## Features
- 🎤 Voice Recording
- 🤖 AI Classification
- 🔍 Search & Filters 
- 📊 Statistics Dashboard
- 📈 Weekly Summary
- ✏️ Edit Transcript
- ▶️ Audio Playback
- ⭐ Favorite / Pin Notes
- 📄 Export to PDF or CSV

## Technologies used
- Javascript
- Node.js
- Express.js
- Prisma orm
- Bcrypt.js
- Json Web Token
- Multer

## API table
| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| POST   | `/auth/register`                   | Register user             |
| POST   | `/auth/login`                      | Login                     |
| GET    | `/diaryEntries`                    | Get user's diary entries  |
| GET    | `/diaryEntries/recent`             | Get recent diary entries  |
| GET    | `/diaryEntries/searchKeyword`      | Search diary              |
| POST   | `/diaryEntries/transcribe`         | Upload audio and classify |
| POST   | `/diaryEntries`                    | Create diary entry        |
| GET    | `/diaryEntries/dateRange`          | Filter by date            |
| GET    | `/diaryEntries/category/:category` | Filter by category        |
| GET    | `/diaryEntries/favorites`          | Get favorite entries      |
| GET    | `/diaryEntries/:id`                | Get diary detail          |
| PUT    | `/diaryEntries/:id`                | Edit diary                |
| DELETE | `/diaryEntries/:id`                | Delete diary              |
| PATCH  | `/diaryEntries/:id/favorite`       | Toggle favorite           |

## How to use the app:
- download visual studio code >> https://code.visualstudio.com/download?_exp_download=fb315fc982
- download mongodb community server >> https://www.mongodb.com/try/download/community 
- download mongodb compass >> https://www.mongodb.com/try/download/compass
- download postman >> https://www.postman.com/downloads/

After downloading mongodb community server, we need to convert it into a replica set so that prisma orm can connect with mongodb. To do that, 
- go to services.msc
- then, type mongodb community server and stop it
- then, go to C:/Program Files/MongoDB/Server/8.3/bin/mongod.cfg
- open that file and write 
`
replication:
  replSetName: "rs0"
`
- then, save it with administrator access
- start the mongodb community server again
- go to mongodb compass
- go to advanced connection option
- check direct connect **on**
- then, open mongosh and type **rs.initiate()**
- if it returns json, then you are good to go!

## Installation
- clone this repo using git clone `url`
- npm install

## Prisma ORM installation
- npx prisma init --datasource-provider mongodb
- npx prisma generate

Note: to sync the database, use command **npx prisma db push**

## Set up environment variables

    Create a .env file or use a .env.local template I have provided and fill necessary fields :

    DATABASE_URL="your_db_connection_string"
    JWT_SECRET="your_secret_key"

    ## 📁 Example .env

        DATABASE_URL="mongodb://localhost:27017/your_db_name"
        JWT_SECRET="your_secret_key"

## To start the server
    use `npm run dev`
    After starting it, the app will run at `http://localhost:3000`

## For protected routes, they require `Authorization: Bearer <JWT_TOKEN>`

## 🤖 AI Service

The AI service is implemented separately using Python and Flask.

The Node.js backend communicates with the Python service through HTTP requests
for audio transcription and ML-based category classification.

👉 [View AI Service Repository](https://github.com/eaintthettun/voice-ai-python-service)