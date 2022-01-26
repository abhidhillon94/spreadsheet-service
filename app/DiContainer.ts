import TestController from "./controllers/TestController";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware";

class DiContainer {
    
    // repositories

    // services

    // controllers
    public readonly testController = new TestController();

    // middlewares
    public readonly errorHandlerMiddleware = new ErrorHandlerMiddleware();
}

export default new DiContainer();
