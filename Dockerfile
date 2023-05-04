
FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g pnpm && pnpm install

COPY . .
EXPOSE 5173

CMD ["pnpm", "run", "dev"]


#docker run -p 5173:5173 front
