import React, { useCallback, useEffect, useState } from 'react'
import Heading from './Heading';
import BossRow from './BossRow';
import GetJSON from './GetJSON';
import styles from './componentStyles.module.scss'
import Footer from './Footer';
import TotalHits from './TotalHits';
import ToggleNohits from './ToggleNohits';
import Reset from './Reset';

const initialState = {
    "vengefly_king": { count: 0, clickable: true, reset: false },
    "gruz_mother": { count: 0, clickable: true, reset: false },
    "false_knight": { count: 0, clickable: true, reset: false },
    "massive_moss_charger": { count: 0, clickable: true, reset: false },
    "hornet_protector": { count: 0, clickable: true, reset: false },
    "gorb": { count: 0, clickable: true, reset: false },
    "dung_defender": { count: 0, clickable: true, reset: false },
    "soul_warrior": { count: 0, clickable: true, reset: false },
    "brooding_mawlek": { count: 0, clickable: true, reset: false },
    "nailmasters_oro_&_mato": { count: 0, clickable: true, reset: false },
    "xero": { count: 0, clickable: true, reset: false },
    "crystal_guardian": { count: 0, clickable: true, reset: false },
    "soul_master": { count: 0, clickable: true, reset: false },
    "oblobbles": { count: 0, clickable: true, reset: false },
    "sisters_of_battle": { count: 0, clickable: true, reset: false },
    "marmu": { count: 0, clickable: true, reset: false },
    "flukemarm": { count: 0, clickable: true, reset: false },
    "broken_vessel": { count: 0, clickable: true, reset: false },
    "galien": { count: 0, clickable: true, reset: false },
    "paintmaster_sheo": { count: 0, clickable: true, reset: false },
    "hive_knight": { count: 0, clickable: true, reset: false },
    "elder_hu": { count: 0, clickable: true, reset: false },
    "the_collector": { count: 0, clickable: true, reset: false },
    "god_tamer": { count: 0, clickable: true, reset: false },
    "troupe_master_grimm": { count: 0, clickable: true, reset: false },
    "watcher_knights": { count: 0, clickable: true, reset: false },
    "uumuu": { count: 0, clickable: true, reset: false },
    "winged_nosk": { count: 0, clickable: true, reset: false },
    "great_nailsage_sly": { count: 0, clickable: true, reset: false },
    "hornet_sentinel": { count: 0, clickable: true, reset: false },
    "enraged_guardian": { count: 0, clickable: true, reset: false },
    "lost_kin": { count: 0, clickable: true, reset: false },
    "no_eyes": { count: 0, clickable: true, reset: false },
    "traitor_lord": { count: 0, clickable: true, reset: false },
    "white_defender": { count: 0, clickable: true, reset: false },
    "soul_tyrant": { count: 0, clickable: true, reset: false },
    "markoth": { count: 0, clickable: true, reset: false },
    "grey_prince_zote": { count: 0, clickable: true, reset: false },
    "falied_champion": { count: 0, clickable: true, reset: false },
    "nightmare_king_grimm": { count: 0, clickable: true, reset: false },
    "pure_vessel": { count: 0, clickable: true, reset: false },
    "absolute_radiance": { count: 0, clickable: true, reset: false }
}

function Container() {

    const [table, setTable] = useState(initialState)
    const [displayNohits, setDisplayNohits] = useState(true)
    const [reset, setReset] = useState(false)

    const root = document.documentElement
    const changeZoom = useCallback(() => {
        const browserZoomLevel = Math.round(window.devicePixelRatio * 100) / 100
        root?.style.setProperty("--zoomConstant", browserZoomLevel)
    }, [root?.style])

    useEffect(() => {
        root?.style.setProperty("--zoomConstant", 1)
        root?.style.setProperty("--colorVar", "white")
        root?.style.setProperty("--cursorVar", "pointer")
        window.addEventListener('resize', changeZoom)

        return () => window.removeEventListener('resize', changeZoom)
    }, [root?.style, changeZoom])

    const resetTable = () => {
        root?.style.setProperty("--colorVar", "white")
        root?.style.setProperty("--cursorVar", "pointer")
        setTable(initialState)
        setDisplayNohits(true)
        setReset(false)
    }

    const toggleNohits = () => {
        setDisplayNohits(prevDisplay => !prevDisplay)
    }

    const incrementCount = (key, clickable) => {
        if (!clickable) return
        setTable(prevTable => {
            return prevTable[key]['count'] < 9999999 ?
                Object.assign({}, {
                    ...prevTable, [key]:
                        { ...prevTable[key], ['count']: prevTable[key]['count'] + 1 }
                }) :
                prevTable
        })
    }

    const decrementCount = (key, clickable) => {
        if (!clickable) return
        setTable(prevTable => {
            return prevTable[key]['count'] > 0 ?
                Object.assign({}, {
                    ...prevTable, [key]:
                        { ...prevTable[key], ['count']: prevTable[key]['count'] - 1 }
                }) :
                prevTable
        })
    }

    const writeCount = (key, event, clickable) => {
        if (!clickable) return
        let newValue = event.target.value
        if (newValue.length > 7) newValue = newValue.substring(0, 7)
        newValue = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue)
        setTable(prevTable => Object.assign({}, {
            ...prevTable, [key]:
                { ...prevTable[key], ['count']: newValue }
        }))
    }

    const toggleReset = key => {
        if (reset && !table[key]['reset']) return
        if (table[key]['reset'] == true) {
            setTable(prevTable => Object.assign({}, {
                ...prevTable, [key]: { ...prevTable[key], ['clickable']: true, ['reset']: false }
            }))
            setReset(false)
            root?.style.setProperty("--colorVar", "white")
            root?.style.setProperty("--cursorVar", "pointer")

            for (let name of Object.keys(table)) setTable(prevTable => Object.assign({}, {
                ...prevTable, [name]: { ...prevTable[name], ['clickable']: true, ['reset']: false }
            }))
            return
        }
        for (const name of Object.keys(table).reverse()) {
            if (name == key) break
            if (table[name]['count'] != 0) return
        }
        for (const name of Object.keys(table)) {
            if (name == key) {
                setTable(prevTable => Object.assign({}, {
                    ...prevTable, [name]: { ...prevTable[name], ['clickable']: true, ['reset']: true }
                }))
                setReset(true)
            }
            else {
                setTable(prevTable => Object.assign({}, {
                    ...prevTable, [name]: { ...prevTable[name], ['clickable']: false, ['reset']: false }
                }))
                root?.style.setProperty("--colorVar", "silver")
                root?.style.setProperty("--cursorVar", "not-allowed")
            }
        }
    }

    return (
        <div>
            <div className={styles.containerDiv}>
                <Heading />
                <div className={styles.buttonsContainer}>
                    <Reset resetTable={resetTable}/>
                </div>
                <div className={styles.buttonsContainer}>
                    <GetJSON table={table} includeNohits={displayNohits} />
                    <ToggleNohits displayNohits={displayNohits} toggleNohits={toggleNohits} />
                </div>
                <div className={styles.bossesContainer}>
                    <TotalHits hits={
                        Object.values(table).reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)
                    }
                    />
                    {
                        Object.entries(table).map(([name, data]) => {
                            return (
                                data.count == 0 && !displayNohits && !data.reset ? null :
                                    <BossRow
                                        name={name}
                                        count={data.count}
                                        incrementCount={incrementCount}
                                        decrementCount={decrementCount}
                                        writeCount={writeCount}
                                        toggleReset={toggleReset}
                                        clickable={data.clickable}
                                        reset={data.reset}
                                        key={name}
                                    />
                            )
                        }
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default React.memo(Container)
