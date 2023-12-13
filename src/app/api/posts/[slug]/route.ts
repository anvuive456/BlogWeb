import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";
import {slugGenerate} from "../../../../../lib/slug_generator";

export const GET = async (req: NextRequest, {params}: { params: { slug: string | undefined } }) => {
  if (!params || !params.slug) {
    return NextResponse.json({message: 'Không tìm thấy bài đăng'}, {status: 404});
  }
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug
    },
    include: {
      category: true,
      author: true,
    }
  });
  return NextResponse.json({post});

}
