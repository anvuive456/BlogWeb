import { Category, Post, User } from '@prisma/client';

export type CategoryWithPosts = Category & {
  posts: Post[]
}

export type CategoryWithCountPost = Category & {
  _count: {
    posts: number
  }
}

export type PostWithAuthor = Post & {
  author: User
}

export type PostWithCategory = Post & {
  category: Category
}

export type PostFullOptions = PostWithAuthor & PostWithCategory;
