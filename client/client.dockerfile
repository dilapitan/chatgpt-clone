# Use official Node.js image as base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# RUN npm run build

# Expose the port Next.js runs on (by default 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]
