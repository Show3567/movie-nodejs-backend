# Choose a base image with Node.js
FROM node:20-alpine as build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache to avoid stale data
RUN npm cache clean --force

# Install project dependencies
RUN npm ci

# Bundle app source
COPY . .
# Build the NestJS app
# RUN npm run set:pro

RUN npm run build:pro

# Stage 2: Serve the Angular SSR app using Node.js
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built SSR output from the build stage
COPY --from=build /app/dist /app/dist

# Copy only the necessary files for running the SSR server
COPY --from=build /app/package*.json /app/

# Install only production dependencies
RUN npm ci --only=production

# Expose the running port
EXPOSE 3344

# Command to run the app
CMD ["npm", "run", "start:pro"]
