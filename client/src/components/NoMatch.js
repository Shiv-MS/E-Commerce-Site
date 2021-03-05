import React from 'react'
import "./Nomatch.css";
import {useHistory} from 'react-router-dom';

export default function NoMatch() {
    const history = useHistory()

    const goHome =()=>{
history.push('/')
    }
    return (
        <div className='notFound'>
            <div className="title">
        <h1>Oh no, you've found our junior developer's Homepage! 404</h1>
        </div>
        <div className="button"><button onClick={goHome}>Go to the real Homepage</button></div>
        </div>
    )
}
