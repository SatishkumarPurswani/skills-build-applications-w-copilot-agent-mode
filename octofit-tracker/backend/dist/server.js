"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const defaultFrontendOrigin = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
const allowedOrigins = new Set((process.env.CORS_ORIGINS || defaultFrontendOrigin)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Origin is not allowed by CORS'));
    },
}));
app.use(express_1.default.json());
app.get('/', (_request, response) => {
    response.json({ service: 'octofit-tracker-api', status: 'ok', apiBaseUrl: exports.apiBaseUrl });
});
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', database: (0, database_1.databaseStatus)(), apiBaseUrl: exports.apiBaseUrl });
});
app.use('/api', routes_1.default);
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(400).json({ error: 'Request could not be completed' });
});
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.error('Database unavailable:', error);
    }
    app.listen(port, () => {
        console.log(`OctoFit API listening at ${exports.apiBaseUrl}`);
    });
}
if (require.main === module) {
    void startServer();
}
exports.default = app;
