import React from 'react'
import styles from './componentStyles.module.scss'

function BossRow({ name, count, incrementCount, decrementCount, writeCount }) {

  const displayName = name.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')

  return (
    <div className={styles.flexContainer}>
      <div className={styles.bossDiv}>{displayName}</div>
      <div className={styles.countDiv}>
        <input
          className={styles.inputCount}
          type="number"
          value={count}
          onChange={event => { writeCount(name, event) }}
        />
      </div>
      <div className={styles.plus} onClick={() => { incrementCount(name) }}></div>
      <div className={styles.minus} onClick={() => { decrementCount(name) }}></div>
    </div>
  )
}

export default React.memo(BossRow)
