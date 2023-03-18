import React from 'react'
import styles from './componentStyles.module.scss'

function Reset({ resetTable }) {
  return (
    <div className={styles.reset} onClick={resetTable}>
      Reset
    </div>
  )
}

export default Reset
