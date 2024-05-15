import React from 'react'
import styles from './confirmWindow.module.scss'
import { createPortal } from 'react-dom'
import Button from '../button/Button'
import Loading from '../loading/Loading'

const ConfirmWindow = ({ onClose, text, buttonText, isLoading, onClick }) => {
  const contentRef = React.useRef()
  const wrapperRef = React.useRef(null)

  const handleMouseDown = (e) => {
    if (e.target === wrapperRef.current) {
      e.preventDefault()
      e.stopPropagation()
      onClose && onClose()
    }
  }

  return createPortal(
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      className={styles.wrapper}
    >
      <div ref={contentRef} className={styles.content}>
        <div>{text}</div>
        <Button onClick={onClick}>{buttonText}</Button>
        {isLoading && <Loading />}
      </div>
    </div>,
    document.body
  )
}

export default ConfirmWindow
