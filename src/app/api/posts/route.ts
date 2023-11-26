import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";


export const GET = async (req: NextRequest) => {


  const query = req.nextUrl.searchParams
  const search = query.get('search') ?? '';
  const orderBy = query.get('orderBy') ?? 'createdAt';
  const orderDirection = query.get('orderDirection') ?? 'desc';
  const page = query.get('page') ?? null;
  const limit = Number(query.get('limit')) ?? null;
  const skip = (page && limit) ? (Number(page) - 1) * Number(limit) : undefined;

  const [posts, count] =
      await prisma.$transaction([
        prisma.post.findMany({
          where: {
            OR: [{
              title: {contains: search, mode: 'insensitive'}
            },
              {
                content: {contains: search, mode: 'insensitive'}
              }
            ]
          },
          orderBy: {
            [orderBy]: orderDirection,
          },
          skip: skip,
          take: limit
        }),
        prisma.post.count({
          where: {
            OR: [{
              title: {contains: search, mode: 'insensitive'}
            },
              {
                content: {contains: search, mode: 'insensitive'}
              }
            ]
          },
        })
      ]);

  return NextResponse.json({
    posts,
    count,
  })

}
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const post = prisma.post.create({
    data: body
  });

  return NextResponse.json({post});
}
