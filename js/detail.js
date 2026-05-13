/* ================================================
   용문동 맛집 블로그 - detail.js
   상세 페이지 동적 렌더링 (restaurant.html?id=N)
================================================ */

const DETAIL_CAT_CFG = {
  korean:   { label: '한식',     badge: 'badge-korean',   icon: 'bi-fire',      color: '#c0392b' },
  chinese:  { label: '중식',     badge: 'badge-chinese',  icon: 'bi-egg-fried', color: '#922b21' },
  japanese: { label: '일식',     badge: 'badge-japanese', icon: 'bi-cup-hot',   color: '#1a5276' },
  cafe:     { label: '카페',     badge: 'badge-cafe',     icon: 'bi-cup-straw', color: '#6d4c41' },
  bar:      { label: '술집',     badge: 'badge-bar',      icon: 'bi-balloon',   color: '#6c3483' },
  lunch:    { label: '점심맛집', badge: 'badge-lunch',    icon: 'bi-sun',       color: '#1e8449' },
};

function detailRenderStars(rating) {
  var html = '';
  for (var i = 1; i <= 5; i++) {
    if (rating >= i)             html += '<i class="bi bi-star-fill"></i>';
    else if (rating >= i - 0.5)  html += '<i class="bi bi-star-half"></i>';
    else                         html += '<i class="bi bi-star"></i>';
  }
  return html;
}

function reviewToHtml(text) {
  if (!text) return '<p class="text-muted fst-italic">후기가 아직 작성되지 않았습니다.</p>';
  return text.split(/\n\n+/)
    .map(function(para) {
      return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
    })
    .join('');
}

function setTxt(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

function setHtml(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html || '';
}

function renderRelated(currentId) {
  var el = document.getElementById('detail-related');
  if (!el || typeof RESTAURANTS === 'undefined') return;

  var current = RESTAURANTS[currentId];
  var currentCats = Array.isArray(current.category) ? current.category : [current.category];

  var others = RESTAURANTS
    .map(function(r, i) { return { r: r, i: i }; })
    .filter(function(item) { return item.i !== currentId; });

  var sameCat = others.filter(function(item) {
    var c = Array.isArray(item.r.category) ? item.r.category : [item.r.category];
    return c.some(function(cat) { return currentCats.indexOf(cat) >= 0; });
  });
  var diffCat = others.filter(function(item) {
    var c = Array.isArray(item.r.category) ? item.r.category : [item.r.category];
    return !c.some(function(cat) { return currentCats.indexOf(cat) >= 0; });
  });

  var candidates = sameCat.concat(diffCat).slice(0, 3);

  el.innerHTML = candidates.map(function(item) {
    var r   = item.r;
    var idx = item.i;
    var cats = Array.isArray(r.category) ? r.category : [r.category];
    var cfg  = DETAIL_CAT_CFG[cats[0]] || DETAIL_CAT_CFG.korean;

    var imgHtml = r.image
      ? '<img src="images/' + r.image + '" style="height:150px;object-fit:cover;width:100%;" alt="' + r.name + '">'
      : '<div class="food-img-placeholder" style="background-color:' + cfg.color + ';height:150px;">' +
          '<div class="placeholder-content">' +
            '<i class="bi ' + cfg.icon + '"></i>' +
            '<span>' + cfg.label + '</span>' +
          '</div>' +
        '</div>';

    return '<div class="col-md-6 col-lg-4">' +
      '<div class="card h-100 food-card">' +
        imgHtml +
        '<div class="card-body">' +
          '<span class="badge badge-category ' + cfg.badge + ' mb-2">' + cfg.label + '</span>' +
          '<h6 class="card-title fw-bold">' + r.name + '</h6>' +
          '<p class="card-text text-muted small">' + r.description + '</p>' +
        '</div>' +
        '<div class="card-footer bg-white border-0 pb-3">' +
          '<a href="restaurant.html?id=' + idx + '" class="btn btn-outline-warning btn-sm w-100">상세보기</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof RESTAURANTS === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id') || '0', 10);

  if (isNaN(id) || id < 0 || id >= RESTAURANTS.length) {
    document.body.innerHTML =
      '<div class="container py-5 text-center">' +
        '<h2 class="mb-3">맛집을 찾을 수 없습니다.</h2>' +
        '<a href="index.html" class="btn btn-warning px-4">홈으로 돌아가기</a>' +
      '</div>';
    return;
  }

  var r    = RESTAURANTS[id];
  var cats = Array.isArray(r.category) ? r.category : [r.category];
  var primary = DETAIL_CAT_CFG[cats[0]] || DETAIL_CAT_CFG.korean;

  /* ---- 페이지 타이틀 ---- */
  document.title = r.name + ' | 용문동 맛집';

  /* ---- 히어로: 뱃지 ---- */
  setHtml('detail-badge-container', cats.map(function(c) {
    var cfg = DETAIL_CAT_CFG[c];
    return cfg ? '<span class="badge badge-category ' + cfg.badge + '">' + cfg.label + '</span>' : '';
  }).join(' '));

  /* ---- 히어로: 별점 · 이름 ---- */
  setHtml('detail-stars-hero', detailRenderStars(r.rating));
  setTxt('detail-rating-num', r.rating.toFixed(1));
  setTxt('detail-name', r.name);

  /* ---- 대표 이미지 ---- */
  var imgWrap = document.getElementById('detail-img-wrap');
  if (imgWrap) {
    if (r.image) {
      imgWrap.innerHTML =
        '<img src="images/' + r.image + '" class="img-fluid w-100"' +
        ' alt="' + r.name + '" style="height:380px;object-fit:cover;border-radius:12px;">';
    } else {
      imgWrap.innerHTML =
        '<div class="detail-img-placeholder" style="background:linear-gradient(135deg,' +
        primary.color + 'bb,' + primary.color + ')">' +
          '<i class="bi bi-house-heart-fill"></i>' +
        '</div>';
    }
  }

  /* ---- 기본 정보 ---- */
  setHtml('detail-address', (r.address || r.location).replace(/\n/g, '<br>'));
  setHtml('detail-hours',   r.hours   ? r.hours.replace(/\n/g, '<br>')   : '<span class="text-muted">정보 없음</span>');
  setHtml('detail-menu-info', r.menu  ? r.menu.replace(/,\s*/g, '<br>')  : '<span class="text-muted">정보 없음</span>');
  setHtml('detail-price',   r.price   || '<span class="text-muted">정보 없음</span>');
  setTxt('detail-parking',  r.parking || '정보 없음');
  setTxt('detail-phone',    r.phone   || '정보 없음');

  /* ---- 방문 후기 ---- */
  var visitEl = document.getElementById('detail-visit-date');
  if (visitEl) {
    visitEl.textContent = r.visit_date ? '방문일: ' + r.visit_date : '';
    visitEl.style.display = r.visit_date ? '' : 'none';
  }
  setHtml('detail-review-text', reviewToHtml(r.review));

  /* ---- 세부 별점 ---- */
  setHtml('detail-stars-taste', detailRenderStars(r.rating_taste || r.rating));
  setHtml('detail-stars-value', detailRenderStars(r.rating_value || r.rating));
  setHtml('detail-stars-mood',  detailRenderStars(r.rating_mood  || r.rating));

  /* ---- 추천 태그 ---- */
  var tagsEl    = document.getElementById('detail-tags');
  var tagsCard  = document.getElementById('detail-tags-card');
  if (tagsEl && r.tags && r.tags.length) {
    tagsEl.innerHTML = r.tags.map(function(tag) {
      return '<span class="tag-pill"><i class="bi bi-check-circle-fill text-success me-1"></i>' + tag + '</span>';
    }).join('');
  } else if (tagsCard) {
    tagsCard.style.display = 'none';
  }

  /* ---- 추가 사진 ---- */
  var photosEl = document.getElementById('detail-photos');
  if (photosEl) {
    var photoItems = (r.photos && r.photos.length) ? r.photos.slice(0, 3) : [];
    var html = photoItems.map(function(p) {
      return '<div class="col-4"><img src="images/' + p +
        '" class="img-fluid rounded" style="height:100px;object-fit:cover;width:100%;" alt="' + r.name + ' 사진"></div>';
    }).join('');
    for (var i = photoItems.length; i < 3; i++) {
      html += '<div class="col-4">' +
        '<div class="bg-light rounded d-flex align-items-center justify-content-center text-muted" style="height:100px;">' +
          '<i class="bi bi-image display-6"></i>' +
        '</div></div>';
    }
    photosEl.innerHTML = html;
  }

  /* ---- 방문 팁 ---- */
  var tipAlert = document.getElementById('detail-tip-alert');
  var tipText  = document.getElementById('detail-tip-text');
  if (r.tip) {
    if (tipText) tipText.textContent = r.tip;
  } else if (tipAlert) {
    tipAlert.style.display = 'none';
  }

  /* ---- 지도 링크 ---- */
  var mapLink = document.getElementById('detail-map-link');
  if (mapLink && r.map_url) {
    mapLink.href = r.map_url;
    mapLink.textContent = '카카오맵으로 보기';
  }

  /* ---- 관련 맛집 ---- */
  renderRelated(id);

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
