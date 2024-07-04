# Choose a base image with Node.js
FROM node:18
# Create app directory
WORKDIR /app
# Install app dependencies
# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .
# Build the NestJS app
# RUN npm run set:pro

RUN npm run build:pro

# Expose the running port
EXPOSE 3344

# Command to run the app
CMD ["npm", "run", "start:pro"]

# # Command to run the app
# CMD ["npm", "run", "start:dev"]