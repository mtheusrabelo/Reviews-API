const isLive = () => async () => true;

const isReady = ({ database, cache }) => async () => {
    // must be able to access database
    const rows = await database.query('SELECT now();', { raw: true });
    if (!rows) {
        throw new Error('Database not available');
    }

    // must be able to access cache
    await cache.set('now', rows);
    const cachedNow = await cache.get('now');
    if (!cachedNow) {
        throw new Error('Cache not available or too slow');
    }
};

module.exports = (args) => ({
    isLive: isLive(args),
    isReady: isReady(args)
});
