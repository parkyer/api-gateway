FROM node:carbon-slim
# Create app directory
WORKDIR /parkyer-getway

# Install app dependencies
COPY package.json /parkyer-getway/
RUN npm install

# Bundle app source
COPY . /parkyer-getway/
RUN chown node:node /usr/src/app
USER node
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
