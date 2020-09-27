# README #

Used for fetching data from Bluelink and then publish data on Mqtt. Uses library from https://github.com/Hacksore/bluelink.

# Start #
# Install docker and docker compose #


# How to use #
Copy config/template.env to config/.env and update the variables.

Build the docker container or add it in the docker-compose.yml file. In docker-compose link the config folder to /usr/bluelink/config

The script runs every minute but will only query for data either when a file named slow.txt or fast.txt is present in the config folder. Slow will poll every five minute and fast every minute.
