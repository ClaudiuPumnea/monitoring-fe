import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import ReadOnlyRow from './../components/ReadOnlyRow';
import EditableRow from './../components/EditableRow';

import './Reports.css';
const Reports = () => {
  const data = [
    {
      id: 1,
      fullName: 'Claudiu',
      address: 'Pumnea',
      phoneNumber: '0725414434',
      email: 'pumneaclaudiu@gmail.com',
      ownedApartments: '30, 50',
    },
    {
      id: 2,
      fullName: 'Gabriel',
      address: 'Ciurea',
      phoneNumber: '0726135913',
      email: 'ciurea.marius@gmail.com',
      ownedApartments: '25',
    },
    {
      id: 3,
      fullName: 'Andrei ',
      address: 'Vlad',
      phoneNumber: '0725314549',
      email: 'andrei.vlad@yahoo.com',
      ownedApartments: '4',
    },
  ];
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    ownedApartments: '',
  });

  const [editContactId, setEditContactId] = useState(null);
  const [deleteContactId, setDeleteContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    console.log(fieldName);
    console.log(fieldValue);
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
    console.log(event);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
      ownedApartments: editFormData.ownedApartments,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      ownedApartments: contact.ownedApartments,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
    setDeleteContactId(null);
  };

  const handleDeleteClick = (event, contact) => {
    event.preventDefault();
    setDeleteContactId(contact.id);
    console.log(contact);
  };

  const handleDeleteSubmitClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className='app-container'>
      <form className='formTable' onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Owned apartments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : deleteContactId === contact.id ? (
                  <ReadOnlyRow
                    contact={contact}
                    deleteContactId={deleteContactId}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type='text'
          name='fullName'
          required='required'
          placeholder='Enter a name...'
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='address'
          required='required'
          placeholder='Enter an addres...'
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='phoneNumber'
          required='required'
          placeholder='Enter a phone number...'
          onChange={handleAddFormChange}
        />
        <input
          type='email'
          name='email'
          required='required'
          placeholder='Enter an email...'
          onChange={handleAddFormChange}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default Reports;
