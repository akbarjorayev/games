import './Loading.css'

export default function Loading({ size }) {
  return (
    <div className="loading_con" style={{ '--loading-size': `${size}px` }}>
      <div className="loading_spinner"></div>
    </div>
  )
}
