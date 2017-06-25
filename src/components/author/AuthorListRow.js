import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, onDelete}) => {
  return (
    <tr>
      <td><a href="" target={author.id} author={author} onClick={onDelete}>Delete</a></td>
      <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
      <td>{author.firstName + " " + author.lastName}</td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;