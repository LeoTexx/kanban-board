# Use a specific Node.js version as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy prisma to the working directory
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the entire source code to the working directory
COPY . .

# Set environment variables during the build process
ARG DATABASE_URL
ARG AUTH_USERNAME
ARG AUTH_PASSWORD
ARG JWT_SECRET

RUN echo "DATABASE_URL=$DATABASE_URL" >> .env
RUN echo "AUTH_USERNAME=$AUTH_USERNAME" >> .env
RUN echo "AUTH_PASSWORD=$AUTH_PASSWORD" >> .env
RUN echo "JWT_SECRET=$JWT_SECRET" >> .env

# Build the application
RUN npm run build

# Expose the port that your application is listening on
EXPOSE 3333

# Define the command to start your application
CMD ["npm", "start"]
