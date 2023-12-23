import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../../lib/prisma';

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {},
  adapter: PrismaAdapter(prisma),
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? '',
    //
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.password || !credentials.email) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
    // EmailProvider({
    //   from:'trannhatan2803@gmail.com',
    //
    // })
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
