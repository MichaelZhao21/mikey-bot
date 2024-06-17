FROM node:20-alpine AS build
WORKDIR /app

ENV NODE_ENV production

COPY package*.json /app
COPY --chown=node:node src /app/src
COPY tsconfig.json /app

RUN npm ci
RUN npm install -g typescript
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app

ENV NODE_ENV production

COPY --from=build --chown=node:node /app/build/* /app
COPY --from=build --chown=node:node /app/build/commands /app/commands
COPY --from=build --chown=node:node /app/node_modules/ /app/node_modules/

ENV TOKEN=$TOKEN
ENV CLIENT_ID=$CLIENT_ID
ENV GUILD_ID=$GUILD_ID

CMD ["node", "/app/index.js"]
