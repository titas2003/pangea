FROM node:lts-alpine3.23
WORKDIR /app
COPY package.json .
RUN npm install
ENV PORT 3000
ENV MONGO_URI "mongodb+srv://admin:admin@aws-dmo.bsoplpt.mongodb.net/projectX"
ENV JWT_SECRET secret
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]