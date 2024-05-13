ARG NODE_VERSION=20

FROM node:${NODE_VERSION}

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

WORKDIR /

# USER node

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD node server.cjs