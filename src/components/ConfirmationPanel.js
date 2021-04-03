import React from 'react'

const ConfirmationPanel = ( { deleteSure, cancelDelete, message, subtitle }) => {
    console.log(deleteSure)
    return (
        <div style={{backgroundColor: 'pink', width:300, left:'50%', zIndex:3, position: 'absolute', marginLeft: '-150px', padding: 10, borderStyle:'solid', borderRadius:'20px', borderWidth:'2px', borderColor:'red'}}>
                    <div style={{paddingBottom:10, fontSize:19}}>{message}<br /><span style={{fontSize:10}}>{subtitle}</span></div>
                    <button onClick={cancelDelete}>Cancel</button>
                    <button className='delete-button' onClick={deleteSure}>Sure</button></div>
    )
}

export default ConfirmationPanel
