import mongoose from 'mongoose';
import logger from './logger';

const url = process.env.MONGO_URL || 'mongodb://mongodb:27017,mongodb2:27017,mongodb3:27017/reviews?replicaSet=reviewsSet&poolSize=10';
logger.log('Connecting with MongoDB', url);

mongoose.Promise = Promise;
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
        logger.log('MongoDB error', err);
    }
    mongoose.connection.db.createCollection('reviews');
    mongoose.connection.db.createCollection('ratings');
});

export default mongoose;
