import React, { useCallback, useEffect, useState } from 'react'
import Heading from './Heading';
import BossRow from './BossRow';
import GetJSON from './GetJSON';
import styles from './componentStyles.module.scss'
import Footer from './Footer';
import TotalHits from './TotalHits';
import ToggleNohits from './ToggleNohits';
import Reset from './Reset';
import SaveAttempt from './SaveAttempt';
import DownloadAttempts from './DownloadAttempts';

const initialState = {
    "vengefly_king": { count: 0, clickable: true, reset: false, index: 1 },
    "gruz_mother": { count: 0, clickable: true, reset: false, index: 2 },
    "false_knight": { count: 0, clickable: true, reset: false, index: 3 },
    "massive_moss_charger": { count: 0, clickable: true, reset: false, index: 4 },
    "hornet_protector": { count: 0, clickable: true, reset: false, index: 5 },
    "gorb": { count: 0, clickable: true, reset: false, index: 6 },
    "dung_defender": { count: 0, clickable: true, reset: false, index: 7 },
    "soul_warrior": { count: 0, clickable: true, reset: false, index: 8 },
    "brooding_mawlek": { count: 0, clickable: true, reset: false, index: 9 },
    "nailmasters_oro_&_mato": { count: 0, clickable: true, reset: false, index: 10 },
    "xero": { count: 0, clickable: true, reset: false, index: 11 },
    "crystal_guardian": { count: 0, clickable: true, reset: false, index: 12 },
    "soul_master": { count: 0, clickable: true, reset: false, index: 13 },
    "oblobbles": { count: 0, clickable: true, reset: false, index: 14 },
    "sisters_of_battle": { count: 0, clickable: true, reset: false, index: 15 },
    "marmu": { count: 0, clickable: true, reset: false, index: 16 },
    "flukemarm": { count: 0, clickable: true, reset: false, index: 17 },
    "broken_vessel": { count: 0, clickable: true, reset: false, index: 18 },
    "galien": { count: 0, clickable: true, reset: false, index: 19 },
    "paintmaster_sheo": { count: 0, clickable: true, reset: false, index: 20 },
    "hive_knight": { count: 0, clickable: true, reset: false, index: 21 },
    "elder_hu": { count: 0, clickable: true, reset: false, index: 22 },
    "the_collector": { count: 0, clickable: true, reset: false, index: 23 },
    "god_tamer": { count: 0, clickable: true, reset: false, index: 24 },
    "troupe_master_grimm": { count: 0, clickable: true, reset: false, index: 25 },
    "watcher_knights": { count: 0, clickable: true, reset: false, index: 26 },
    "uumuu": { count: 0, clickable: true, reset: false, index: 27 },
    "winged_nosk": { count: 0, clickable: true, reset: false, index: 28 },
    "great_nailsage_sly": { count: 0, clickable: true, reset: false, index: 29 },
    "hornet_sentinel": { count: 0, clickable: true, reset: false, index: 30 },
    "enraged_guardian": { count: 0, clickable: true, reset: false, index: 31 },
    "lost_kin": { count: 0, clickable: true, reset: false, index: 32 },
    "no_eyes": { count: 0, clickable: true, reset: false, index: 33 },
    "traitor_lord": { count: 0, clickable: true, reset: false, index: 34 },
    "white_defender": { count: 0, clickable: true, reset: false, index: 35 },
    "soul_tyrant": { count: 0, clickable: true, reset: false, index: 36 },
    "markoth": { count: 0, clickable: true, reset: false, index: 37 },
    "grey_prince_zote": { count: 0, clickable: true, reset: false, index: 38 },
    "falied_champion": { count: 0, clickable: true, reset: false, index: 39 },
    "nightmare_king_grimm": { count: 0, clickable: true, reset: false, index: 40 },
    "pure_vessel": { count: 0, clickable: true, reset: false, index: 41 },
    "absolute_radiance": { count: 0, clickable: true, reset: false, index: 42 }
}

function Container() {

    const [table, setTable] = useState(initialState)
    const [displayNohits, setDisplayNohits] = useState(true)
    const [reset, setReset] = useState(false)
    const [hitIndices, setHitIndices] = useState([0])

    const root = document.documentElement
    const changeZoom = useCallback(() => {
        const browserZoomLevel = Math.round(window.devicePixelRatio * 100) / 100
        root?.style.setProperty("--zoomConstant", browserZoomLevel)
    }, [root?.style])

    const initZoom = useCallback(() => {
        root?.style.setProperty("--zoomConstant", 1)
        window.addEventListener('resize', changeZoom)
    }, [root?.style, changeZoom])

    useEffect(() => {
        initZoom()
        return () => window.removeEventListener('resize', changeZoom)
    }, [initZoom, changeZoom])

    const initLSHitIndices = useCallback(() => !localStorage.getItem("hitIndices") &&
        localStorage.setItem("hitIndices", JSON.stringify(hitIndices)), [hitIndices])

    useEffect(() => {
        if (!localStorage.getItem("attempts"))
            localStorage.setItem("attempts", "[]")
        initLSHitIndices()
    }, [initLSHitIndices])

    const resumeStates = useCallback(() => {
        setTable(JSON.parse(localStorage.getItem("currentAttempt")))
        setHitIndices(JSON.parse(localStorage.getItem("hitIndices")))
    }, [])

    useEffect(resumeStates, [resumeStates])

    window.onbeforeunload = () => {
        localStorage.setItem("currentAttempt", JSON.stringify(table))
        localStorage.setItem("hitIndices", JSON.stringify(hitIndices))
    }

    const updateAttempts = newAttempt => localStorage.setItem("attempts",
        JSON.stringify([...JSON.parse(localStorage.getItem("attempts")), newAttempt]))

    const saveAttempt = () => {
        updateAttempts({
            date: Date.now(),
            table: table
        })
        resetTable()
    }

    const resetTable = () => {
        setTable(initialState)
        setDisplayNohits(true)
        setReset(false)
        setHitIndices([0])
    }

    const toggleNohits = () => {
        setDisplayNohits(prevDisplay => !prevDisplay)
    }

    const incrementCount = (key, clickable) => {
        if (!clickable) return
        if (!(hitIndices.includes(table[key].index)))
            setHitIndices(prevHitIndices => {
                return [...prevHitIndices, table[key].index].sort((a, b) => a - b)
            })
        setTable(prevTable => {
            return prevTable[key].count < 9999999 ?
                Object.assign({}, {
                    ...prevTable, [key]:
                        { ...prevTable[key], count: prevTable[key].count + 1 }
                }) :
                prevTable
        })
    }

    const decrementCount = (key, clickable) => {
        if (!clickable) return
        setTable(prevTable => {
            if (prevTable[key].count === 1) {
                setHitIndices(prevHitIndices => prevHitIndices.filter((value, index, array) =>
                    value !== table[key].index))
            }
            return prevTable[key].count > 0 ?
                Object.assign({}, {
                    ...prevTable, [key]:
                        { ...prevTable[key], count: prevTable[key].count - 1 }
                }) :
                prevTable
        })
    }

    const writeCount = (key, event, clickable) => {
        if (!clickable) return
        let newValue = event.target.value
        if (newValue.length > 7) newValue = newValue.substring(0, 7)
        newValue = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue)
        if (newValue > 0 && !(hitIndices.includes(table[key].index))) setHitIndices(prevHitIndices => {
            return [...prevHitIndices, table[key].index].sort((a, b) => a - b)
        })
        else setHitIndices(prevHitIndices => prevHitIndices.filter((value, index, array) =>
            value !== table[key].index))
        setTable(prevTable => Object.assign({}, {
            ...prevTable, [key]:
                { ...prevTable[key], count: newValue }
        }))
    }

    const toggleReset = key => {
        if (reset && !table[key].reset) return
        if (table[key].reset === true) {
            setTable(prevTable => Object.assign({}, {
                ...prevTable, [key]: { ...prevTable[key], clickable: true, reset: false }
            }))
            setReset(false)

            for (let name of Object.keys(table)) setTable(prevTable => Object.assign({}, {
                ...prevTable, [name]: { ...prevTable[name], clickable: true, reset: false }
            }))
            return
        }
        for (const name of Object.keys(table).reverse()) {
            if (name === key) break
            if (table[name].count !== 0) return
        }
        for (const name of Object.keys(table).reverse()) {
            if (name === key) {
                setTable(prevTable => Object.assign({}, {
                    ...prevTable, [name]: { ...prevTable[name], clickable: true, reset: true }
                }))
                setReset(true)
                return
            }
            else {
                setTable(prevTable => Object.assign({}, {
                    ...prevTable, [name]: { ...prevTable[name], clickable: false, reset: false }
                }))
            }
        }
    }

    return (
        <div>
            <div className={styles.containerDiv}>
                <Heading />
                <div className={styles.buttonsContainer}>
                    <DownloadAttempts/>
                </div>
                <div className={styles.buttonsContainer}>
                    <SaveAttempt saveAttempt={saveAttempt} />
                    <Reset resetTable={resetTable} />
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
                                data.count === 0 && !displayNohits && !data.reset ? null :
                                    <BossRow
                                        name={name}
                                        count={data.count}
                                        incrementCount={incrementCount}
                                        decrementCount={decrementCount}
                                        writeCount={writeCount}
                                        toggleReset={toggleReset}
                                        clickable={data.clickable}
                                        reset={data.reset}
                                        resettable={data.index >= hitIndices[hitIndices.length - 1] && !reset}
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
