import React from 'react'
import styles from './modalWindow.module.scss'
import { createPortal } from 'react-dom'

const ModalWindow = ({ onClose, children }) => {
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
      <div className={styles.content}>{children}</div>
    </div>,
    document.body
  )
}

export default ModalWindow
