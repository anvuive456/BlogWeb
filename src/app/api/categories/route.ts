import prisma from "../../../../lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (req: NextRequest) => {
  const queries = req.nextUrl.searchParams;
  const take = queries.get('postLimit') == null ? undefined : Number(queries.get('postLimit'));
  const categories = await prisma.category.findMany(
      {
        include: {
          posts: {
            orderBy: {
              createdAt: 'desc'
            },
            where:{
              published:true,
            },
            take
          }
        },
      }
  );


  return Response.json(categories);
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body) return NextResponse.error();

   const category = await prisma.category.create({data: body});
   return  NextResponse.json(category);
}
