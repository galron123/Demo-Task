FROM artifactory.rnd-hub.com:5011/node:14-alpine as base

WORKDIR /app
COPY package.json .


FROM base AS development

ENV NODE_ENV development

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

FROM development as test

RUN npm run test:full --ci --
RUN mkdir -p /tmp/jenkins/workspace && cp test-report.xml /tmp/jenkins/workspace/test-report.xml
# ---

FROM base as release

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=production
COPY . .
COPY --from=development --chown=node:node /app/dist ./dist

USER node

CMD ["node", "dist/main"]
