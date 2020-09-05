ARG APP_DIR=/usr/src/app

# build environment
FROM node:13-alpine as builder
ARG APP_DIR

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
ADD . ${APP_DIR}

RUN npm i && npm run build

# deploy environment
FROM nginx:alpine
ARG APP_DIR
# Copy needed files
COPY --from=builder ${APP_DIR}/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ${APP_DIR}/dist /usr/share/nginx/html

EXPOSE 80
