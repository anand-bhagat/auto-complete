import React, { useEffect, useRef, useState } from 'react'
import styles from './AutoComplete.module.css';

const AutoComplete = ({data, setFilteredData, setSearchValue}) => {
    const [value, setValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const triggerRef = useRef(null);
    const popupRef = useRef(null);

    const localPastSearches = localStorage.getItem('pastSearches');
    const [pastSearches, setPastSearches] = useState(localPastSearches ? JSON.parse(localPastSearches) : []);

    const handleOpenPopup = (e) => {
        setShowPopup(true);
    }

    const handleSearchValueChange = (e) => {
        setValue(e.target.value);
    }

    const handleClearBtnClick = (e) => {
        setValue("");
        setSearchValue("");
        setFilteredData(data);
    }

    const handleSearchBtnClick = () => {
        filterData(value);
        if(value){
            setPastSearches(prev => [...prev, value].slice(-5));
        }
        setValue("");
        setShowPopup(false);
    }

    const filterData = (value) => {
        setSearchValue(value);
        setFilteredData(data.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
    } 

    useEffect(() => {
        function handleClickOutside(event) {
            if (showPopup && !triggerRef.current.contains(event.target) && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSearchBtnClick();
        }
    }

    const handlePastSearchClick = (e, search) => {
        e.preventDefault();
        e.stopPropagation();
        filterData(search); 
        setShowPopup(false);
    }

    const handleMatchesClick = (e, match) => {
        e.preventDefault();
        e.stopPropagation();
        setPastSearches(prev => [...prev, match].slice(-5));
        filterData(match); 
        setShowPopup(false);
        setValue("");
    }

    useEffect(() => {
        localStorage.setItem('pastSearches',JSON.stringify(pastSearches));
    },[pastSearches]);

    useEffect(() => {
        if(!showPopup && value.length > 0){
            setShowPopup(true);
        }
    },[value, showPopup]);

    return (
        <div>
            <div className={styles.inputRow}>
                <div className={styles.popContainer} ref={triggerRef}>
                    <input 
                        className={styles.searchInput}
                        value={value}
                        onChange={handleSearchValueChange}
                        placeholder='Search...'
                        onClick={handleOpenPopup}
                        onKeyDown={handleKeyDown}
                    />
                    {
                        showPopup && 
                        <div className={styles.popup} ref={popupRef}>
                            <div className={styles.popContent}>
                                {
                                    value.length === 0 && 
                                    <>
                                        <div className={styles.popTitle}>Recent Searches:</div>
                                        <ul className={styles.popList}>
                                            {pastSearches.map(search => (
                                                <li className={styles.popItem} key={search} onClick={(e) => {handlePastSearchClick(e, search)}}>
                                                    {search}
                                                </li>
                                            ))}
                                        </ul>
                                        {pastSearches.length === 0 && <p style={{ margin:0  }}>No Recent Searches...</p>}
                                    </>
                                }
                                {
                                    value.length > 0 && 
                                    <>
                                        <div className={styles.popTitle}>Top Match:</div>
                                        <ul className={styles.popList}>
                                            {data.filter(item => item.name.toLowerCase().includes(value.toLowerCase())).slice(0,5).map(match => (
                                                <li className={styles.popItem} key={match.id} onClick={(e) => {handleMatchesClick(e, match.name)}}>
                                                    {match.name}
                                                </li>
                                            ))}
                                        </ul>
                                        {data.filter(item => item.name.toLowerCase().includes(value.toLowerCase())).length === 0 && <p style={{ margin:0  }}>No Match Found</p>}
                                    </>
                                }
                            </div>
                        </div>
                    }
                </div>
                <button className={`${styles.button} ${styles.searchBtn}`} onClick={handleSearchBtnClick}>
                    Search
                </button>
                <button className={`${styles.button} ${styles.clearBtn}`} onClick={handleClearBtnClick}>
                    Clear
                </button>
            </div>
        </div>
    )
}

export default AutoComplete