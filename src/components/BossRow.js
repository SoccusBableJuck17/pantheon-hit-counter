import React from 'react'
import styles from './componentStyles.module.scss'

function BossRow({ name, count, incrementCount, decrementCount, writeCount, toggleReset, clickable, reset, resettable }) {

  const displayName = name.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')

  let plusStyle = reset ? styles.rPlus : clickable ? styles.plus : styles.iPlus
  let minusStyle = reset ? styles.rMinus : clickable ? styles.minus : styles.iMinus
  let inputCountStyle = reset ? styles.rInputCount : clickable ? styles.inputCount : styles.iInputCount
  let bossStyle = reset ? styles.rBossDiv : !clickable ? styles.iBossDiv : resettable ? styles.bossDiv : styles.uBossDiv

  return (
    <div className={styles.flexContainer}>
      <div className={bossStyle} onClick={() => { toggleReset(name) }}>{displayName}</div>
      <div className={styles.countDiv}>
        <input
          className={inputCountStyle}
          type="number"
          value={count}
          onChange={event => { writeCount(name, event, clickable) }}
        />
      </div>
      <div className={plusStyle} onClick={() => { incrementCount(name, clickable) }}>
      </div>
      <div className={minusStyle} onClick={() => { decrementCount(name, clickable) }}></div>
    </div>
  )
}

export default React.memo(BossRow)
