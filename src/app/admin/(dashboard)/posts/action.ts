'use server'

import {baseApiUrl} from "../../../../../lib/api";
import {headers} from "next/headers";
import prisma from "../../../../../lib/prisma";
import {getServerSession} from "next-auth";
import {slugGenerate} from "../../../../../lib/slug_generator";

export const createPost = async (p: any) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    alert('not authorized');
    return;
  }
  const slug = slugGenerate(p.title);
  const post = await prisma.post.create({
    data: {
      title: p.title,
      content: p.content,
      slug: p.slug || slug,
      url: p.url || `/posts/${slug}`,
      author: {
        connect: {
          email: session.user.email || ''
        }
      }
    }
  });
  return post;
}
