import { Link } from 'react-router-dom'
import ArrowLeft from '../../components/ArrowLeft'
import styles from './devicePage.module.scss'

const DevicePage = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.goToBack}>
          <Link to='/'>
            <ArrowLeft />
          </Link>
        </div>
      </div>
      <div className={styles.title}>Присторї</div>
      <div className={styles.content}></div>
    </div>
  )
}

export default DevicePage
