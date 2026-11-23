FROM node:20-alpine

WORKDIR /app

COPY todo-backend/package*.json ./
RUN npm ci --omit=dev

COPY todo-backend/ ./

ENV NODE_ENV=production
ENV PORT=3002

EXPOSE 3002

CMD ["npm", "start"]
