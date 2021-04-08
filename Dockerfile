FROM nginx

# Install Node.js and other dependencies
# RUN apt-get update && \
#     apt-get -y install curl && \
#     curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
#     apt-get -y install python build-essential nodejs

# RUN apt-get update
# RUN apt-get install curl
# RUN curl -sL https://deb.nodesource.com/setup_12.x | -E bash -
# RUN apt-get install -y nodejs

COPY dist/spa/ /usr/share/nginx/html/
COPY nginx/ /etc/nginx/

EXPOSE 80
