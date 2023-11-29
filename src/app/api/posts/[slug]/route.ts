import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, {params}: { params: { slug: string | undefined } }) => {
  if (!params || !params.slug) {
    return NextResponse.json({}, {status: 404});
  }
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug
    }
  });
  return NextResponse.json({post});

}
