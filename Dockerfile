FROM ubuntu:latest

RUN mkdir apptests/
WORKDIR apptests

COPY package.json ./
COPY src ./src
COPY tests ./tests

# TODO: proper Docker building would ocmbine more of these steps
RUN apt-get clean && apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN apt-get install -y wget xvfb unzip

# chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update -y
RUN apt-get install -y google-chrome-stable

# chromedriver
ENV CHROMEDRIVER_VERSION 85.0.4183.87
ENV CHROMEDRIVER_DIR /chromedriver
RUN mkdir $CHROMEDRIVER_DIR
# RUN curl https://chromedriver.storage.googleapis.com/86.0.4240.22/chromedriver_linux64.zip -o /usr/local/bin/chromedriver
# RUN chmod +x /usr/local/bin/chromedriver
RUN wget -q --continue -P $CHROMEDRIVER_DIR "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip"
RUN unzip $CHROMEDRIVER_DIR/chromedriver* -d $CHROMEDRIVER_DIR
ENV PATH $CHROMEDRIVER_DIR:$PATH

RUN npm i

# TODO: make a waiter function somewhere to make sure the server is running
CMD npm start & npm test