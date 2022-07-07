import React from 'react';

const ReadOnlyRow = ({
  contact,
  deleteContactId,
  handleEditClick,
  handleDeleteClick,
  handleCancelClick,
}) => {
  console.log(deleteContactId);
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>{contact.ownedApartments}</td>
      <td>
        {!deleteContactId ? (
          <td>
            <button
              type='button'
              onClick={(event) => handleEditClick(event, contact)}
            >
              Edit
            </button>
            <button
              type='button'
              onClick={(event) => handleDeleteClick(event, contact)}
            >
              Delete
            </button>
          </td>
        ) : (
          <td>
            <button type='submit'>Delete</button>
            <button type='button' onClick={handleCancelClick}>
              Cancel{' '}
            </button>
          </td>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
