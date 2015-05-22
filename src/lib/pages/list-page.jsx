import React from 'react'

import styles from './pages.metacss!'
import projects from '../projects/index.jsx!'
import PreviewList from '../components/preview-list.jsx!'

export default class ListPage extends React.Component {
  render() {
    return <div className={styles.main}>
      <PreviewList name={this.props.params.page} items={projects}/>
    </div>
  }
}
