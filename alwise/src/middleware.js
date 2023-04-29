import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';

export default function handler(req, res) {
    const isLogged = req.cookies.get('isLogged');
   const url = req.url

    if (isLogged) {
        if (url.includes('/auth/login')) {
            return NextResponse.redirect('http://localhost:3003/');
        }
        if(url.includes('/auth/signup')){
            return NextResponse.redirect('http://localhost:3003/');
        }
    }else{
        if(url.includes('profile')){
            return NextResponse.redirect('http://localhost:3003/auth/login');
        }
        if(url.includes('generate-video')){
            return NextResponse.redirect('http://localhost:3003/auth/login');
        }
        if(url.includes('settings')){
            return NextResponse.redirect('http://localhost:3003/auth/login');
        }
        if(url.includes('video-details')){
            return NextResponse.redirect('http://localhost:3003/auth/login');
        }
    }
}