import prisma from "../../../../lib/prisma";
import {NextResponse} from "next/server";

export const GET = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where:{
      published:true

    },
    take: 5,
    include: {
      author: true
    }
  });

  return NextResponse.json(posts);
}
