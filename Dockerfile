# ==== CONFIGURE =====
FROM node:16-alpine 

# Set the working directory to /app inside the container
WORKDIR /app


# Copy app files
COPY package.json /app
COPY yarn.lock /app

COPY . .

# ==== BUILD =====
RUN yarn install --frozen-lockfile

RUN yarn build

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production

# Start the app
CMD ["node", "-r", "esm", "build/server/server.js"]