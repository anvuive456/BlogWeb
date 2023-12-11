import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../../lib/prisma";

export const DELETE = async (req: NextRequest, {params}: { params: { id: number } }) => {
  const id = Number(params.id);
  const category = await prisma.category.delete({
    where: {
      id
    }
  });
  if (!category) return NextResponse.json({message: `Không tìm thấy danh mục`}, {status: 404});
  return NextResponse.json({category});
}
