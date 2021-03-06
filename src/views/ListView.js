import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import {fetchIDsByType, fetchItemsByIds} from '../api'
import { initListStore, getActiveItemsByPage } from '../store/listStore'
import { ListCard } from '../components/ListCard'

export default class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      activeItems: [],
      page: 1,
      maxPage: 0
    }
  }

  componentWillMount () {
    initListStore(this.state.type)
      .then(([activeItems, maxPage]) => {
        this.setState({
          activeItems,
          maxPage
        })
        console.log(this.state.maxPage)
      })
  }

  updatePage (pageNum) {
    if (!this.state.activeItems || pageNum < 1 || pageNum > this.state.maxPage) {
      return
    }
    this.setState({
      activeItems: getActiveItemsByPage(pageNum),
      page: pageNum
    })
  }
  render () {
    return (
      <div className="list-view">
        This is list view.
        my props are: {this.props.type}
        <div className="list-paginator">
          <div className="paginator-container"><p onClick={() => this.updatePage(this.state.page - 1)}>&lsaquo;prev</p><div>{this.state.page}|{this.state.maxPage} </div>
          <p onClick={() => this.updatePage(this.state.page + 1)}>next&rsaquo;</p></div>
        </div>
        <div className="item">
          {this.state.activeItems.map((item, i) => <ListCard item={item} key={i}/>)}
        </div>
      </div>
    )
  }
}


