# stage1 as builder
FROM node:16  as builder
#ENV REACT_APP_API_URL=https://reformtrackerapiv1.azurewebsites.netss
ENV REACT_APP_BACKEND=https://aidchannelapiv0.data4jobs.com/
ENV REACT_EDITOR=atom
ENV REACT_APP_FRONT = https://aidchannel.org/
ENV SKIP_PREFLIGHT_CHECK=true


WORKDIR /app
COPY ./package.json /app/
COPY ./jsconfig.json /app/
RUN npm install react-scripts -g
# RUN npm install react-scripts -g
# RUN npm install
RUN yarn  install
COPY ./public /app/public
COPY ./src /app/src
#COPY ./mdbreact-4.25.0.tgz /app/
RUN GENERATE_SOURCEMAP=false  SKIP_PREFLIGHT_CHECK=$SKIP_PREFLIGHT_CHECK  REACT_APP_BACKEND=$REACT_APP_BACKEND REACT_EDITOR=$REACT_EDITOR REACT_APP_FRONT=$REACT_APP_FRONT react-scripts build

FROM nginx:alpine
# RUN apt-get install -y nginx-extras
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page123
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]



# # stage1 as builder
# FROM node:14

# WORKDIR /

# COPY ./package.json /
# RUN npm install
# #RUN mkdir /src
# COPY ./ /
# COPY ./public /public
# COPY ./src /src

# EXPOSE 80

# CMD ["npm", "run", "prod"]
