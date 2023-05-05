import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });

  // 토큰이 없다 => 로그인이 안되어 있다
  if (!token) {
    // API 요청이면 401 에러를 반환
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }
    // API 요청이 아니면 로그인 페이지로 리다이렉트
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/login`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
};

export default middleware;

// 로그인해야만 접근할 수 있는 페이지들
export const config = {
  matcher: ['/interest'],
};
