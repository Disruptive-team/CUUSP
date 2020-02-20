
const resolve_course = (res) => {
  let res_data = [[], [], [], [], [], [], []]
  res = res.body
  for(let i=0;i<res.result.length;i++) {
    for(let j=0;j<res.result[i].location.length;j++) {
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
      wrapper_data_obj.place = res.result[i].location[i]
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
  return res_data
}



export default resolve_course
