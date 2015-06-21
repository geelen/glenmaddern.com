import React from 'react'

import styles from './pages.css!'
import portfolio from  './portfolio'
import PreviewList from '../components/preview-list.jsx!'

export default class ListPage extends React.Component {
  render() {
    let items = portfolio[this.props.params.page]
    return <div className={styles.main}>
      {items ? <PreviewList name={this.props.params.page} items={items}/> : <h1 className={styles.error}>NOT FOUND</h1> }
    </div>
  }
}
