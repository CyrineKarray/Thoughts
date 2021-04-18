FROM node:10
WORKDIR /app/reactuiService
COPY package.json /app/reactuiService
RUN npm install
COPY . /app/reactuiService
CMD ["npm","start"]