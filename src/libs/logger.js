export default {
    log: (...args) => {
        let stringifiedArgs = '';
        try {
            args.forEach((arg) => {
                if (arg instanceof Error) {
                    stringifiedArgs += ` :: ${arg.message}`;
                    return;
                }
                stringifiedArgs += ` :: ${JSON.stringify(arg)}`;
            });
        } catch (err) {
            stringifiedArgs += `:: Internal logger error :: ${err.message}`;
        }
        // eslint-disable-next-line
        console.log(`${stringifiedArgs}`.substr(4));
    },
};
