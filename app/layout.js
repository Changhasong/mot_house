import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BootstrapInit from '../components/BootstrapInit'

export const metadata = {
  title: '용문동 맛집 기록 | 대전 서구 용문동 맛집 블로그',
  description: '대전 서구 용문동 주변 맛집을 직접 발로 뛰며 기록하는 동네 맛집 블로그입니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BootstrapInit />
      </body>
    </html>
  )
}
