import React, { PureComponent } from 'react'
import { changeBannersAction, changeRecommondsAction } from '../store/actionCreators'
import { connect } from 'react-redux'
import axios from 'axios'
class Home extends PureComponent {
  constructor(props) {
    super()
  }

  componentDidMount() {
    const { changeBanners, changeRecommonds } = this.props
    axios
      .get('http://123.207.32.32:8000/home/multidata')
      .then(res => {
        const banners = res.data.data.banner.list || []
        const recommend = res.data.data.recommend.list || []
        changeBanners(banners)
        changeRecommonds(recommend)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { banners, recommonds } = this.props
    return (
      <div>
        <h2>Home</h2>
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
    changeBanners(list) {
      dispatch(changeBannersAction(list))
    },
    changeRecommonds(list) {
      dispatch(changeRecommondsAction(list))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
