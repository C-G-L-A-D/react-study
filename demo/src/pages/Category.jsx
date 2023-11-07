import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchMultidataAction } from '../store/actionCreators'

export class Category extends PureComponent {
  constructor(props) {
    super()
  }

  render() {
    const { banners, recommonds } = this.props

    return (
      <div>
        <h2>Category</h2>
        <div>
          <h3>轮播图信息：</h3>
          <ul>
            {banners.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
          <h3>推荐信息：</h3>
          <ul>
            {recommonds.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    banners: state.banners,
    recommonds: state.recommonds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMultidata() {
      dispatch(fetchMultidataAction)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
