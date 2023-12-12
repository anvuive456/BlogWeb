import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, {params}: { params: { id: string } }) => {
  const image = await prisma.media.findUnique({
    where: {id: params.id}
  });
  return new NextResponse(image?.source, {
    status: 200,
    headers: {
      "content-type": image?.mimeType || 'image/png'
    }
  })
}
