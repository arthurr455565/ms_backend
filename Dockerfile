FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json ./

#Copy bun lock files
COPY bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile
RUN apt-get update -y && apt-get install -y openssl

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN bunx prisma generate

# Copy the rest of the application
COPY . .

# Build the application
RUN bun build src/index.ts --outdir dist --target bun

# Expose the port the app runs on
EXPOSE 3000

# Run database migrations and start the server
CMD ["sh", "-c", "bunx prisma migrate deploy && bun src/index.ts"]
