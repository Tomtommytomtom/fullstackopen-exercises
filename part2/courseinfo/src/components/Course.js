import React from 'react'
import Content from './Content'
import Header from './Header'

const Course= (props) => {
    console.log(props);
      return(
      <>
        <Header title={props.title} />
        <Content title={props.title} parts={props.parts} />
      </>)
    }

export default Course