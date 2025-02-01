# Dockerfile
FROM node:23

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start:prod"]