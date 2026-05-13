import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-section py-4 bg-dark text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-0 fw-bold">
              <i className="bi bi-bowl-hot-fill me-2 text-warning"></i>용문동 맛집
            </p>
            <p className="text-muted small mb-0">대전 서구 용문동 주변 맛집을 직접 기록합니다.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted small mb-1">© 2025 용문동 맛집 기록</p>
            <p className="text-muted small mb-0">
              <Link href="/about" className="text-muted text-decoration-none me-3">블로그 소개</Link>
              <Link href="/about#contact" className="text-muted text-decoration-none">문의</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
