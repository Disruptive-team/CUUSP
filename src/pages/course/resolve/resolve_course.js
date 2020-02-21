
const resolve_course = (res) => {
  let res_data = [[], [], [], [], [], [], []]
  let course_num = []
  let course_color = ['#FAC972', '#8DD8A1', '#FCAC8A', '#E4C690']
  res = res.body
  for(let i=0;i<res.result.length;i++) {
    for(let j=0;j<res.result[i].location.length;j++) {
      if (course_num.indexOf(res.result[i].class_name) === -1) {
        course_num.push(res.result[i].class_name)
      }
      let wrapper_data_list = []
      let wrapper_data_obj = {}
      let week_day = 0
      let start_section = 1
      let section_length = 2
      let class_time = res.result[i].class_time[j]
      class_time = class_time.replace('@', '-')
      class_time = class_time.split('-')
      week_day = parseInt(class_time[0])-1
      start_section = parseInt(class_time[1])
      section_length = parseInt(class_time[2])
      wrapper_data_obj.place = res.result[i].location[j]
      wrapper_data_obj.course = res.result[i].class_name
      wrapper_data_obj.teacher = res.result[i].teacher_name
      wrapper_data_obj.start_section = start_section
      wrapper_data_obj.section_length = section_length
      let week = []
      for(let k=parseInt(res.result[i].qsz);k<=parseInt(res.result[i].zzz);k++) {
        week.push(k)
      }
      wrapper_data_obj.week = week
      wrapper_data_list.push(wrapper_data_obj)
      res_data[week_day].push(wrapper_data_list)
    }
  }
  let course_and_color = []
  for(let i=0;i<course_num.length;i++) {
    course_and_color.push([course_num[i], course_color[i%course_color.length]])
  }
  for (let i=0;i<res_data.length;i++) {
    for (let j=0;j<res_data[i].length;j++) {
      for (let h=0;h<res_data[i][j].length;h++) {
        for (let k=0;k<course_and_color.length;k++) {
          if (course_and_color[k][0] === res_data[i][j][h].course) {
            res_data[i][j][h]['color'] = course_and_color[k][1]
          }
        }
      }
    }
  }
  return res_data
}



export default resolve_course
