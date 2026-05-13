import Link from 'next/link'
import StarRating from './StarRating'

const CATEGORY_CONFIG = {
  korean:   { label: '한식',     icon: 'bi-fire',      color: '#c0392b', badge: 'badge-korean'   },
  chinese:  { label: '중식',     icon: 'bi-egg-fried', color: '#922b21', badge: 'badge-chinese'  },
  japanese: { label: '일식',     icon: 'bi-cup-hot',   color: '#1a5276', badge: 'badge-japanese' },
  cafe:     { label: '카페',     icon: 'bi-cup-straw', color: '#6d4c41', badge: 'badge-cafe'     },
  bar:      { label: '술집',     icon: 'bi-balloon',   color: '#6c3483', badge: 'badge-bar'      },
  lunch:    { label: '점심맛집', icon: 'bi-sun',       color: '#1e8449', badge: 'badge-lunch'    },
}

export default function RestaurantCard({ restaurant, index }) {
  const cats = Array.isArray(restaurant.category) ? restaurant.category : [restaurant.category]
  const primary = CATEGORY_CONFIG[cats[0]] || CATEGORY_CONFIG.korean

  return (
    <div className="col-md-6 col-lg-4 restaurant-card">
      <div className="card h-100 food-card">
        {restaurant.image ? (
          <img
            src={`/images/${restaurant.image}`}
            className="food-card-img"
            alt={restaurant.name}
          />
        ) : (
          <div className="food-img-placeholder" style={{ backgroundColor: primary.color }}>
            <div className="placeholder-content">
              <i className={`bi ${primary.icon}`}></i>
              <span>{primary.label}</span>
            </div>
          </div>
        )}
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              {cats.map(c => {
                const cfg = CATEGORY_CONFIG[c]
                return cfg ? (
                  <span key={c} className={`badge badge-category ${cfg.badge} me-1`}>{cfg.label}</span>
                ) : null
              })}
            </div>
            <span className="text-warning small">
              <StarRating rating={restaurant.rating} />
            </span>
          </div>
          <h5 className="card-title fw-bold">{restaurant.name}</h5>
          <p className="card-text text-muted small">{restaurant.description}</p>
          <hr className="my-2" />
          <div className="restaurant-info small">
            <p className="mb-1">
              <i className="bi bi-geo-alt-fill text-danger me-1"></i>{restaurant.location}
            </p>
            <p className="mb-0">
              <i className="bi bi-star-fill text-warning me-1"></i>추천메뉴: {restaurant.menu}
            </p>
          </div>
        </div>
        <div className="card-footer bg-white border-0 pb-3">
          <Link href={`/restaurant/${index}`} className="btn btn-outline-warning w-100 fw-semibold">
            상세보기
          </Link>
        </div>
      </div>
    </div>
  )
}
