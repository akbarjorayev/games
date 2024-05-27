import './Avatar.css'

export default function Avatar({ style, letter }) {
  return (
    <>
      <div className="avatar" style={style}>
        <div className="avatar_letter">{letter}</div>
      </div>
    </>
  )
}
