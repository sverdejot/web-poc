FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
ADD package*.json /app/
RUN npm ci

FROM base AS build
ADD . .
RUN npm run build

FROM base AS prod-deps
ADD package*.json /app/
RUN npm ci --only=production && npm cache clean --force

FROM base AS app
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/
RUN chown -R node /app
USER node

EXPOSE 3000
CMD [ "node", "apps/backend/main" ]
