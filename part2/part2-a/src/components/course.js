import Header from './header.js'
import Content from './content.js'
import Total from './total.js'

const Course = (props) => {
    return (
      <div>
        {props.course.map(obj => (
          <div key={obj.id}>
            <Header course={obj.name} />
            <Content parts={obj.parts} />
            <Total parts={obj.parts} />
          </div>
        ))}
      </div>
    )
  }

  export default Course;