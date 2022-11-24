import React from 'react'
import '../stylesheets/Filter.css'

//React component of the filter
const Filter = (props) => {

    function onFilterValueChanged(e)
    {
        let value = Number(e.target.value)
        props.filterValueSelected(value)
    }
  
  
    return (
    <div className='filterArea'>
        <select name ="filter" onChange={onFilterValueChanged}>
            <option value="3">ALL</option>
            <option value="0">IN PROGRESS</option>
            <option value="1">DONE</option>
            <option value="2">COMPLETE</option>
        </select>
    </div>
  )
}

export default Filter