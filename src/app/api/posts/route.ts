import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";


export const GET = async (req: NextRequest) => {


  const query = req.nextUrl.searchParams
  const search = query.get('search') ?? '';
  const orderBy = query.get('orderBy') ?? 'createdAt';
  const orderDirection = query.get('orderDirection') ?? 'desc';
  const page = query.get('page') || 1;
  const limit = Number(query.get('limit')) || undefined;
  const skip = (page && limit) ? (Number(page) - 1) * limit : undefined;
  console.log(limit, skip);

  const [posts, count] =
      await prisma.$transaction([
        prisma.post.findMany({
          where: {
            OR: [
              {
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
          include: {
            category: true
          },
          skip: skip,
          take: limit
        }),
        prisma.post.count({
          where: {
            OR: [
              {
                title: {contains: search, mode: 'insensitive'}
              },
              {
                content: {contains: search, mode: 'insensitive'}
              }
            ]
          },
        })
      ]);

  const pageCount = Math.ceil(count / (limit || 1));
  const from = (Number(page) - 1) * (limit || 0) + 1;
  const to = from - 1 + (limit || 0);
  return NextResponse.json({
    posts,
    count,
    pageCount,
    pagination: {
      from,
      to,
    }
  })

}
export const POST = async (req: NextRequest) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect('/api/auth/signin');
  const body = await req.json();

  const post = prisma.post.create({
    data: body,
  });

  return NextResponse.json({post});
}
