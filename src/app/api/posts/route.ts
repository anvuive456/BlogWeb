import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {slugGenerate} from "../../../../lib/slug_generator";


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
    const post = await prisma.post.create({
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
