'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          <i className="bi bi-bowl-hot-fill me-2 text-warning"></i>용문동 맛집
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">홈</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/#restaurants">맛집 목록</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">용문동 이야기</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about#contact">문의</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
