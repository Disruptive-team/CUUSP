import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './course_item.css'

class CourseComponent extends Component {
  defaultProps = {
    place: '',
    course: '',
    teacher: '',
    week: [],
    section_length: 2
  }

  constructor(props) {
    super(props)
    if(Object.keys(this.props).toString()) {
      this.setState(this.dealCourseData(this.props))
    }
  }
  componentWillMount() {
  }

  componentDidMount() {
    
  }

  defaultHeight = 60

  dealCourseData (data) {
    // 处理周次和课时时长
    console.log('dealCourseData1')
    console.log(data)
    console.log('dealCourseData2')
    for(let i=0;i<data.course_data.length;i++) {
      let section_length = 2
      section_length = data.course_data[i].section_length.split('-')
      data.course_data[i]['specific_week'] = parseInt(section_length[0])
      section_length = parseInt(section_length[1]) - parseInt(section_length[0]) + 1
      data.course_data[i].section_length = section_length
      let week = []
      let start_end = data.course_data[i].week.split('-')
      for(let j=parseInt(start_end[0]);j<=parseInt(start_end[1]);j++) {
        week.push(j)
      }
      data.course_data[i].week = week
    }
    return data
  }

  render() {
    if(!this.state.course_data)
      return
    // console.log(this.state.course_data)
    return (<View className='course_item' style={'background-color: '+this.state.bg_color+';height: '+this.defaultHeight*this.state.course_data[0].section_length+'px'}>
       <View>@{this.state.course_data[0].place}</View>
       <View>{this.state.course_data[0].course}</View>
      {this.state.course_data.length>1&&<View className='repeat'></View>}
     </View>)
  }
}

export default CourseComponent
