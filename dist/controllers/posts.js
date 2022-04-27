"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postMessage_1 = require("../models/postMessage");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postMessages = yield postMessage_1.PostMessage.find();
        res.json(postMessages);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: post } = req;
    const newPost = new postMessage_1.PostMessage(post);
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(409).json({ message: error });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return res.status(404).json('No exists post with that id');
    const updatedPost = yield postMessage_1.PostMessage.findByIdAndUpdate(_id, Object.assign(Object.assign({}, post), { _id }), { new: true });
    res.json(updatedPost);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield postMessage_1.PostMessage.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: post } = req;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send('No exists post with that id');
    try {
        const updatedPost = yield postMessage_1.PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        res.json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.likePost = likePost;
