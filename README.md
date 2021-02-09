# icompML

Steps to run:

1 - Install docker -> https://docs.docker.com/engine/install/

2 - Run this command to run a mysql container with docker: docker run --name mySQL -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=icompML -d mysql:latest

3 - Instal node -> https://nodejs.org/en/download/

4 - Inside backend folder, run -> npm install; after, run -> npm dev; With this, all tables was created in mysql;

5 - Inside pythonScript, run -> python main.py;

6 - To run react app, inside frontend, run -> (npm or yarn) install, after this, run -> (npm or yarn) start
