# Use the official Node.js image as the base image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

COPY .env ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the Nest.js application
RUN npm run build

# Use a smaller base image for the final stage
FROM node:20-alpine AS prod

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

COPY .env ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the built application files from the build stage
COPY --from=build /app/dist ./dist

# Expose the port your Nest.js application is listening on
EXPOSE 3000

# Command to start your Nest.js application
CMD [ "node", "dist/main" ]