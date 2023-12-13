import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../../../lib/prisma";


///Hàm toggle published của bài viết với slug
///Trả về published (true/false)
export const PUT = async (req:NextRequest, {params}: { params: { slug: string } }) => {
  try {
    console.log(params);
    if(!params.slug)
    return NextResponse.json({message: `Không tìm thầy bài viết`}, {status: 404});
    const find = await prisma.post.findUnique({where: {slug: params.slug}});
    if (!find) return NextResponse.json({message: `Không tìm thầy bài viết:${params.slug}`}, {status: 404});
    const updated = await prisma.post.update({
      where: {
        slug: params.slug,
      },
      data: {
        published: !find.published
      }
    });

    return NextResponse.json({published: updated.published}, {status: 200});
  } catch (e) {
    return NextResponse.json({message: `Không thể publish bài viết:${params.slug}`}, {status: 400});
  }
}
