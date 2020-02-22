import { Component } from '@tarojs/taro'
import ExamComponent from '../../components/exam/exam'

class Exam extends Component{
    config = {
        navigationBarTitleText: '考试',
    }
    render(){
        return (
            <ExamComponent icon-back='iconfont iconback'/>
        )
    }
}

export default Exam