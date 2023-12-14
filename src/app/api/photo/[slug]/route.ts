import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { headers } from 'next/headers';

const pattern: RegExp = /^data:image\/(png|jpeg|gif|bmp);base64,/;

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const header = new Headers();

  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) {
    header.set('Content-Type', 'image/png');
    header.set('Content-Length', `0`);
    return new Response(Buffer.from('', 'base64'), {
      headers: header,
    });
  }

  let decoded = post.image.replace(pattern, '');
  const imageResp = Buffer.from(decoded, 'base64');

  header.set('Content-Type', 'image/png');
  header.set('Content-Length', `${imageResp.length}`);
  return new NextResponse(imageResp, {
    headers: header,
  });
};
