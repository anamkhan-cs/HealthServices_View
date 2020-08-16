Health Passport (Health Services Side)
====================================

## DESCRIPTION

Health Passport is a system which can guarantee a safer class environment during COVID-19. This repo is
specifically for the student side application. To see the other two platforms (Professor side and Student side), you can go to

* https://github.com/cs394-s20/HealthTracker_Professor_View
* https://github.com/cs394-s20/HealthTracker_Student_View

This app shows what the Health Services office will see on their end. It supports the following functionality:

* The office can view the current status of the students.
* The office can view the past records of all students.
* The office can filter the table to view just unhealthy students.


## SYSTEM REQUIREMENTS

- Node v12.16.1
- npm 6.14 + (6.14.4 recommended)
- Mac OS (Catalina 10.15.5 +)


## INSTALLATION

To install, refer to how to start react apps at [React Getting Started](https://reactjs.org/docs/getting-started.html)


After downloading the repository, 

```bash
$ npm install .
```

If there are dependencies not installed this way, refer to the 'dependencies' section of the package.json.

## RUNNING

To run navigate to your repository via the
command line, and run the executable:

```bash
$ npm start
```

This will start up a app server running the React app on localhost 3000.

## CONFIG FILE

In order to create your own firebase database, you should 
- create a firebase account
- create a project
- create a real time database
- import the firebase_database_schema.json 
- copy the configurations from firebase into ./components/config.js
- create a img/ in firebase storage


## API DOCUMENTATION

The [Material UI](https://material-ui.com/) allows you to format 
your frontend.


## CONTRIBUTE

If you'd like to contribute to our project, start by forking the repo on GitHub:

https://github.com/cs394-s20/HealthServices_View

To get all of the dependencies, install the gem first. The best way to get
your changes merged back into core is as follows:

1. Clone down your fork
1. Create a thoughtfully named topic branch to contain your change
1. Hack away
1. If you are adding new functionality, document it in the README
1. Push the branch up to GitHub
1. Send a pull request to the HealthTracker_Student_View project.

## RELEASING

In order to release the project in public, you should configure your Firebase account to [allow deploying](https://firebase.google.com/docs/hosting/deploying).

## FUTURE IMPROVEMENTS

- One improvement which needs to be made is having an automated email system for when records are submitted. There should be an email send from the Health Services side to the student if the record is unhealthy for that day.
- Before production deployment, it would be ideal to incorporate the Canvas API and Caesar API of
your university.