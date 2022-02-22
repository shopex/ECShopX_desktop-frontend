FROM node:lts-alpine3.9
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk --no-cache add ca-certificates tzdata
    
ARG CMD
ARG VUE_APP_TITLE
ARG VUE_APP_HOST
ARG VUE_APP_API_BASE_URL
ARG VUE_APP_H5_PATH
ARG VUE_APP_TOKEN
ARG VUE_APP_TRACK
ARG VUE_APP_PUBLIC_PATH
ARG VUE_APP_COMPANYID
ARG VUE_APP_SAAS

ENV VUE_APP_TITLE ${VUE_APP_TITLE}
ENV VUE_APP_HOST ${VUE_APP_HOST}
ENV VUE_APP_API_BASE_URL ${VUE_APP_API_BASE_URL}
ENV VUE_APP_H5_PATH ${VUE_APP_H5_PATH}
ENV VUE_APP_TOKEN ${VUE_APP_TOKEN}
ENV VUE_APP_TRACK ${VUE_APP_TRACK}
ENV VUE_APP_PUBLIC_PATH ${VUE_APP_PUBLIC_PATH}
ENV VUE_APP_COMPANYID ${VUE_APP_COMPANYID}
ENV VUE_APP_SAAS ${VUE_APP_SAAS}

WORKDIR /app
COPY package*.json ./

#RUN npm config set registry https://registry.npm.taobao.org && npm config set @shopex:registry http://registry.npm.ishopex.cn
RUN npm config set registry https://registry.npm.taobao.org && npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ && npm config set @shopex:registry http://registry.npm.ishopex.cn
RUN npm ci

COPY . .

RUN ${CMD}

ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "start"]