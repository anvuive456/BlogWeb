import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export const GET = async (req: NextRequest)=> {
  if (typeof window !== "undefined"){

    const token = localStorage.getItem('access_token');
    if(!token) redirect('/admin/login');

  }

  redirect('/admin/login');
}

// const tryLogin = async (token: string)=> {
//   const auth =
// }
