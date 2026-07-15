# API For Personal Workspace Diary Mobile App

## Features
- 🎤 Voice Recording
- 🤖 AI Classification
- 📅 Daily / Weekly / Monthly Diary
- 🔍 Search & Filters
- 📊 Statistics Dashboard
- 📈 AI Weekly Summary
- ✏️ Edit Transcript & Category
- ▶️ Audio Playback
- ⭐ Favorite / Pin Notes
- 📄 Export to PDF or CSV

## Technologies used
- Javascript
- Node.js
- Express.js
- Prisma orm
- Bcrypt.js

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
