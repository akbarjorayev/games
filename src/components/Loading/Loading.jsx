import './Loading.css'

export default function Loading({ size }) {
  return (
    <div className="loading_con">
      <div
        className="loading_spinner"
        style={{ '--loading-size': `${size}px` }}
      ></div>
    </div>
  )
}
