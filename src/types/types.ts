import {Category, Post} from "@prisma/client";

export type CategoryWithPosts = Category & {
  posts: Post[]
}

