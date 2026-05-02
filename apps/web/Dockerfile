FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable
COPY package.json ./
RUN pnpm install

FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY --from=build /app ./
EXPOSE 3000
CMD ["pnpm", "start"]
