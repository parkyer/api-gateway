FROM node:carbon-slim
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN chown node:node /usr/src/app
USER node
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
