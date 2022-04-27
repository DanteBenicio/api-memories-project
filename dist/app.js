"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const posts_1 = __importDefault(require("./routes/posts"));
const mongoose_1 = require("./services/mongoose");
dotenv_1.default.config();
const app = (0, express_1.default)();
const route = express_1.default.Router();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "30mb" }));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use(route);
app.use('/posts', posts_1.default);
(0, mongoose_1.connectToMongoDB)(process.env.MONGODB_URI)
    .then((res) => {
    app.listen(PORT, () => {
        console.log('Server is running');
    });
})
    .catch(error => {
    console.log(error);
});
