import React, { useState } from 'react'
import styles from './componentStyles.module.scss'
import UploadModal from './UploadModal'

function UploadAttempts({handleOutput}) {

  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)



  return (
    <div>
      <div className={styles.uploadHistory} onClick={() => setIsOpen(true)}>
        Upload Attempt History
      </div>
      <UploadModal isOpen={isOpen} onClose={onClose} handleOutput={handleOutput}/>
    </div>
  )
}

export default UploadAttempts
