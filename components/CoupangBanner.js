import { COUPANG_URL } from '../lib/constants'

export default function CoupangBanner() {
  return (
    <div className="coupang-banner-wrap">
      <a
        href={COUPANG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="coupang-banner-link"
      >
        <div className="coupang-banner">
          <span className="coupang-logo">쿠팡</span>
          <span className="coupang-text">지금 쿠팡에서 쇼핑하기</span>
          <i className="bi bi-arrow-right-circle-fill coupang-arrow"></i>
        </div>
      </a>
      <p className="coupang-disclaimer">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  )
}
