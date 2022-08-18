"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@openapi-generator-plus/types");
const path_1 = __importDefault(require("path"));
const handlebars_templates_1 = require("@openapi-generator-plus/handlebars-templates");
const typescript_generator_common_1 = __importStar(require("@openapi-generator-plus/typescript-generator-common"));
const idx = __importStar(require("@openapi-generator-plus/indexed-type"));
const createGenerator = (config, context) => {
    const myContext = Object.assign(Object.assign({}, context), { loadAdditionalTemplates: async (hbs) => {
            await (0, handlebars_templates_1.loadTemplates)(path_1.default.resolve(__dirname, '../templates'), hbs);
        }, additionalWatchPaths: () => {
            return [path_1.default.resolve(__dirname, '../templates')];
        }, defaultNpmOptions: () => ({
            name: 'typescript-express-passport-server',
            version: '0.0.1',
            private: true,
            repository: null,
        }), defaultTypeScriptOptions: () => ({
            target: 'ES2015',
            libs: ['$target', 'DOM'],
        }) });
    const generatorOptions = (0, typescript_generator_common_1.options)(config, myContext);
    myContext.additionalExportTemplates = async (outputPath, doc, hbs, rootContext) => {
        /* Convert path template from OpenAPI to Express */
        hbs.registerHelper('pathTemplate', function (value) {
            return value.replace(/{(.*?)}/g, ':$1');
        });
        const relativeSourceOutputPath = generatorOptions.relativeSourceOutputPath;
        for (const group of doc.groups) {
            const operations = group.operations;
            if (!operations.length) {
                continue;
            }
            await (0, handlebars_templates_1.emit)('api', path_1.default.join(outputPath, relativeSourceOutputPath, 'api', context.generator().toIdentifier(group.name), 'index.ts'), Object.assign(Object.assign(Object.assign({}, rootContext), group), doc), true, hbs);
            await (0, handlebars_templates_1.emit)('apiTypes', path_1.default.join(outputPath, relativeSourceOutputPath, 'api', context.generator().toIdentifier(group.name), 'types.ts'), Object.assign(Object.assign(Object.assign({}, rootContext), group), doc), true, hbs);
            await (0, handlebars_templates_1.emit)('apiReadme', path_1.default.join(outputPath, relativeSourceOutputPath, 'api', context.generator().toIdentifier(group.name), 'README.md'), Object.assign(Object.assign(Object.assign({}, rootContext), group), doc), true, hbs);
            await (0, handlebars_templates_1.emit)('apiImpl', path_1.default.join(outputPath, relativeSourceOutputPath, 'impl', `${context.generator().toIdentifier(group.name)}.ts`), Object.assign(Object.assign(Object.assign({}, rootContext), group), doc), false, hbs);
        }
        await (0, handlebars_templates_1.emit)('models', path_1.default.join(outputPath, relativeSourceOutputPath, 'models.ts'), Object.assign(Object.assign(Object.assign({}, rootContext), doc), { schemas: idx.filter(doc.schemas, schema => (0, types_1.isCodegenObjectSchema)(schema) || (0, types_1.isCodegenEnumSchema)(schema) || (0, types_1.isCodegenOneOfSchema)(schema) || (0, types_1.isCodegenAnyOfSchema)(schema) || (0, types_1.isCodegenInterfaceSchema)(schema)) }), true, hbs);
        await (0, handlebars_templates_1.emit)('validation', path_1.default.join(outputPath, relativeSourceOutputPath, 'validation.ts'), Object.assign(Object.assign({}, rootContext), doc), true, hbs);
        await (0, handlebars_templates_1.emit)('index', path_1.default.join(outputPath, relativeSourceOutputPath, 'index.ts'), Object.assign(Object.assign({}, rootContext), doc), true, hbs);
        await (0, handlebars_templates_1.emit)('indexTypes', path_1.default.join(outputPath, relativeSourceOutputPath, 'types.ts'), Object.assign(Object.assign({}, rootContext), doc), true, hbs);
    };
    const base = (0, typescript_generator_common_1.default)(config, myContext);
    return Object.assign(Object.assign({}, base), { templateRootContext: () => {
            return Object.assign(Object.assign(Object.assign({}, base.templateRootContext()), generatorOptions), { generatorClass: '@openapi-generator-plus/typescript-express-passport-server-generator' });
        }, postProcessDocument: (doc, helper) => {
            /* Sort operations according to the order we need to declare them */
            doc.groups.forEach(group => {
                group.operations.sort(compareOperations);
            });
            if (base.postProcessDocument) {
                base.postProcessDocument(doc, helper);
            }
        }, postProcessSchema: (model, helper) => {
            if (base.postProcessSchema) {
                // HACK: we call the base but _don't_ return its value so we don't remove oneOf and anyOf
                // as we still need to generate validations for them
                base.postProcessSchema(model, helper);
            }
        }, generatorType: () => types_1.CodegenGeneratorType.SERVER, cleanPathPatterns: () => {
            const result = base.cleanPathPatterns() || [];
            const relativeSourceOutputPath = generatorOptions.relativeSourceOutputPath;
            result.push(path_1.default.join(relativeSourceOutputPath, 'api', '**'));
            return result;
        }, toNativeType: (options) => {
            const { schemaType } = options;
            if (schemaType === types_1.CodegenSchemaType.DATETIME && generatorOptions.dateApproach === typescript_generator_common_1.DateApproach.Native) {
                // TODO we need to override the default date type in typescript-generator-common which has a serialized type of string
                return new context.NativeType('Date');
            }
            else if (schemaType === types_1.CodegenSchemaType.BINARY) {
                return new context.NativeType('string | Buffer');
            }
            else {
                return base.toNativeType(options);
            }
        } });
};
/**
 * Compare CodegenOperations so that they are sorted with the most specific paths first,
 * in order to register them in the necessary order with Express.
 * @param a
 * @param b
 */
function compareOperations(a, b) {
    const aComponents = a.path.split('/');
    const bComponents = b.path.split('/');
    for (let i = 0; i < aComponents.length; i++) {
        if (i >= bComponents.length) {
            return 1;
        }
        const aIsVar = aComponents[i].startsWith('{');
        const bIsVar = bComponents[i].startsWith('{');
        if (aIsVar && !bIsVar) {
            return 1;
        }
        else if (!aIsVar && bIsVar) {
            return -1;
        }
        const compared = aComponents[i].localeCompare(bComponents[i]);
        if (compared !== 0) {
            return compared;
        }
    }
    if (bComponents.length > aComponents.length) {
        return -1;
    }
    return 0;
}
exports.default = createGenerator;
