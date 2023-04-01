import React, { useState } from 'react'
import styles from './componentStyles.module.scss'


function UploadModal({ isOpen, onClose, handleOutput }) {

    const [options, setOptions] = useState({
        overwrite: false,
        update: false,
        current: false
    })

    const [selectedFileName, setSelectedFileName] = useState('No file selected')
    const [selectedFile, setSelectedFile] = useState('')

    const selected = Object.values(options).includes(true)

    // const handleOutput = (json, selectedOption) => {
    //     console.log(json, selectedOption)
    //     if (selectedOption == 'current') {}
    // }

    const toggleSelection = (key) => {
        if (selected && !options[key]) return
        setOptions({
            ...options,
            [key]: !options[key]
        })
    }

    const clickSubmit = () => {
        if (!selected) {
            alert('No upload option selected')
            return
        }
        document.querySelector('.submitButton').click()
    }

    const onSubmit = event => {
        if (selectedFile.type === 'application/json') {
            const reader = new FileReader()
            reader.readAsText(selectedFile)
            reader.onload = () =>
                handleOutput(JSON.parse(reader.result), Object.keys(options).filter(key => options[key])[0])

            event.preventDefault()
            return
        }
        alert('File extension must be .json')
        event.preventDefault()
    }

    const overwriteStyle = options.overwrite ? styles.uploadSelected : selected ?
        styles.iUploadOption : styles.uploadOption
    const updateStyle = options.update ? styles.uploadSelected : selected ?
        styles.iUploadOption : styles.uploadOption
    const currentStyle = options.current ? styles.uploadSelected : selected ?
        styles.iUploadOption : styles.uploadOption

    if (!isOpen) return null
    return (
        <div>
            <div className={styles.modalOverlay} onClick={onClose} />
            <div className={styles.uploadModal}>
                <div className={styles.closeModal} onClick={onClose} />
                <div className={styles.optionsContainer}>
                    <p className={styles.modalText}>Upload Options</p>
                    <p className={overwriteStyle} onClick={() => toggleSelection('overwrite')}>
                        Overwrite History
                    </p>
                    <p className={updateStyle} onClick={() => toggleSelection('update')}>
                        Update History
                    </p>
                    <p className={currentStyle} onClick={() => toggleSelection('current')}>
                        Current Attempt
                    </p>
                    <form id='input-form' onSubmit={event => onSubmit(event)}>
                        <input
                            className='inputField'
                            type='file'
                            accept='.json'
                            hidden
                            onChange={({ target: { files } }) => {
                                if (files[0]) {
                                    setSelectedFileName(files[0].name)
                                    setSelectedFile(files[0])
                                }
                            }}
                        />
                        <div
                            className={styles.selectFile}
                            onClick={() => document.querySelector('.inputField').click()}>
                            Select File
                        </div>
                        <button className='submitButton' type='submit' hidden />
                    </form>
                    <p className={styles.selectedFile}>
                        {selectedFileName}
                    </p>
                    <div
                        className={styles.uploadFile}
                        onClick={() => clickSubmit()}
                    >
                        Upload
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UploadModal