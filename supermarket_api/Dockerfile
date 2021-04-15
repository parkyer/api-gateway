FROM node:carbon-slim
# Create app directory
WORKDIR /parkyer-getway
USER root
# Install app dependencies
COPY package.json /parkyer-getway/
RUN npm install

# Bundle app source
COPY . /parkyer-getway/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
