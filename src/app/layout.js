import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import { Noto_Sans_KR } from 'next/font/google';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});
export const metadata = {
  title: 'sBook',
  description: '세상의 모든 도서를 알려드립니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={notoSansKr.className}>
      <head>
        <Script src='https://code.jquery.com/jquery-3.6.0.min.js' strategy='beforeInteractive' id='jquery' />
        <Script
          src='https://cdnjs.cloudflare.com/ajax/libs/turn.js/3/turn.js'
          strategy='afterInteractive'
          id='turnjs'
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div id='wrap' className='p-2'>
          <div className='inner'>{children}</div>
        </div>
      </body>
    </html>
  );
}
