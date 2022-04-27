import { Request, Response } from "express";
import mongoose from "mongoose";
import { PostMessage } from '../models/postMessage';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessages = await PostMessage.find();

    res.json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error})
  }
}

export const createPost = async (req: Request, res: Response) => {
  const { body: post } = req;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json('No exists post with that id')

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await PostMessage.findByIdAndDelete(id)

    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
}

export const likePost = async (req: Request, res: Response) => {
  const { body: post } = req;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No exists post with that id')

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error})
  }
}