
import React, { useEffect, useState } from "react";

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
        height: 324,
        position: 'relative',
        marginBottom: 20
    },
    titleWrapper: {
        position: 'absolute',
        bottom: 0,
        color: 'white',
        width: '100%'
    },
    shadow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        boxShadow: '#1a1a1a 0px -100px 100px 10px inset',
        top: 0,
        left: 0,
        pointerEvents: 'none'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }

}

export default FilmItem;