import React from 'react'

const Part = (props) => {
    return(
        <p>{props.parts.name} {props.parts.exercises}</p>
    )
}

export default Part