import { useEffect, useState } from 'react'

import AvatarEditAlert from './AvatarEditAlert'

import { downloadAvatar } from '../../modules/avatar.module'

import './Avatar.css'

export default function Avatar({
  style,
  letter,
  img: iImg,
  id,
  editable = false,
}) {
  const [edit, setEdit] = useState(false)
  const [img, setImg] = useState(iImg)

  useEffect(() => {
    if (iImg || iImg === '') return setImg(iImg)

    async function loadData() {
      const storeImg = await downloadAvatar(id)
      setImg(storeImg)
    }
    loadData()
  }, [iImg])

  return (
    <>
      <div
        className={`avatar ${editable ? 'scale_trns cur_pointer' : ''}`}
        style={style}
        onClick={() => editable && setEdit(true)}
        tabIndex={editable ? '0' : '-1'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && editable) setEdit(true)
        }}
      >
        <AvatarImgLetter letter={letter} img={img} />
      </div>
      {edit && (
        <AvatarEditAlert
          onHide={() => setEdit(false)}
          letter={letter}
          img={img}
        />
      )}
    </>
  )
}

function AvatarImgLetter({ letter, img }) {
  return (
    <>
      {img && <img className="avatar_img" alt="Avatar" src={img} />}
      {!img && letter && <div className="avatar_letter">{letter}</div>}
      {!img && !letter && (
        <span
          className="material-symbols-outlined avatar_letter"
          style={{ fontSize: 'inherit' }}
        >
          sentiment_dissatisfied
        </span>
      )}
    </>
  )
}
