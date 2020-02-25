export const deal_today_course = (t, course) => {
  let course_data = []
  if (course) {
    try {
      for (let i = 0; i < course.res_d[t].length; i++) {
        for (let j = 0; j < course.res_d[t][i].length; j++) {
          if (course.res_d[t][i][j].week.indexOf(course.week) !== -1) {
            course_data.push(course.res_d[t][i][j])
          }
        }
      }
    } catch (e) {}
  }
  return course_data
}

export const update_today_course = (t, course, week) => {
  let course_data = []
  if (course) {
    try {
      for (let i = 0; i < course[t].length; i++) {
        for (let j = 0; j < course[t][i].length; j++) {
          if (course[t][i][j].week.indexOf(week) !== -1) {
            course_data.push(course[t][i][j])
          }
        }
      }
    } catch (e) {}
  }
  return course_data
}
