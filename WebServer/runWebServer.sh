#!/bin/bash
# Starts Beacon Webserver for testing.
# 10/1/18
SCRIPT_PATH=$(dirname $(which $0))

echo "Building Web App with Gradle..."
$SCRIPT_PATH/gradlew build
echo "Building Complete..."

echo "Starting Web App with Spring Boot..."

COUNTDOWN=5
while [ "$COUNTDOWN" != "0" ]; do
echo $COUNTDOWN
COUNTDOWN=$(expr $COUNTDOWN - 1)
sleep 1
done

java -jar $SCRIPT_PATH/build/libs/beacon-webapp*.jar
