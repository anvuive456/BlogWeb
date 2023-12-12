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


export const PUT = async (req: NextRequest, {params}: { params: { slug: string } }) => {
  try {
    // const session = await getServerSession();
    // console.log(session);
    // if (!session || !session.user) return NextResponse.json({message: 'Unauthorized',}, {status: 401});

    const form = await req.formData();
    const title = form.get('title')?.toString() || '';
    const content = form.get('content') as string | null;
    const description = form.get('description')?.toString() || '';
    let slug = form.get('slug')?.toString() || '';
    if (!slug) slug = slugGenerate(title);
    if(slug.includes(' ')) return NextResponse.json({message:'Slug vẫn còn khoảng trắng'},{status:400});
    let url = form.get('url')?.toString() || '';
    if (!url) url = `/posts/${slug}`;
    const cateId = form.get('categoryId')?.toString() || '';
    const image = form.get('image') as File | null;
    const imageString = form.get('imageString') as string | null;
    let imagePath = '';
    if (imageString) {
      // imagePath = await uploadImage(image);
      imagePath = imageString;
    }
    const post = await prisma.post.update({
              where: {
                slug: params.slug
              },
              data: {
                title, slug, url, description, image: imagePath,
                content: {
                  set: JSON.parse(content ?? '[]')
                },
                categoryId: Number(cateId)
              },
            }
        )
    ;

    return NextResponse.json({post});
  } catch
      (e) {
    console.log(e);
    return NextResponse.json({message: `Không thể update bài viết: ${e}`}, {status: 400});
  }

}

export const DELETE = async (req: NextRequest, {params}: { params: { slug: string } }) => {
  try {
    const deleted = await prisma.post.delete({
      where: {slug: params.slug}
    });
    if (deleted) return NextResponse.json({deleted: true});

    return NextResponse.json({deleted: false});
  } catch (e) {
    return NextResponse.json({message: `Không thể xoá bài viết:${params.slug}`}, {status: 400});
  }
}
