FROM node:alpine3.19
ADD ../../../client/ /
RUN npm ci
CMD ['npm', 'run', 'build']
