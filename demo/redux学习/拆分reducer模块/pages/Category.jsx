import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchMultidataAction } from '../store/category/actionCreators'

export class Category extends PureComponent {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.fetchMultidata()
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
    banners: state.category.banners,
    recommonds: state.category.recommonds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMultidata() {
      dispatch(fetchMultidataAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
