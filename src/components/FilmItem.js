
import React, { useEffect, useState } from "react";

const heightCard = () => {
    // Extra large Window
    if (window.innerWidth >= 1200) {
        return 512;
        
    // large Window
    } else if (window.innerWidth >= 992) {
        return 400;
        
    // Medium Window
    } else if (window.innerWidth >= 768) {
        return 300;
        
    // Small Window
    } else if (window.innerWidth >= 576) {
        return 400;
        
    // Extra Small Window
    } else if (window.innerWidth < 576) {
        return 300;
    }
}

const FilmItem = (props) => {
    return (
        <div className="card" style={styles.card}>
            <img src={props.imageUrl} style={styles.thumbnail} className="card-img-top" alt="..." />
            <div style={styles.titleWrapper}>
                <div className="p-2 text-center">
                    <div className="fw-bold">{props.title}</div>
                    <div>{props.year} • {props.type}</div>
                </div>
            </div>
            <div style={styles.shadow}></div>
        </div>
    )
}

const styles = {
    card: {
        width: "100%",
        height: heightCard(),
        position: 'relative',
        marginBottom: 20
    },
    titleWrapper: {
        position: 'absolute',
        bottom: 0,
        color: 'white',
        width: '100%',
        zIndex: 2
    },
    shadow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        boxShadow: '#1a1a1a 0px -100px 100px 10px inset',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }

}

export default FilmItem;