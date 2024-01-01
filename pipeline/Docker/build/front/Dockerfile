FROM node:alpine3.19
ADD ../../../../server/ /
RUN npm ci
CMD [ "npm", "run", "build" ]
