# Proces Back-end

# Eerste week
Opzetten van een Express server met een aantal static files
dependencies:
' npm install express'
devdependencies:
' npm install nodemon --save-dev nodemon'

## Tweede week
Nieuwe opzet mappenstructuur  
--views  
---pages  
----*pages like index and about*   
---partials  
----*pieces of pages like head,header and footer*  

Voor het gebruik van ejs templates de volgende module:  
'npm install ejs'
Sources
EJS-templating:
+ [title]https://scotch.io/tutorials/use-ejs-to-template-your-node-application
+ [title]https://ejs.co/

Waarom zou iik routes gebruiken en niet app.get?
Theorie: DRY (Do not repeat yourself)

## week 3

## week 4

## week 5

## week 6

## Table of contents

1. [Description of project](#Description of project)
2. [Status](#Status)
3. [Install](#Install)
4. [Contact](#Contact)

# Description of project
This project contains a datingwebsite build with NodeJS and MongoDB. The main purpose of the datingwebsite is to connect people online to meet offline during a date. This website is build for the Back-end course of the Communication and Multimedia design studies at the Amsterdam University of Applied Sciences.

// GIF DESIGN

# Status
This project should be at a proof of concept level at the end of the project.

## Main requirements
 - A user should be able to register an account
 - A user should be able to log-in
 - A user should be able to add a new date
 - A user should be able to see the details of a date
 - A user should be able to subscribe for a date
 - A user should be able to change its profile

## To do
- Login verification
- Stylize the overview and detailpage
- Add function to subscribe for a date

# Install
To run this project locally, clone this repo to a folder of your own preference.

One way to make this work:
1. Create folder
2. Open this folder in your terminal
3. Enter "Git init"
4. Enter "Git clone https://github.com/jelub2/backend2020.git"
5. While still in this folder enter: "NPM Install"
 The project will be installed locally.

In order to interact with the project it's needed to connect a MongoDB database to it. For example you could use a free MongoDB Atlas instance, which is an online database provided by MongoDB. Check out this page for more information: https://www.mongodb.com/cloud/atlas.

When you got a MongoDB database running you can connect it to the project by adding a .env file to the project. In this file the following needs to be added:
MONGODB_URI = <url to database>
Make sure the username and password of the database are in the url.

Now you can run the project by entering "NPM Start" in the terminal

The project should run on: http://localhost:3000

# Contact
By any issues, hints or improvements, please send in a new issue in at this repo.
