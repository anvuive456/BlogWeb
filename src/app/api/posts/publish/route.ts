import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const id = body.id

    if (!id)
      return NextResponse.json({message: `Không tìm thầy bài viết`}, {status: 404});
    const find = await prisma.post.findUnique({where: {id}});
    if (!find) return NextResponse.json({message: `Không tìm thầy bài viết:${id}`}, {status: 404});
    const updated = await prisma.post.update({
      where: {
        id
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
