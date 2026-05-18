import Link from 'next/link'
import RestaurantGrid from '../components/RestaurantGrid'
import CoupangBanner from '../components/CoupangBanner'
import restaurants from '../data/restaurants.json'

export const metadata = {
  title: '용문동 맛집 기록 | 대전 서구 용문동 맛집 블로그',
  description: '대전 서구 용문동 주변 맛집을 직접 발로 뛰며 기록하는 동네 맛집 블로그입니다.',
}

export default function Home() {
  return (
    <>
      {/* 히어로 */}
      <section className="hero-section text-white d-flex align-items-center">
        <div className="container text-center py-5">
          <p className="hero-sub mb-3">대전 서구 용문동, 롯데백화점 성심당 주변 맛집</p>
          <h1 className="display-4 fw-bold mb-3">용문동 맛집 기록</h1>
          <p className="lead mb-4">직접 가보고 싶은 동네 맛집을 모아두는 블로그</p>
          <a href="#restaurants" className="btn btn-warning btn-lg px-5 fw-bold shadow">
            맛집 둘러보기 <i className="bi bi-arrow-down ms-2"></i>
          </a>
        </div>
      </section>

      {/* 쿠팡파트너스 */}
      <section className="py-3 bg-light">
        <div className="container">
          <CoupangBanner />
        </div>
      </section>

      {/* 필터 + 카드 목록 (클라이언트 컴포넌트) */}
      <RestaurantGrid restaurants={restaurants} />

      {/* 블로그 소개 */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">용문동 주민과 방문자를 위한<br />맛집 기록장</h2>
              <p className="text-muted mb-3">
                이 블로그는 대전 서구 용문동에서 직접 발로 뛰며 찾은 맛집들을 기록하는 공간입니다.
                광고 없이, 진심으로 맛있는 집들만 소개합니다.
              </p>
              <p className="text-muted mb-4">
                대전 롯데시네마 성심당 주변 맛집을 찾으시나요? 여기가 대전 서구 용문동입니다.
              </p>
              <Link href="/about" className="btn btn-dark px-4 fw-semibold">
                <i className="bi bi-info-circle me-2"></i>블로그 소개 보기
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="intro-stat-card text-center p-4 rounded-3">
                    <div className="stat-icon mb-2"><i className="bi bi-shop text-warning"></i></div>
                    <h3 className="fw-bold mb-1">{restaurants.length}+</h3>
                    <p className="text-muted small mb-0">소개된 맛집</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="intro-stat-card text-center p-4 rounded-3">
                    <div className="stat-icon mb-2"><i className="bi bi-pencil-square text-warning"></i></div>
                    <h3 className="fw-bold mb-1">100%</h3>
                    <p className="text-muted small mb-0">직접 방문 후기</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="intro-stat-card text-center p-4 rounded-3">
                    <div className="stat-icon mb-2"><i className="bi bi-heart-fill text-warning"></i></div>
                    <h3 className="fw-bold mb-1">NO AD</h3>
                    <p className="text-muted small mb-0">광고 없음</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="intro-stat-card text-center p-4 rounded-3">
                    <div className="stat-icon mb-2"><i className="bi bi-geo-alt-fill text-warning"></i></div>
                    <h3 className="fw-bold mb-1">용문동</h3>
                    <p className="text-muted small mb-0">동네 밀착 기록</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
