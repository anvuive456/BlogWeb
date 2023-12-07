import {Prisma, PrismaClient} from "@prisma/client";
import {slugGenerate} from "../lib/slug_generator";

const prisma = new PrismaClient();

const cates: Prisma.CategoryCreateInput[] = [
  {
    name: 'Du lịch',
    slug: slugGenerate('Du lịch'),
  },
  {
    name: 'Công nghệ',
    slug: slugGenerate('Công nghệ'),
  },
];

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'admin@email.com',
      name: 'Admin',
    }
  });

  const c = await
      Promise.all(cates.map((value) => prisma.category.create({
        data: value
      })));

  const posts = await prisma.post.createMany({
    data: c.map<Prisma.PostCreateInput>((cate): Prisma.PostCreateInput => {
      return {
        category: {
          connect:{
            id:cate.id
          }
        },
        title: 'Rừng Tà Năng – Phan Dũng có gì thu hút? Những lưu ý khi tới đây',
        author: {
          connect: {
            id: admin.id
          }
        },
        content: {set:[]},
        url: process.env.BASE_URL + '/' + 'home' + '/' + 'posts' + '/' + slugGenerate('Rừng Tà Năng – Phan Dũng có gì thu hút? Những lưu ý khi tới đây')
      }
    })
  });
}
