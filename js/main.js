/* ================================================
   용문동 맛집 블로그 - main.js
   카테고리 필터 + 데이터 기반 카드 렌더링
================================================ */

const CATEGORY_CONFIG = {
  korean:   { label: '한식',     icon: 'bi-fire',      color: '#c0392b', badge: 'badge-korean'   },
  chinese:  { label: '중식',     icon: 'bi-egg-fried', color: '#922b21', badge: 'badge-chinese'  },
  japanese: { label: '일식',     icon: 'bi-cup-hot',   color: '#1a5276', badge: 'badge-japanese' },
  cafe:     { label: '카페',     icon: 'bi-cup-straw', color: '#6d4c41', badge: 'badge-cafe'     },
  bar:      { label: '술집',     icon: 'bi-balloon',   color: '#6c3483', badge: 'badge-bar'      },
  lunch:    { label: '점심맛집', icon: 'bi-sun',       color: '#1e8449', badge: 'badge-lunch'    },
};

function renderStars(rating) {
  var html = '';
  for (var i = 1; i <= 5; i++) {
    if (rating >= i)            html += '<i class="bi bi-star-fill"></i>';
    else if (rating >= i - 0.5) html += '<i class="bi bi-star-half"></i>';
    else                        html += '<i class="bi bi-star"></i>';
  }
  return html;
}

function renderCard(r, idx) {
  var cats = Array.isArray(r.category) ? r.category : [r.category];
  var primary = CATEGORY_CONFIG[cats[0]] || CATEGORY_CONFIG.korean;

  var imageHtml = r.image
    ? '<img src="images/' + r.image + '" class="food-card-img" alt="' + r.name + '">'
    : '<div class="food-img-placeholder" style="background-color:' + primary.color + ';">' +
        '<div class="placeholder-content">' +
          '<i class="bi ' + primary.icon + '"></i>' +
          '<span>' + primary.label + '</span>' +
        '</div>' +
      '</div>';

  var badgesHtml = cats
    .map(function(c) {
      var cfg = CATEGORY_CONFIG[c];
      return cfg ? '<span class="badge badge-category ' + cfg.badge + '">' + cfg.label + '</span>' : '';
    })
    .join(' ');

  return '<div class="col-md-6 col-lg-4 restaurant-card" data-category="' + cats.join(' ') + '">' +
    '<div class="card h-100 food-card">' +
      imageHtml +
      '<div class="card-body">' +
        '<div class="d-flex justify-content-between align-items-start mb-2">' +
          '<div>' + badgesHtml + '</div>' +
          '<span class="text-warning small">' + renderStars(r.rating) + '</span>' +
        '</div>' +
        '<h5 class="card-title fw-bold">' + r.name + '</h5>' +
        '<p class="card-text text-muted small">' + r.description + '</p>' +
        '<hr class="my-2" />' +
        '<div class="restaurant-info small">' +
          '<p class="mb-1"><i class="bi bi-geo-alt-fill text-danger me-1"></i>' + r.location + '</p>' +
          '<p class="mb-0"><i class="bi bi-star-fill text-warning me-1"></i>추천메뉴: ' + r.menu + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="card-footer bg-white border-0 pb-3">' +
        '<a href="restaurant.html?id=' + idx + '" class="btn btn-outline-warning w-100 fw-semibold">상세보기</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderRestaurants() {
  var grid = document.getElementById('restaurantGrid');
  if (!grid || typeof RESTAURANTS === 'undefined') return;
  grid.innerHTML = RESTAURANTS.map(function(r, i) { return renderCard(r, i); }).join('');
}

function initFilter() {
  var filterButtons = document.querySelectorAll('.btn-filter');
  var noResults = document.getElementById('noResults');

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.dataset.filter;
      var visibleCount = 0;

      document.querySelectorAll('.restaurant-card').forEach(function(card) {
        var categories = card.dataset.category || '';
        if (filter === 'all' || categories.split(' ').includes(filter)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.classList.toggle('d-none', visibleCount > 0);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {

  /* ---- 카드 렌더링 (data/restaurants.js 데이터 사용) ---- */
  renderRestaurants();

  /* ---- 카테고리 필터 초기화 ---- */
  initFilter();

  /* ---- 네비게이션 현재 페이지 활성화 ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---- 부드러운 앵커 스크롤 ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
