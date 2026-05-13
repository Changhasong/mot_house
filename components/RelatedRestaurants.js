import Link from 'next/link'

const CAT_CFG = {
  korean:   { label: '한식',     icon: 'bi-fire',      color: '#c0392b', badge: 'badge-korean'   },
  chinese:  { label: '중식',     icon: 'bi-egg-fried', color: '#922b21', badge: 'badge-chinese'  },
  japanese: { label: '일식',     icon: 'bi-cup-hot',   color: '#1a5276', badge: 'badge-japanese' },
  cafe:     { label: '카페',     icon: 'bi-cup-straw', color: '#6d4c41', badge: 'badge-cafe'     },
  bar:      { label: '술집',     icon: 'bi-balloon',   color: '#6c3483', badge: 'badge-bar'      },
  lunch:    { label: '점심맛집', icon: 'bi-sun',       color: '#1e8449', badge: 'badge-lunch'    },
}

export default function RelatedRestaurants({ currentId, restaurants }) {
  const current = restaurants[currentId]
  const currentCats = Array.isArray(current.category) ? current.category : [current.category]

  const others = restaurants.map((r, i) => ({ r, i })).filter(({ i }) => i !== currentId)
  const sameCat = others.filter(({ r }) => {
    const c = Array.isArray(r.category) ? r.category : [r.category]
    return c.some(cat => currentCats.includes(cat))
  })
  const diffCat = others.filter(({ r }) => {
    const c = Array.isArray(r.category) ? r.category : [r.category]
    return !c.some(cat => currentCats.includes(cat))
  })
  const candidates = [...sameCat, ...diffCat].slice(0, 3)

  if (candidates.length === 0) return null

  return (
    <div className="row g-4">
      {candidates.map(({ r, i }) => {
        const cats = Array.isArray(r.category) ? r.category : [r.category]
        const cfg = CAT_CFG[cats[0]] || CAT_CFG.korean
        return (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card h-100 food-card">
              {r.image ? (
                <img
                  src={`/images/${r.image}`}
                  style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                  alt={r.name}
                />
              ) : (
                <div className="food-img-placeholder" style={{ backgroundColor: cfg.color, height: '150px' }}>
                  <div className="placeholder-content">
                    <i className={`bi ${cfg.icon}`}></i>
                    <span>{cfg.label}</span>
                  </div>
                </div>
              )}
              <div className="card-body">
                <span className={`badge badge-category ${cfg.badge} mb-2`}>{cfg.label}</span>
                <h6 className="card-title fw-bold">{r.name}</h6>
                <p className="card-text text-muted small">{r.description}</p>
              </div>
              <div className="card-footer bg-white border-0 pb-3">
                <Link href={`/restaurant/${i}`} className="btn btn-outline-warning btn-sm w-100">
                  상세보기
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
