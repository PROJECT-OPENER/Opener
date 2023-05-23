import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const handler = NextAuth({
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const { email, password } = credentials as any;
        const res = await fetch(`${BASE_URL}member-service/members/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        console.log('res : ', res);
        // console.log('res : ', res.headers.get('nickname'));
        // const user = await decodeURI(res.headers.get('nickname') as string);
        const user = await res.json();
        // console.log('user : ', { user });
        // 에러 핸들링 : 커스텀 에러 핸들리을 위해 에러코드를 searchParams로 넘긴다.
        // 에러코드는 member-service의 ErrorCode를 참고한다.
        // 넘긴 코드를 바탕으로 LoginFrom.tsx에서 처리
        if (!res.ok && user) {
          throw new Error(user.code);
        }

        if (res.ok && user) {
          // console.log('user : ', user);
          const users = {
            ...user,
            email: user.email,
            nickname: decodeURI(res.headers.get('nickname') as string),
            accessToken: res.headers.get('accessToken'),
          };
          console.log('users : ', users);
          return users;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // return { ...token, ...user };
      user && (token.user = user); // authorize에 리턴했던 값이 user 정보에 있면 token에 추가.
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // const users = await session?.user;
      // await console.log('token : ', token);
      // console.log('users : ', users);
      session.user = token;
      // console.log('session : ', session);
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith('/')) {
    //     return `${baseUrl}${url}`;
    //   } else if (new URL(url).origin === baseUrl) {
    //     return `${baseUrl}`;
    //   }
    //   return baseUrl;
    // },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    signOut: '/',
  },
});

export { handler as GET, handler as POST };
