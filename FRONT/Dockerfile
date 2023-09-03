# Use a specific Node.js version as the base image for the build stage
FROM node:16 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the entire source code to the working directory
COPY . .

# Build the application using yarn
RUN yarn build

# Use the official Nginx image as the base image for serving the React app
FROM nginx:alpine

# Copy the build output from the previous stage to the default Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port that Nginx listens on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
