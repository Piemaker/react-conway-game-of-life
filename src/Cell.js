import React from 'react'

function cell({cellStatus}) {
    if(cellStatus){
        return <div className="cell alive"></div>;
    }
    else{
    return (
        <div className = "cell">
            
        </div>
    )}
}

export default cell
