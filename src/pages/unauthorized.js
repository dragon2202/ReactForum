import React from 'react'
import { useHistory } from "react-router-dom"

export default function Unauthorized() {
    let history = useHistory();
    return (
        <main className="unauthorized">
            <h3 className="header"><b>Unauthorized Access</b></h3>
            <br />
            <p className="text"><b>The page you tried to access is inaccessible due to account privileges</b></p>
            <br />
            <div className="anchor">
                <a  onClick={() => {history.goBack()}}>Go back a page</a>
            </div>
        </main>
    )
}