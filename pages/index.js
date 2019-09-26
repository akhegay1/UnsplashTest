import React from 'react'
//import { connect } from 'react-redux'
//import { startClock, serverRenderClock } from '../store'
import Examples from '../components/examples'
import Layout from '../components/Layout';
import About from './about';

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    //reduxStore.dispatch({type: "LOADIMGS"})
    

    return {}
  }


  render () {
    
    return <Layout>
              <Examples />
          </Layout>
  }
}

//onst mapDispatchToProps = { startClock }
export default Index
