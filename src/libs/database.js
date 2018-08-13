import mongoose from 'mongoose';
import { promisify } from 'util';
import logger from './logger';

const url = process.env.MONGO_URL || 'mongodb://mongodb:27017/reviews?poolSize=10';
logger.log('Connecting with MongoDB', url);

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
        logger.log('MongoDB error', err);
    }
});

export const getModel = ({ name, schema }) => {
    const Model = mongoose.model(name, schema);
    return {
        find: promisify(Model.find).bind(Model),
        findOne: promisify(Model.findOne).bind(Model),
        findById: promisify(Model.findById).bind(Model),
        create: promisify(Model.create).bind(Model),
        findByIdAndUpdate: promisify(Model.findByIdAndUpdate).bind(Model),
        findOneAndUpdate: promisify(Model.findOneAndUpdate).bind(Model),
        findByIdAndRemove: promisify(Model.findByIdAndRemove).bind(Model),
    };
};
