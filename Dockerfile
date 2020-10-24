FROM node:12.18.2-slim AS base
    ENV APPDIR /app
    EXPOSE $PORT
    WORKDIR $APPDIR
    ADD . $APPDIR

FROM base AS development
    ENV MUID 1001
    ENV MGID 1001
    RUN addgroup --gid $MGID --system appuser && \
        adduser --uid $MUID --system appuser --gid $MGID
    RUN chown -R appuser:appuser $APPDIR
    USER appuser
    ENTRYPOINT ["/app/entrypoint.sh"]

FROM base AS production
    ENV NODE_ENV production
    RUN yarn install --production
    CMD yarn run start
