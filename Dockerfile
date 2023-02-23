FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
COPY package.json ./
COPY . .

# Install app dependencies
RUN npm install

# Bundle app source

RUN npm run build



EXPOSE 3000

CMD [ "npm", "start" ]
