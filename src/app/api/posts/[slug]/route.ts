import {NextRequest, NextResponse} from "next/server";
import {Post, Prisma} from "@prisma/client";
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

export const PUT = async (req: NextRequest, {params}: { params: { slug: string } }) => {
  const data = await req.json();
  const post = await prisma.post.update({
    where:{
      slug: params.slug
    },
    data,
  });

  return NextResponse.json({post});
}
