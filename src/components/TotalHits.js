import React from 'react'
import styles from './componentStyles.module.scss'


function TotalHits({ hits }) {
  return (
    <div className={styles.totalHits}>
      Total &nbsp;—&nbsp; {hits}
    </div>
  )
}

export default TotalHits
