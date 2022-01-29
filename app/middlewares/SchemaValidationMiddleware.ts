import Ajv from 'ajv';
import moment from 'moment';
import { Types } from 'mongoose';

export class SchemaValidationMiddleware {
    private static addCustomFormats = (ajv) => {
        ajv.addFormat('date-time', {
            validate: (dateTimeString) => {
                return moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss', true).isValid();
            },
        });

        ajv.addFormat('timezone', {
            validate: (timezoneString) => {
                return timezoneString.match('^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$');
            },
        });

        ajv.addFormat('object-id', {
            validate: (objectId: string) => {
                return Types.ObjectId.isValid(objectId);
            },
        });

        ajv.addKeyword('maxNumberString', {
            metaSchema: {
                type: 'number',
            },
            errors: true,
            validate: ((maxLimit: number, limit: string) => {
                if (Number(limit) > maxLimit) {
                    return false;
                }
                return true;
            }),
        });

        ajv.addFormat('string-object-ids', {
            validate: (objectIds: string) => {
                const idsArr = objectIds.split(',');
                for (const objId of idsArr) {
                    if (!Types.ObjectId.isValid(objId)) {
                        return false;
                    }
                }
                return true;
            },
        });

        ajv.addKeyword('commaSeparatedEnums', {
            metaSchema: {
                type: 'array',
            },
            errors: true,
            validate: (function(constants, parentSchema) {
                const includeStrings = parentSchema.split(',');
                for (const includeString of includeStrings) {
                    if (!constants.includes(includeString)) {
                        if (this.errors === null) {
                            this.errors = [];
                        }
                        this.errors.push({
                            keyword: 'commaSeparatedEnums',
                            message: 'should contain only the allowed values',
                            params: {
                                allowedValues: constants,
                            },
                        });
                        return false;
                    }
                }
                return true;
            }),
        });

        ajv.addFormat('integer-string', {
            validate: (numberString) => {
                return numberString.match('^[0-9]*$');
            },
        });
    }

    public validate(schema: any) {

        return async (req, res, next) => {

            const ajv = new Ajv({ allErrors: true, useDefaults: true });
            SchemaValidationMiddleware.addCustomFormats(ajv);
            if (schema.body) {
                const valid = ajv.validate(schema.body, req.body);
                if (!valid) {
                    return this.sendErrorReposne(res, ajv.errors);
                }
            }

            if (schema.query) {
                const valid = ajv.validate(schema.query, req.query);
                if (!valid) {
                    return this.sendErrorReposne(res, ajv.errors);
                }
            }

            if (schema.params) {
                const valid = ajv.validate(schema.params, req.params);
                if (!valid) {
                    return this.sendErrorReposne(res, ajv.errors);
                }
            }

            next();
        };
    }

    private sendErrorReposne(res, errors) {
        return res.status(422).send({
            error: {
                message: 'Invalid request body',
                errors,
            },
        });
    }
}

export default SchemaValidationMiddleware;
