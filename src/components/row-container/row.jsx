import React from "react"

const Row = ({ leftColumn, rightColumn }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {leftColumn}
            </div>
            <div className="col-md-6">
                {rightColumn}
            </div>
        </div>
    )
}

export default Row;