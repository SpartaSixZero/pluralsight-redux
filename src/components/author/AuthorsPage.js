import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  authorRow(author, index) {
    return (
      <div key={index}>{author.title}</div>
    );
  }

  canAuthorBeDeleted(authorId) {
    // Check in here if the author has any courses. If so, then return false. Else, return true.
    //debugger;
    let courses = this.props.courses;
    let courseFound = courses.find((element) => {
      return element.authorId === authorId;
    });

    if(courseFound === undefined) {
      return true;
    } else {
      return false;
    }
  }

  deleteAuthor(event) {
    event.preventDefault();
    let authorId = event.target.target;

    if (!this.canAuthorBeDeleted(authorId)) {
      toastr.warning('Cannot delete an author who has courses');
      return;
    }
    
    this.props.actions.deleteAuthor(authorId)
      .then(() => {
        toastr.success('Author deleted');
      })
      .catch(error => {
        toastr.error(error);
      });
    
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  render() {
    //debugger;
    const {authors} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input 
          type="submit" 
          value="Add Author"
          className="btn btn-primary"
          onClick={this.redirectToAddAuthorPage}/>
        <AuthorList 
          authors={authors}
          onDelete={this.deleteAuthor}
        />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

// Essentially we're getting authors from state and we're adding that
// to this.props so we can use that in our JSX code
function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createAuthor: author => dispatch(authorActions.createAuthor(author))
    // Essentially bindActionCreators eliminate the need to have the above code.
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);