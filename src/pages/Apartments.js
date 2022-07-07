import './Table.css';

import MaterialTable from 'material-table';
import { useState } from 'react';

import { getApartments, getUsers, linkUser, unlinkUser } from '../Utils/Common';
import DialogComponentLinkUserToApartment from './DialogComponentLinkUserToApartment';
import DialogComponentRemoveUserFromApartment from './DialogComponentRemoveUserFromApartment';
import tableIcons from './MaterialTableIcons';

let data = [
  {
    id: 'hei',
    apartmentNumber: 1,
    floor: 0,
    numberOfRooms: 3,
    owner: { fullName: 'Mihai Adrian', ownerId: 'aaa' },
  },
  { id: 'hei', apartmentNumber: 2, floor: 0, numberOfRooms: 3 },
  {
    id: 'hei',
    apartmentNumber: 3,
    floor: 0,
    numberOfRooms: 3,
  },
  {
    id: 'hei',
    apartmentNumber: 4,
    floor: 0,
    numberOfRooms: 3,
    owner: { fullName: 'Ciurea Marius', ownerId: 'aaa' },
  },
  {
    id: 'hei',
    apartmentNumber: 5,
    floor: 0,
    numberOfRooms: 3,
    owner: { fullName: 'Radoi Iulian', ownerId: 'aaa' },
  },
  getApartments().then((res) => {
    console.log(res);
    data = res;
  }),

  {
    id: 'hei',
    apartmentNumber: 10,
    floor: 1,
    numberOfRooms: 3,
    owner: { fullName: 'Claudiu Pumnea', ownerId: 'aaa' },
  },
  {
    id: 'hei',
    apartmentNumber: 100,
    floor: 10,
    numberOfRooms: 3,
    owner: { fullName: 'Claudiu Pumnea', ownerId: 'aaa' },
  },
];

const columns = [
  { title: 'Apartment Number', field: 'apartmentNumber' },
  { title: 'Floor', field: 'floor' },
  { title: 'Number Of Rooms', field: 'numberOfRooms' },
  { title: 'Owner', field: 'owner.fullName' },
];

const Apartments = () => {
  const [removeUserDialogStatus, setRemoveUserDialogStatus] = useState(false);
  const [addDialogStatus, setAddDialogStatus] = useState(false);
  const [dataToShow, setData] = useState([]);
  const [selectedRow, setRow] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [users, setUsers] = useState(null);

  if (firstTime) {
    getApartments().then((res) => {
      console.log(res);
      data = res;
      setFirstTime(false);
      setData(data);
    });
    getUsers().then((users) => {
      setUsers(users);
      console.log(users);
    });
  }

  console.log(users);
  console.log(dataToShow);
  console.log(selectedRow);

  const handleDeleteButton = (rowData) => {
    setRow(rowData);
    setRemoveUserDialogStatus(true);
    console.log(rowData);
  };
  const cancelButton = () => {
    setRemoveUserDialogStatus(false);
    setAddDialogStatus(false);
  };

  const yesButtonOnRemoveUser = (id, apartmentId) => {
    const newData = dataToShow.filter((el) => {
      if (el?.owner?.ownerId === id && el.id === apartmentId) {
        el.owner.fullName = '';
        el.owner.ownerId = null;
      }
      return el;
    });
    console.log(newData);
    unlinkUser(apartmentId);
    setData(newData);
    setRemoveUserDialogStatus(false);
  };

  const yesButton = (apartmentId, userId) => {
    console.log(apartmentId);
    console.log(userId);
    const newData = dataToShow.filter((apartment) => {
      if (apartment.id === apartmentId) {
        users.filter((el) => {
          if (el.userId === userId) {
            apartment.owner.fullName = el.firstName + ' ' + el.lastName;
            apartment.owner.ownerId = el.userId;
          }
          console.log(el);
        });
      }
      return apartment;
    });
    linkUser(apartmentId, userId);
    setData(newData);
    setAddDialogStatus(false);
  };

  const handleAddButton = () => {
    setAddDialogStatus(true);
  };
  return (
    <>
      <MaterialTable
        title='Apartments table'
        actions={[
          (rowData) => ({
            icon: tableIcons.Clear,
            tooltip: 'Remove User',
            onClick: (event, rowData) => handleDeleteButton(rowData),
            disabled: !rowData?.owner?.ownerId ? true : false,
          }),
          {
            icon: tableIcons.Add,
            tooltip: 'Assign apartment to user',
            isFreeAction: true,
            onClick: (event) => handleAddButton(),
          },
        ]}
        icons={tableIcons}
        columns={columns}
        data={dataToShow}
      />
      <DialogComponentRemoveUserFromApartment
        isOpen={removeUserDialogStatus}
        name={selectedRow?.owner.fullName}
        onClose={() => {
          cancelButton();
        }}
        onSubmit={() =>
          yesButtonOnRemoveUser(selectedRow?.owner.ownerId, selectedRow?.id)
        }
      ></DialogComponentRemoveUserFromApartment>
      <DialogComponentLinkUserToApartment
        isOpen={addDialogStatus}
        users={users}
        apartments={dataToShow.filter((el) => el?.owner?.ownerId === null)}
        onClose={() => {
          cancelButton();
        }}
        yesButton={yesButton}
      ></DialogComponentLinkUserToApartment>
    </>
  );
};

export default Apartments;
