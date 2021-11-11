
import React, { useEffect, useState } from "react";

const SearchItem = (props) => {
    return (
        <div className="d-flex" style={{ background: '#232323' }}>
            <img src={props.imageUrl} style={{ height: 72 }} alt={"logo"} />
            <div style={styles.titleWrapper} className="flex-grow-1 px-4 py-2 text-start d-flex flex-column justify-content-center">
                <div className="fw-bold" style={{textDecoration:'none'}}>{props.title}</div>
                <div style={{textDecoration:'none'}}>{props.year} • {props.type}</div>
            </div>
        </div>
    )
}

const styles = {
    titleWrapper: {
        color: 'white',
        width: '100%',
    },
}

export default SearchItem;