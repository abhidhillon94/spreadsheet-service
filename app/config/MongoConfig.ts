import Logger from '@app/config/Logger';
import mongoose from 'mongoose';

export default async function mongoSetup() {
    return new Promise((resolve, reject) => {
        try {
            (mongoose as any).Promise = global.Promise;
            mongoose.set('debug', true);
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.connect(process.env.DB_MONGO_HOST, { useNewUrlParser: true }).then(() => {
                Logger.info('Connected to mongodb');
                resolve(true);
            }).catch((error) => {
                Logger.info('can not connect to mongodb');
                Logger.info({error});
            });
            const Str = mongoose.Schema.Types.String as any;
            Str.checkRequired((v) => v != null);
        } catch (error) {
            reject(error);
        }
        
    });
}
