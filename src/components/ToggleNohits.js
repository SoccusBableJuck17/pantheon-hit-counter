import React from 'react'
import styles from './componentStyles.module.scss'


function ToggleNohits({ displayNohits, toggleNohits }) {

  let text = displayNohits ? 'Hide Nohits' : 'Show Nohits'
  return (
    <div className={styles.toggleNohits} onClick={toggleNohits}>
      {text}
    </div>
  )
}

export default ToggleNohits
