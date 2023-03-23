import React from 'react'
import styles from './componentStyles.module.scss'

function SaveAttempt({ saveAttempt }) {
    return (
        <div className={styles.saveAttempt} onClick={saveAttempt}>
            Save Attempt
        </div>
    )
}

export default SaveAttempt
