# dr-help

Doctor Help is an open source online web health service with a dark mode twist.
At it's core, dr-help is an online tool for booking your next doctor visits. 

## Sign in, get help.
The following instructions will help you make your own copy of the source code,  and as a developer provide an outline with installation steps. 
For a user experience, check out the deployment section, provided further down below.


### Prerequisites
As a developer, here's what you'll need to install the app, and how to run it.

* [Java 8](http://www.dropwizard.io/1.0.2/docs/) or larger
* [Maven](https://maven.apache.org/)
* [pgAdmin4] (https://www.pgadmin.org/)
* [npm](https://www.npmjs.com/) - Used to start up the react
* your preferred IDE.


### Installation
To run the project, follow the steps below.
```
Back end:
 - Download the main repository via your preferred choice, eg. by git cloning https://github.com/tiberlas/Doctor-Help.git
 - Run pgAdmin4 and create a new database 'dr_help'.
 - Open up your IDE and import as maven project, from dr_help root and run DrHelpApplication.java
 - Alternatively, go to the dr_help subfolder, with cmd run:
	mvn compile	
	mvn exec:java -Dexec.mainClass=com.ftn.dr_help.DrHelpApplication.java<br/>


React:
 checkout to react/drhelp_react subfolder with npm cmd
 npm install
 npm start
```

## Deployment
* On the other hand, app is also deployed via [heroku](https://heroku.com) on https://dr-help.herokuapp.com
* Deployment repo: --to be added.


### Authors of this hippie magic beast app.
* [Nikola](https://github.com/rsnikola)
* [Tibor](https://github.com/tiberlas)
* [Dušan](http://github.com/n-dusan)





