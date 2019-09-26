import React, { Component } from "react";
//import { connect } from 'react-redux'
import Photos from './photos'

class Examples extends Component {
  render() {
  return (
    <div>
      <Photos />
    </div>
  )
  }
}



/*
const mapStateToProps = state => {
  return { count: state.count }
}

export default connect(mapStateToProps)(Examples)
*/
export default Examples
