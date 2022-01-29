import RowsController from "@app/controllers/RowsController";
import SheetsController from "@app/controllers/SheetsController";

export default interface IControllers {
    v1: {
        sheetsController: SheetsController,
        rowsController: RowsController,
    }
}
