import React from 'react'
import { useHistory } from "react-router-dom"

export default function Error() {
    let history = useHistory();
    return (
        <main className="error">
            <h3 className="header"><b>Error Page</b></h3>
            <br />
            <p className="text"><b>Something Went Wrong</b></p>
            <br />
            <div className="anchor">
                <a  onClick={() => {history.goBack()}}>Go back a page</a>
            </div>
        </main>
    )
}