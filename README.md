# icompML

Steps to run:

1 - Install docker -> https://docs.docker.com/engine/install/

2 - Run this command to run a mysql container with docker: 

docker run --name mySQL -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=icompML -d mysql:latest

3 - Instal node -> https://nodejs.org/en/download/

3.5 - Optional, install yarn -> https://classic.yarnpkg.com/en/docs/install/ (do not install version > 2.0)

4 - Inside backend folder, run -> 'npm install'; after, run -> 'npm dev'; With this, all tables was created in mysql;


5 - Inside pythonScript, run -> 'pip install -r requirements.txt';  after run -> 'python main.py';

***** BUG FIX *****
If you get this error when run 'pip install -r requirements.txt'

message error: error: command 'x86_64-linux-gnu-gcc' failed with exit status 1

Check this link: https://stackoverflow.com/questions/26053982/setup-script-exited-with-error-command-x86-64-linux-gnu-gcc-failed-with-exit

6 - To run react app, inside frontend, run -> (npm or yarn) install, after this, run -> (npm or yarn) start
