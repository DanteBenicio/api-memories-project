"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const router = express_1.default.Router();
router.get('/', posts_1.getPosts);
router.post('/', posts_1.createPost);
router.patch('/:id', posts_1.updatePost);
router.delete('/:id', posts_1.deletePost);
router.patch('/:id/likePost', posts_1.likePost);
exports.default = router;
