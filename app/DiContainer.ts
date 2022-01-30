import App from "./App";
import RowsController from "./controllers/RowsController";
import SheetsController from "./controllers/SheetsController";
import IControllers from "./interfaces/IControllers";
import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware";
import SchemaValidationMiddleware from "./middlewares/SchemaValidationMiddleware";
import RowsRepository from "./repositories/RowsRepository";
import SheetsRepository from "./repositories/SheetsRepository";
import Routes from "./routes/Routes";
import RowsService from "./services/RowsService";
import SheetsService from "./services/SheetsService";

class DiContainer {
    
    // repositories
    private readonly sheetsRepository = new SheetsRepository();
    private readonly rowsRepository = new RowsRepository();

    // services
    private readonly sheetsService = new SheetsService(this.sheetsRepository);
    private readonly rowsService = new RowsService(this.rowsRepository);

    // controllers
    public readonly controllers: IControllers = {
        v1: {
            sheetsController: new SheetsController(this.sheetsService),
            rowsController: new RowsController(this.rowsService, this.sheetsService),
        }
    };

    // middlewares
    public readonly errorHandlerMiddleware = new ErrorHandlerMiddleware();

    // others
    private readonly schemaValidationMiddleware = new SchemaValidationMiddleware();
    private readonly routes = new Routes(this.schemaValidationMiddleware, this.controllers);
    public readonly app = new App(this.routes, this.errorHandlerMiddleware);
}

export default new DiContainer();
