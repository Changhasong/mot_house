export default function StarRating({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>)
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="bi bi-star-half"></i>)
    } else {
      stars.push(<i key={i} className="bi bi-star"></i>)
    }
  }
  return <>{stars}</>
}
