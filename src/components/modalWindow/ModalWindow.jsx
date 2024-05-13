import React from 'react'
import styles from './modalWindow.module.scss'
import { createPortal } from 'react-dom'

const ModalWindow = ({ onClose, children }) => {
  const contentRef = React.useRef()

  const handleMouseDown = (e) => {
    if (e.clientY < 130) {
      e.preventDefault()
      e.stopPropagation()
      onClose && onClose()
    }
  }

  return createPortal(
    <div onMouseDown={handleMouseDown} className={styles.wrapper}>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default ModalWindow
