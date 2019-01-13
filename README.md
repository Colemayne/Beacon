# Beacon Setup Instructions
###########################

# Once you want to test your feature / run Beacon you must do the following:

## From the main Beacon directory run: './gradlew clean'

## From the main Beacon directory run: './gradlew compileApp'

## This will create a directory called 'build' and within that 'services'.

## You can either run all three severs from seperate terminals OR add a '&' to the end of the command. This will require you to kill the process manually.

## To run the servers, go to the 'build/services' directory and run: 'java -jar serviceYouWantToRun.jar'  Then navigate to proper port in a browser.

### WebServer: 8080
### Web-API: 8081
### Web-Twilio-API: 8082
