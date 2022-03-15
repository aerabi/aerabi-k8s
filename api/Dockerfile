FROM node:16-slim as build

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build


FROM node:16-slim as run

# setup okteto message
COPY bashrc /root/.bashrc

WORKDIR /usr/src/app

ADD package.json .
RUN npm install --only=production

COPY --from=build /usr/src/app/dist dist

EXPOSE 3000

CMD npm run start:prod
