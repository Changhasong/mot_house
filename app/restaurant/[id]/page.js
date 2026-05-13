import { notFound } from 'next/navigation'
import Link from 'next/link'
import restaurants from '../../../data/restaurants.json'
import StarRating from '../../../components/StarRating'
import RelatedRestaurants from '../../../components/RelatedRestaurants'

const CAT_CFG = {
  korean:   { label: '한식',     badge: 'badge-korean',   icon: 'bi-fire',      color: '#c0392b' },
  chinese:  { label: '중식',     badge: 'badge-chinese',  icon: 'bi-egg-fried', color: '#922b21' },
  japanese: { label: '일식',     badge: 'badge-japanese', icon: 'bi-cup-hot',   color: '#1a5276' },
  cafe:     { label: '카페',     badge: 'badge-cafe',     icon: 'bi-cup-straw', color: '#6d4c41' },
  bar:      { label: '술집',     badge: 'badge-bar',      icon: 'bi-balloon',   color: '#6c3483' },
  lunch:    { label: '점심맛집', badge: 'badge-lunch',    icon: 'bi-sun',       color: '#1e8449' },
}

export async function generateStaticParams() {
  return restaurants.map((_, i) => ({ id: String(i) }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const idx = parseInt(id)
  if (isNaN(idx) || idx < 0 || idx >= restaurants.length) return {}
  return { title: `${restaurants[idx].name} | 용문동 맛집` }
}

function ReviewText({ text }) {
  if (!text) {
    return <p className="text-muted fst-italic">후기가 아직 작성되지 않았습니다.</p>
  }
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\n/g, '<br>') }} />
      ))}
    </>
  )
}

export default async function RestaurantDetail({ params }) {
  const { id } = await params
  const idx = parseInt(id)

  if (isNaN(idx) || idx < 0 || idx >= restaurants.length) {
    notFound()
  }

  const r = restaurants[idx]
  const cats = Array.isArray(r.category) ? r.category : [r.category]
  const primary = CAT_CFG[cats[0]] || CAT_CFG.korean

  return (
    <>
      {/* 히어로 */}
      <section className="detail-hero text-white d-flex align-items-end py-4">
        <div className="container">
          <Link href="/" className="text-white text-decoration-none small opacity-75 d-inline-flex align-items-center mb-3">
            <i className="bi bi-arrow-left me-1"></i> 맛집 목록으로
          </Link>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span>
              {cats.map(c => {
                const cfg = CAT_CFG[c]
                return cfg ? (
                  <span key={c} className={`badge badge-category ${cfg.badge} me-1`}>{cfg.label}</span>
                ) : null
              })}
            </span>
            <span className="text-warning small"><StarRating rating={r.rating} /></span>
            <span className="text-white-50 small">{r.rating.toFixed(1)}</span>
          </div>
          <h1 className="fw-bold mb-0">{r.name}</h1>
        </div>
      </section>

      {/* 본문 */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">

            {/* 왼쪽: 이미지 + 기본 정보 */}
            <div className="col-lg-5">
              <div className="detail-img-container mb-4">
                {r.image ? (
                  <img
                    src={`/images/${r.image}`}
                    className="img-fluid w-100"
                    alt={r.name}
                    style={{ height: '380px', objectFit: 'cover', borderRadius: '12px' }}
                  />
                ) : (
                  <div
                    className="detail-img-placeholder"
                    style={{ background: `linear-gradient(135deg, ${primary.color}bb, ${primary.color})` }}
                  >
                    <i className="bi bi-house-heart-fill"></i>
                  </div>
                )}
              </div>

              <div className="card info-card p-4">
                <h5 className="fw-bold mb-3 pb-2 border-bottom">
                  <i className="bi bi-info-circle-fill text-warning me-2"></i>기본 정보
                </h5>
                {[
                  { label: '주소',    icon: 'bi-geo-alt-fill',   value: r.address || r.location, html: true },
                  { label: '영업시간', icon: 'bi-clock-fill',     value: r.hours || '정보 없음',   html: true },
                  { label: '추천메뉴', icon: 'bi-star-fill',      value: r.menu   || '정보 없음',   html: true, transform: v => v.replace(/,\s*/g, '<br>') },
                  { label: '가격대',  icon: 'bi-cash-coin',      value: r.price  || '정보 없음',   html: false },
                  { label: '주차',    icon: 'bi-p-circle-fill',  value: r.parking|| '정보 없음',   html: false },
                  { label: '전화',    icon: 'bi-telephone-fill', value: r.phone  || '정보 없음',   html: false },
                ].map(item => (
                  <div key={item.label} className="info-item">
                    <span className="info-label">
                      <i className={`bi ${item.icon} me-1`}></i>{item.label}
                    </span>
                    <span className="info-value">
                      {item.html ? (
                        <span dangerouslySetInnerHTML={{
                          __html: (item.transform ? item.transform(item.value) : item.value).replace(/\n/g, '<br>')
                        }} />
                      ) : item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* 지도 */}
              <div className="mt-4">
                <h6 className="fw-bold mb-2"><i className="bi bi-map-fill text-warning me-2"></i>위치</h6>
                {r.map_url ? (
                  <a href={r.map_url} target="_blank" rel="noopener noreferrer" className="btn btn-warning w-100">
                    <i className="bi bi-box-arrow-up-right me-1"></i>카카오맵으로 보기
                  </a>
                ) : (
                  <div className="map-placeholder">
                    <i className="bi bi-map display-4 mb-2"></i>
                    <p className="small mb-1">지도를 여기에 삽입하세요</p>
                    <p className="small text-muted mb-0">JSON의 map_url 필드에 링크를 입력하세요</p>
                  </div>
                )}
              </div>
            </div>

            {/* 오른쪽: 후기 */}
            <div className="col-lg-7">
              <div className="review-section p-4 mb-4">
                <h5 className="fw-bold mb-3 pb-2 border-bottom">
                  <i className="bi bi-chat-quote-fill text-warning me-2"></i>방문 후기
                </h5>
                {r.visit_date && (
                  <p className="text-muted small mb-3">방문일: {r.visit_date}</p>
                )}
                <div className="review-text">
                  <ReviewText text={r.review} />
                </div>
                <hr className="my-3" />
                <div className="row text-center g-2">
                  {[
                    { label: '맛',    rating: r.rating_taste || r.rating },
                    { label: '가성비', rating: r.rating_value || r.rating },
                    { label: '분위기', rating: r.rating_mood  || r.rating },
                  ].map(item => (
                    <div key={item.label} className="col-4">
                      <small className="text-muted d-block mb-1">{item.label}</small>
                      <span className="text-warning"><StarRating rating={item.rating} /></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 추천 태그 */}
              {r.tags && r.tags.length > 0 && (
                <div className="card info-card p-4 mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-person-check-fill text-warning me-2"></i>이런 분께 추천해요
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {r.tags.map(tag => (
                      <span key={tag} className="tag-pill">
                        <i className="bi bi-check-circle-fill text-success me-1"></i>{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 사진 */}
              <div className="card info-card p-4 mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-images text-warning me-2"></i>사진 모음
                </h5>
                <div className="row g-2">
                  {[0, 1, 2].map(i => (
                    r.photos && r.photos[i] ? (
                      <div key={i} className="col-4">
                        <img
                          src={`/images/${r.photos[i]}`}
                          className="img-fluid rounded"
                          style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                          alt={`${r.name} 사진`}
                        />
                      </div>
                    ) : (
                      <div key={i} className="col-4">
                        <div
                          className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                          style={{ height: '100px' }}
                        >
                          <i className="bi bi-image display-6"></i>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* 방문 팁 */}
              {r.tip && (
                <div className="alert alert-warning d-flex gap-3 align-items-start" role="alert">
                  <i className="bi bi-lightbulb-fill fs-5 mt-1 flex-shrink-0"></i>
                  <div>
                    <strong>방문 TIP</strong><br />
                    <small>{r.tip}</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 관련 맛집 */}
      <section className="py-5 bg-light">
        <div className="container">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-compass-fill text-warning me-2"></i>함께 보면 좋은 맛집
          </h5>
          <RelatedRestaurants currentId={idx} restaurants={restaurants} />
        </div>
      </section>
    </>
  )
}
