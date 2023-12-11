import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";
import {slugGenerate} from "../../../../../lib/slug_generator";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;
  const page = query.get('page');
  const limit = query.get('limit');
  const search = query.get('search') || '';
  const all = Boolean(query.get('all')) || false;
  if (all) {
    const [categories, count] = await prisma.$transaction([
      prisma.category.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        include: {
          _count: {
            select: {
              posts: true
            }
          }
        },
      }),
      prisma.category.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      })
    ]);
    return NextResponse.json(categories);
  }

  if (!(page && limit)) return NextResponse.json({message: 'Phải có page và limit'}, {status: 400});
  if (Number(page) < 1) return NextResponse.json({message: 'page ít nhất là 1'}, {status: 400});

  const [categories, count] = await prisma.$transaction([
    prisma.category.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),

    }),
    prisma.category.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    })
  ]);

  const pageCount = Math.ceil(count / (Number(limit) || 1));
  const from = (Number(page) - 1) * (Number(limit) || 0) + 1;
  const to = Math.min(from - 1 + (Number(limit) || 0), count);
  return NextResponse.json({
    categories,
    count,
    pageCount,
    pagination: {
      from,
      to,
    }
  })
}

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const name = form.get('name') as string | null;
  if (!name) return NextResponse.json({message: 'Phải có name'});
  const slug = slugGenerate(name);
  const category = await prisma.category.create({
    data: {
      name,
      slug
    }
  });
  return NextResponse.json(category);
}
