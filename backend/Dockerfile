FROM openjdk:11

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g serverless

WORKDIR /usr/src/dynamodb

EXPOSE 8000
CMD [ "sls", "dynamodb", "start" ]
