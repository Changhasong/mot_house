export const metadata = {
  title: '용문동 이야기 | 용문동 맛집 블로그',
  description: '용문동 맛집 블로그 소개, 기록 이유, 광고/협찬 안내, 문의 방법',
}

export default function About() {
  return (
    <>
      {/* 히어로 */}
      <section className="about-hero text-white d-flex align-items-center py-5">
        <div className="container text-center">
          <p className="hero-sub mb-2">블로그 소개</p>
          <h1 className="fw-bold display-5 mb-2">용문동 이야기</h1>
          <p className="lead opacity-85 mb-0">동네 맛집을 기록하는 이유</p>
        </div>
      </section>

      {/* 블로그 소개 */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">이 블로그를 시작한 이유</h2>

              <div className="timeline-item">
                <div className="timeline-dot"><i className="bi bi-dot"></i></div>
                <h6 className="fw-bold mb-1">용문동과의 인연</h6>
                <p className="text-muted small">
                  용문동에 이사 온 뒤 동네를 걸어다니며 숨겨진 맛집이 정말 많다는 걸 알게 됐습니다.
                  각종 사이트에서 거짓 정보에 지쳐 진짜 맛있는 맛집을 가지 못하고 있는 분들이 많다는 걸 느꼈습니다.
                  그래서 직접 방문한 곳만 기록하기로 했습니다.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"><i className="bi bi-dot"></i></div>
                <h6 className="fw-bold mb-1">광고 없이, 진심으로</h6>
                <p className="text-muted small">
                  광고나 협찬 없이 직접 지갑을 열고 방문한 곳만 소개합니다.
                  솔직한 후기로 용문동을 방문하는 분들과 주민들에게 도움이 되고자 합니다.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"><i className="bi bi-dot"></i></div>
                <h6 className="fw-bold mb-1">기록의 의미</h6>
                <p className="text-muted small">
                  오래된 가게들이 사라지기 전에 기록으로 남기고,
                  새로 생기는 맛집들도 꾸준히 소개해 용문동 맛집 지도를 완성해가겠습니다.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow p-4 rounded-3">
                <div className="text-center mb-4">
                  <div
                    className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '90px', height: '90px' }}
                  >
                    <i className="bi bi-person-fill text-warning" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-1">용문동 탐식가</h5>
                  <p className="text-muted small">대전 서구 용문동 거주 | 맛집 탐방 중</p>
                </div>
                <ul className="list-unstyled small text-muted">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>모든 방문은 개인 비용으로 진행</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>광고·협찬 시 반드시 명시</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>주관적 후기임을 전제로 작성</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>잘못된 정보는 수정 요청 환영</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 용문동 소개 */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold">용문동은 어떤 동네인가요?</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100 text-center rounded-3">
                <div className="text-warning mb-3"><i className="bi bi-geo-alt-fill" style={{ fontSize: '2.5rem' }}></i></div>
                <h5 className="fw-bold mb-2">접근성</h5>
                <p className="text-muted small mb-0">
                  대전 서구에 위치한 용문동은 지하철과 버스 노선이 잘 갖춰져 있어 대전 어디서든 접근이 편리합니다.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100 text-center rounded-3">
                <div className="text-warning mb-3"><i className="bi bi-house-heart-fill" style={{ fontSize: '2.5rem' }}></i></div>
                <h5 className="fw-bold mb-2">동네 분위기</h5>
                <p className="text-muted small mb-0">
                  조용한 주거지와 상업 지역이 어우러진 용문동은 오래된 술집과 고깃집이 공존하는 매력적인 동네입니다.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100 text-center rounded-3">
                <div className="text-warning mb-3"><i className="bi bi-shop" style={{ fontSize: '2.5rem' }}></i></div>
                <h5 className="fw-bold mb-2">숨은 맛집</h5>
                <p className="text-muted small mb-0">
                  SNS에 잘 알려지지 않았지만 수십 년의 역사를 가진 진짜 동네 맛집들이 골목마다 숨어 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 광고/협찬 고지 */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-4 text-center">광고 및 협찬 안내</h3>
              <div className="notice-box mb-4">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>광고/협찬 고지
                </h6>
                <p className="small text-muted mb-2">
                  이 블로그의 모든 후기는 <strong>개인 비용으로 직접 방문</strong>하여 작성된 것입니다.
                  협찬이나 광고를 받은 경우에는 해당 게시물에 <strong>[광고]</strong> 또는 <strong>[협찬]</strong> 표시를 명확히 합니다.
                </p>
                <p className="small text-muted mb-0">
                  광고 표시가 없는 모든 글은 순수 개인 방문 후기입니다.
                </p>
              </div>
              <div className="card border-0 shadow-sm p-4 rounded-3">
                <h6 className="fw-bold mb-3">협찬/제휴 문의</h6>
                <p className="text-muted small mb-3">
                  용문동 음식점 운영자 분 중 소개를 원하시는 분은 아래 방법으로 연락 주세요.
                  단, 광고 게시물은 반드시 <strong>[광고]</strong> 표기 후 게재됩니다.
                </p>
                <p className="small mb-0">
                  <i className="bi bi-envelope-fill me-1"></i>mustbsm@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 문의 */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold">문의 안내</h2>
            <p className="text-muted mt-3">잘못된 정보, 폐업 제보, 신규 맛집 추천 모두 환영합니다</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="contact-card p-4 text-center bg-white rounded-3">
                <div className="text-warning mb-3">
                  <i className="bi bi-envelope-fill" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h6 className="fw-bold mb-2">이메일</h6>
                <p className="text-muted small mb-3">맛집 정보 제보 및 수정 요청</p>
                <a href="mailto:mustbsm@gmail.com" className="small text-decoration-none">
                  mustbsm@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <p className="text-muted small">
              <i className="bi bi-info-circle me-1"></i>
              폐업 또는 정보 오류 제보는 이메일로 알려주시면 빠르게 수정하겠습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
