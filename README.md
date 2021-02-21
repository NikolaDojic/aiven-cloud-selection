# aiven cloud selection task 

## _META_
This is not separated into two repositories only because the task description implies that there should be one repo,
otherwise, I would argue that we are better off with separate repositories for server and client apps.

## Requirements
To run the backend application it is necessary to have [python 3.6](https://www.python.org/downloads/) or higher installed.
This project is built with the virtual environment in mind, but it should already be installed (it ships with python 3.3 or higher).
We will also need [nodejs 10.16](https://nodejs.org/en/) or later and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (it usually comes with node) to run the frontend app in the development environment.

## Getting started
From here we assume that you have [nodejs](https://nodejs.org/en/), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [python 3](https://www.python.org/downloads/) installed.

We must first clone the repository.

Open terminal and run `git clone git@github.com:NikolaDojic/aiven-cloud-selection.git ; cd aiven-cloud-selection`.

Run `./init_script` to set up the environment and install dependencies.

This script will create the virtual environment in the flask_app directory and install necessary libraries, for both flask and react applications.

If the script fails, we will need to manually install the dependencies listed in `requirements.txt` and `package.json` for the flask and the react app respectively.

## Running the applications

### Flask
After script is done installing, go to flask_app directory `cd flask_app` and run `./start` script.

If the script fails, to run the app, first activate the virtual environment. It should be in the `flask_app/venv` folder, 
change directory to `flask_app/code` and run `python app.py` 

This should start the development server. It is possible to get an error if port 5000 is already in use.

If that is the case port can be changed in `flask_app/code/app.py` and `react_app/src/config.ts` files.
Ports must be equal in both files.

### React 
To start the react application, open the terminal and position yourself in the react_app directory, then run `npm start`

## Tests

To run the tests for the backend application go to `flask_app/code/` directory and run `./run_tests` script.

To run the tests for the backend application go to `react_app/` directory and run `npm run tests`.
