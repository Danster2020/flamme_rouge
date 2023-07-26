FROM node:16-alpine 

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

COPY . /app

# ==== BUILD =====
RUN yarn install --frozen-lockfile

RUN yarn build
RUN yarn build:server

# ==== RUN =======
ENV NODE_ENV production

# Start the app
CMD ["node", "-r", "esm", "./build/server/server.js"]