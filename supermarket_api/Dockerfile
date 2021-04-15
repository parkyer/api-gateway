FROM node:carbon-slim
# Create app directory
WORKDIR /parkyer-getway

# Install app dependencies
COPY package.json /parkyer-getway/
RUN npm install
RUN npm config set unsafe-perm true

# Bundle app source
COPY . /parkyer-getway/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
