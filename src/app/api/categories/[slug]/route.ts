import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, {params}: {
  params: {
    slug: string
  }
}) => {
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug
    },
    include: {
      posts: true,
      _count: {
        select: {
          posts: true
        }
      }
    }
  });

  return NextResponse.json({category});
}
