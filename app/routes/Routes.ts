import IControllers from '@app/interfaces/IControllers';
import SchemaValidationMiddleware from '@app/middlewares/SchemaValidationMiddleware';
import Schemas from '@app/validationSchemas';
import express, { Router } from 'express';
const router = express.Router();

export class Routes {

    constructor(private vm: SchemaValidationMiddleware, private controllers: IControllers) {}

    public getRouter(): Router {

        router.get('/health', (req, res) => { res.send({ version: 1.0 }); });

        router.post(
            '/sheets',
            this.vm.validate(Schemas.postSheet),
            this.controllers.v1.sheetsController.create,
        );

        router.post(
            '/sheets/:sheetId/columns',
            this.vm.validate(Schemas.postColumn),
            this.controllers.v1.sheetsController.createColumn,
        );

        router.patch(
            '/sheets/:sheetId/columns/:columnId',
            this.vm.validate(Schemas.patchColumn),
            this.controllers.v1.sheetsController.patchColumn,
        );

        router.get(
            '/sheets/:sheetId/columns',
            this.vm.validate(Schemas.getColumns),
            this.controllers.v1.sheetsController.getAll,
        );

        router.delete(
            '/sheets/:sheetId/columns/:columnId',
            this.vm.validate(Schemas.deleteColumn),
            this.controllers.v1.sheetsController.deleteColumn,
        );

        router.post(
            '/sheets/:sheetId/rows',
            this.vm.validate(Schemas.postRow),
            this.controllers.v1.rowsController.create,
        );

        router.patch(
            '/sheets/:sheetId/rows/:rowId',
            this.vm.validate(Schemas.patchRow),
            this.controllers.v1.rowsController.patch,
        );

        router.delete(
            '/sheets/:sheetId/rows/:rowId',
            this.vm.validate(Schemas.deleteRow),
            this.controllers.v1.rowsController.delete,
        );

        router.get(
            '/sheets/:sheetId/rows',
            this.vm.validate(Schemas.getRows),
            this.controllers.v1.rowsController.getAll,
        );

        router.put(
            '/sheets/:sheetId/rows/:rowId/cells',
            this.vm.validate(Schemas.putRowCells),
            this.controllers.v1.rowsController.setCellValue,
        );

        return router;
    }

}

export default Routes;
