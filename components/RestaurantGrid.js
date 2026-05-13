'use client'
import { useState } from 'react'
import RestaurantCard from './RestaurantCard'

const CATEGORIES = [
  { id: 'all',      label: '전체',     icon: 'bi-grid-fill' },
  { id: 'korean',   label: '한식',     icon: 'bi-fire' },
  { id: 'chinese',  label: '중식',     icon: 'bi-egg-fried' },
  { id: 'japanese', label: '일식',     icon: 'bi-cup-hot' },
  { id: 'cafe',     label: '카페',     icon: 'bi-cup-straw' },
  { id: 'bar',      label: '술집',     icon: 'bi-balloon' },
  { id: 'lunch',    label: '점심맛집', icon: 'bi-sun' },
]

export default function RestaurantGrid({ restaurants }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredWithIndex = activeFilter === 'all'
    ? restaurants.map((r, i) => ({ r, i }))
    : restaurants
        .map((r, i) => ({ r, i }))
        .filter(({ r }) => {
          const cats = Array.isArray(r.category) ? r.category : [r.category]
          return cats.includes(activeFilter)
        })

  return (
    <>
      {/* 카테고리 필터 */}
      <section className="category-section py-4 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`btn btn-filter ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                <i className={`bi ${cat.icon} me-1`}></i>{cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 맛집 카드 목록 */}
      <section id="restaurants" className="py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold">용문동 맛집 모음</h2>
            <p className="text-muted mt-3">직접 방문하고 기록한 맛집들을 소개합니다</p>
          </div>

          {filteredWithIndex.length > 0 ? (
            <div className="row g-4">
              {filteredWithIndex.map(({ r, i }) => (
                <RestaurantCard key={i} restaurant={r} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search display-4 text-muted"></i>
              <p className="text-muted mt-3 mb-0">해당 카테고리의 맛집이 아직 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
