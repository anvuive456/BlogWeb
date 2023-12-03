import {Category, Post, User} from "@prisma/client";

export type CategoryWithPosts = Category & {
  posts: Post[]
}

export type PostWithAuthor = Post & {
  author: User
}

export type PostWithCategory = Post & {
  category: Category
}

export type PostFullOptions = PostWithAuthor & PostWithCategory;
