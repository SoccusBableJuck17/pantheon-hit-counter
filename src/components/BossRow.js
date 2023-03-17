import React from 'react'
import styles from './componentStyles.module.scss'

function BossRow({ name, count, incrementCount, decrementCount, writeCount, toggleReset, clickable, reset }) {

  const displayName = name.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')

  let plusStyle = reset ? styles.rPlus : styles.plus
  let minusStyle = reset ? styles.rMinus : styles.minus
  let inputCountStyle = reset ? styles.rInputCount : styles.inputCount
  let bossStyle = reset ? styles.rBossDiv : styles.bossDiv

  return (
    <div className={styles.flexContainer}>
      <div className={bossStyle} onClick={() => {toggleReset(name)}}>{displayName}</div>
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
