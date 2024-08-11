# Use the official Node.js image.
FROM node:14

WORKDIR /usr/src/app
COPY package.json ./


RUN npm install

# Copy the local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]


EXPOSE 3000
