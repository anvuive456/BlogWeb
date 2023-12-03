import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, {params}: {
  params: {
    slug: string
  }
}) => {
  const {searchParams} = new URL(req.url);
  const search = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  console.log(search);
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      posts: {
        where: {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        skip: (page - 1) * limit,
        take: limit
      },
      _count: {
        select: {
          posts: {
            where: {
              title: {
                contains: search,
                mode: 'insensitive'
              }
            }
          }
        }
      }
    }
  });

  return NextResponse.json(category);
}
