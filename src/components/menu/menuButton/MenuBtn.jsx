import React from 'react'
import styles from './menuBtn.module.scss'

const MenuBtn = ({ handleClick, itemsRef, index, name, isActive }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!isActive || !ref.current || !itemsRef.current) return
    const paddingLeft = 20

    const containerRect = itemsRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    const containerWidth = containerRect.width - paddingLeft

    if (containerWidth < Math.floor(elementRect.left + elementRect.width)) {
      itemsRef.current.scrollTo({
        left: elementRect.left.toFixed(0),
        behavior: 'smooth',
      })
    } else if (elementRect.left < paddingLeft) {
      itemsRef.current.scrollTo({
        left: paddingLeft + 'px',
        behavior: 'smooth',
      })
    }
  }, [isActive])

  return (
    <li ref={ref} className={`${styles.item} ${isActive ? styles.opened : ''}`}>
      <div onClick={() => handleClick(index)}>{name}</div>
    </li>
  )
}

const MenuBtnContainer = ({ dots, context, names, goToSlide }) => {
  const itemsRef = React.useRef()

  return (
    <div className={styles.container}>
      <div ref={itemsRef} className={styles.items}>
        {dots.map((_, index) => {
          return (
            <MenuBtn
              key={index}
              index={index}
              name={names[index]}
              handleClick={goToSlide}
              isActive={context.currentSlide === index}
              itemsRef={itemsRef}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MenuBtnContainer
