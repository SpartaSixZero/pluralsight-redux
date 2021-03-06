import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  courseRow(course, index) {
    return (
      <div key={index}>{course.title}</div>
    );
  }

  deleteCourse(event){
    event.preventDefault();
    
    //debugger;
    
    let courseId = event.target.target;
    
    this.props.actions.deleteCourse(courseId)
      .then(() => {
        toastr.success('Course deleted');
      })
      .catch(error => {
        toastr.error(error);
      });
      
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    //debugger;
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input 
          type="submit" 
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses} onDelete={this.deleteCourse} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Essentially we're getting courses from state and we're adding that
// to this.props so we can use that in our JSX code
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseActions.createCourse(course))
    // Essentially bindActionCreators eliminate the need to have the above code.
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);