FROM node:12.18.0
  
WORKDIR /WorldCovidData

ENV PATH /WorldCovidData/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./


CMD ["npm", "start"]