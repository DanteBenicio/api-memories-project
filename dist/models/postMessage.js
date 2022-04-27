"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessage = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
exports.PostMessage = (0, mongoose_1.model)('PostMessage', postSchema);
