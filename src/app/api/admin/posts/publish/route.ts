import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../../lib/prisma";


///Hàm toggle published của bài viết với slug
///Trả về published (true/false)
export const PUT = async (req:NextRequest) => {
  try {
    const {id} = await req.json();
    if(!id)
    return NextResponse.json({message: `Không tìm thầy bài viết`}, {status: 404});
    const find = await prisma.post.findUnique({where: {id: id}});
    if (!find) return NextResponse.json({message: `Không tìm thầy bài viết:${id}`}, {status: 404});
    const updated = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        published: !find.published
      }
    });

    return NextResponse.json({published: updated.published}, {status: 200});
  } catch (e) {
    return NextResponse.json({message: `Không thể publish bài viết`}, {status: 400});
  }
}
