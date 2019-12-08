import React from 'react'

const sumOfArray = array => array.reduce((prev, curr) => {
    return curr += prev
  })

  const Total = (props) => {
      return(
      <>
          <p>
              Number of exercises {sumOfArray(props.parts.map(part => part.exercises))}
          </p>
      </>)
  }
  
export default Total