# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the local source code to the container
COPY . .

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
