import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './course_item.css'

class CourseComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    color: '',
    c_course_data: [],
    height: 60
  }

  componentDidMount() {
    // 获取组件数据
    let data = this.props.course_data
    // 每节课默认时长为2
    let section_length = 2;
    // 用于存放周次列表
    let week = []
    // 处理周次和课时时长
    for (let i = 0; i < data.length; i++) {
      section_length = data[i].section_length.split('-')
      let start_end = data[i].week.split('-')
      section_length = parseInt(section_length[1]) - parseInt(section_length[0]) + 1
      data[i].section_length = section_length
      for (let j = parseInt(start_end[0]); j <= parseInt(start_end[1]); j++) {
        week.push(j);
      }
      data[i].week = week
    }
    this.setState({
      color: this.props.bg_color,
      c_course_data: data
    })
  }

  render() {
    return (<View className='course_item' style={'background-color: ' + this.state.color + ';height: ' + this.state.height * this.state.c_course_data[1].section_length + 'px'}>
      <View>@{this.state.c_course_data[0].place}</View>
      <View>{this.state.c_course_data[0].course}</View>
    </View>)
  }
}

export default CourseComponent
