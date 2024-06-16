import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import Avatar from './Avatar'
import Button from '../Button/Button'

import { uploadAvatar } from '../../modules/avatar.module'
import { deviceIsPhone } from '../../js/utils/device'

import '../Alert/Alert.css'

const AvatarEditAlertContext = createContext()

export default function AvatarEditAlert({ onHide, letter, img: iImg }) {
  const [imgs, setImgs] = useState({
    img: iImg || '',
    iImg: iImg || '',
    imgFile: iImg || false,
  })
  const [alertDisabled, setAlertDisabled] = useState(false)
  const isPhone = useRef(deviceIsPhone()).current

  function handleDrop(e) {
    e.preventDefault()

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const checkedSize = checkSize(file.size)
      if (!checkedSize.ok) return toast.error(checkedSize.msg)

      const reader = new FileReader()
      reader.onload = () => {
        setImgs({ ...imgs, img: reader.result, imgFile: file })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <AvatarEditAlertContext.Provider
        value={{
          imgs,
          setImgs,
          alertDisabled,
          setAlertDisabled,
          isPhone,
          onHide,
        }}
      >
        <div
          className="avatar_edit_alert alert_area pos_full_page d_f_ce"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div
            className="pos_full_page alert_bg blur_theme_bg"
            onClick={onHide}
          ></div>
          <div className="alert_con d_f_ai_ce list_y">
            <Avatar
              style={{ fontSize: '70px', height: '150px' }}
              letter={letter}
              img={imgs.img}
            ></Avatar>
            <UploadButton />
            {imgs.img && <DeleteButton />}
            <SaveButton />
          </div>
        </div>
      </AvatarEditAlertContext.Provider>
    </>
  )
}

function UploadButton() {
  const inputFileRef = useRef()
  const inputCameraRef = useRef()
  const { imgs, setImgs, alertDisabled, isPhone } = useContext(
    AvatarEditAlertContext
  )

  function upload(e) {
    const file = e.target.files[0]
    if (!file) return

    const checkedSize = checkSize(file.size)
    if (!checkedSize.ok) return toast.error(checkedSize.msg)

    const reader = new FileReader()

    reader.onload = () => {
      setImgs({ ...imgs, img: reader.result, imgFile: file })
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className="list_x w_100 w_100_child">
        <Button
          className="w_100 btn_bd_cl txt_cl bg_h_none"
          onClick={() => inputFileRef.current.click()}
          disabled={alertDisabled}
        >
          Upload
        </Button>
        {isPhone && (
          <Button
            className="w_100 btn_bd_cl txt_cl bg_h_none"
            onClick={() => inputCameraRef.current.click()}
            disabled={alertDisabled}
          >
            Camera
          </Button>
        )}
      </div>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        className="d_n"
        onChange={upload}
      />
      <input
        ref={inputCameraRef}
        type="file"
        accept="image/*"
        capture="camera"
        className="d_n"
        onChange={upload}
      />
    </>
  )
}

function DeleteButton() {
  const { imgs, setImgs, alertDisabled } = useContext(AvatarEditAlertContext)

  return (
    <>
      <Button
        className="w_100 btn_bd_cr txt_red bg_h_none"
        onClick={() => setImgs({ ...imgs, img: '', imgFile: false })}
        disabled={alertDisabled}
      >
        Delete
      </Button>
    </>
  )
}

const SAVE_BTN_TEXTS = {
  save: 'Save',
  saving: 'Saving',
}
function SaveButton() {
  const { imgs, setAlertDisabled, onHide } = useContext(AvatarEditAlertContext)
  const [disabled, setDisabled] = useState(imgs.img === imgs.iImg)
  const [saveBtnText, setSaveBtnText] = useState(SAVE_BTN_TEXTS.save)

  useEffect(() => {
    setDisabled(imgs.img === imgs.iImg || saveBtnText === SAVE_BTN_TEXTS.saving)
  }, [imgs.img, imgs.iImg, saveBtnText])

  async function save() {
    setAlertDisabled(true)
    setSaveBtnText(SAVE_BTN_TEXTS.saving)

    const uploaded = await uploadAvatar(
      imgs.imgFile,
      window.location.pathname.split('users/')[1]
    )
    if (uploaded) {
      toast.success('Avatar saved!')
      onHide()
    }
    if (!uploaded) toast.error('Failed to save avatar')

    setSaveBtnText(SAVE_BTN_TEXTS.save)
    setAlertDisabled(false)
  }

  return (
    <>
      <button
        className={`con w_100 txt_ce blur_theme_bg blur_ha fz_medium pd_tb_small ${
          !disabled ? 'scale_trns cur_pointer' : ''
        }`}
        onClick={save}
        disabled={disabled}
      >
        {saveBtnText}
      </button>
    </>
  )
}

function checkSize(size) {
  const maxSize = 2 * 1024 * 1024
  return { ok: size <= maxSize, msg: 'Max size is 2MB' }
}
