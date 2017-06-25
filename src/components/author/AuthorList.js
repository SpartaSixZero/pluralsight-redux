import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, onDelete}) => {
  //debugger;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>ID</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {authors.map(author => 
          <AuthorListRow key={author.id} author={author} onDelete={onDelete}/>
        )}
        </tbody>
      </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorList;