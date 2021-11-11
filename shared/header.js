
import React, { useEffect, useState } from "react";

const Header = (props) => {

  useEffect(() => {

  }, [])

  return (
    <div style={style.container}>
      This is the header
    </div>
  )
}

const style = {
  container: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    background: '#ffffff',
    padding: '8px 16px',
    boxShadow: '0px 8px 80px rgba(0, 0, 0, 0.06)',
    zIndex: '4'
  },
}

export default Header