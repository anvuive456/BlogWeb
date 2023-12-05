import {NextRequest, NextResponse} from "next/server";
import {Post, Prisma} from "@prisma/client";
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

export const PUT = async (req: NextRequest, {params}: { params: { slug: string } }) => {
  try {
    // const session = await getServerSession();
    // console.log(session);
    // if (!session || !session.user) return NextResponse.json({message: 'Unauthorized',}, {status: 401});

    const form = await req.formData();
    const title = form.get('title')?.toString() || '';
    const content = form.get('content')?.toString() || '';
    let slug = form.get('slug')?.toString() || '';
    if (!slug) slug = slugGenerate(title);
    let url = form.get('url')?.toString() || '';
    if (!url) url = `/posts/${slug}`;
    const cateId = form.get('categoryId')?.toString() || '';
    const post = await prisma.post.update({
              where: {
                slug: params.slug
              },
              data: {
                title, content, slug, url,
                authorId: 'clpkq2u5w00001mgv8rb36ckr',
                categoryId: Number(cateId)
              },
            }
        )
    ;

    return NextResponse.json({post});
  } catch
      (e) {
    console.log(e);
    return NextResponse.json({message: 'Nene'}, {status: 400});
  }

}
