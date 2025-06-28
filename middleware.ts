import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/((?!_next|favicon.ico).*)',
};

export function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const allowed = (process.env.ALLOWED_IP ?? '').split(',');
  
    console.log('Client IP:', ip);
    console.log('Whitelist:', allowed);
  
    // ✅ Check nur in Production aktivieren
    if (process.env.NODE_ENV === 'production') {
      if (!ip || !allowed.includes(ip)) {
        return new NextResponse('Forbidden (IP not allowed)', { status: 403 });
      }
    }
  
    return NextResponse.next();
  }
  
