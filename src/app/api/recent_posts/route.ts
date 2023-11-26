import prisma from "../../../../lib/prisma";
import {NextResponse} from "next/server";

export const GET = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
    include: {
      author: true
    }
  });

  return NextResponse.json(posts);
}
