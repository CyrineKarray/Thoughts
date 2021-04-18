FROM node:10
WORKDIR /app/authService
COPY package.json /app/authService
RUN npm install \
    # Install server and generator.
    && npm uninstall bcrypt \
    # Write entrypoint.
    && npm install bcrypt@5.0.0 \
    && npm rebuild bcrypt --build-from-source
COPY . /app/authService
CMD ["npm","start"]