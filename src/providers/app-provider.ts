// Express
import ExpressProvider from '@providers/express-provider';

class AppProvider {

    public init(): void {
        ExpressProvider.init();
    }

}

export default new AppProvider();