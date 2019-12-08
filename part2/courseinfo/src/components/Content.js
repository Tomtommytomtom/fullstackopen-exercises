import React from 'react'
import Part from './Part'
import Total from './Total'


const Content = props => {
    return(
        <>
            {partsIntoContent(props.parts)}
            <Total parts={props.parts}/>
        </>
    )
}


const partsIntoContent = parts => parts.map((part) => <Part key={part.id} parts={part} /> )



export default Content