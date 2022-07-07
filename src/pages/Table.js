import './Table.css';

import { el, id } from 'date-fns/locale';
import MaterialTable from 'material-table';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { register } from '../Utils/Common';
import DialogComponentAddUser from './DialogComponentAddUser';
import DialogComponentDelete from './DialogComponentDelete';
import tableIcons from './MaterialTableIcons';

const data = [
  {
    id: 'salut',
    firstName: 'Claudiu',
    lastName: 'Pumnea',
    email: 'pumneaclaudiu@gmail.com',
    phoneNumber: '0725414434',
    createdAt: '23-06-2022 17:30',
  },
  {
    id: 'aasaa',
    firstName: 'Ciurea',
    lastName: 'Marius',
    email: 'ciureamarius@gmail.com',
    phoneNumber: '0726135913',
    createdAt: '26-06-2022 19:40',
  },
  {
    id: 'aaaaaa',
    firstName: 'Bagiu',
    lastName: 'Laurentiu',
    email: 'bagiulaurentiu@gmail.com',
    phoneNumber: '0721061356',
    createdAt: '23-06-2022 19:40',
  },
  {
    id: 'aadsadasaa',
    firstName: 'Ciurezu',
    lastName: 'Eduard',
    email: 'ciurezueduard@yahoo.com',
    phoneNumber: '0724032981',
    createdAt: '23-06-2022 17:42',
  },
  {
    id: 'aasadsadaa',
    firstName: 'Sergiu',
    lastName: 'Voicu',
    email: 'voicusergiu@gmail.com',
    phoneNumber: '0748932509',
    createdAt: '23-06-2022 17:55',
  },
];

const columns = [
  { title: 'FirstName', field: 'firstName' },
  { title: 'LasName', field: 'lastName' },
  { title: 'Email', field: 'email' },
  { title: 'Phone Number', field: 'phoneNumber' },
  { title: 'Create On', field: 'createdAt' },
];

const Table = () => {
  const [deleteDialogStatus, setDeleteDialogStatus] = useState(false);
  const [addDialogStatus, setAddDialogStatus] = useState(false);
  const [deletedRow, setDeletedRow] = useState(null);
  const [dataToShow, setDataToShow] = useState(data);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(false);
  }, [dataToShow, updated]);

  console.log(dataToShow);
  const handleDeleteButton = (rowData) => {
    setDeletedRow(rowData);
    setDeleteDialogStatus(true);
  };

  const cancelButton = () => {
    setDeletedRow(null);
    setDeleteDialogStatus(false);
    setAddDialogStatus(false);
  };

  const yesButton = (id) => {
    console.log(id);
    const newData = dataToShow.filter((el) => el.id !== id);
    console.log(newData);
    setDataToShow(newData);
    setUpdated(true);
    setDeleteDialogStatus(false);
  };

  const yesAddButton = (user) => {
    console.log(user);
    let newData = [...dataToShow];
    register(user).then((el) => {
      if (el.firstName) {
        el.createdAt = moment(el.createdAt).format('DD-MM-YYYY HH:mm');
        el.id = el.userId;
        delete el.userId;
        delete el.isMainAdmin;
        delete el.password;
        el['tableData'] = { id: newData[newData.length - 1].tableData.id + 1 };
        newData.push(el);
      }
      console.log(el);
    });
    newData[0].firstName = 'salut';
    console.log(newData);
    setDataToShow(newData);
    setAddDialogStatus(false);
  };

  const handleAddButton = () => {
    setAddDialogStatus(true);
  };
  return (
    <>
      <MaterialTable
        title='Users table'
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleDeleteButton(rowData),
          },
          {
            icon: tableIcons.Add,
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => handleAddButton(),
          },
          {
            icon: tableIcons.Edit,
            tooltip: 'Edit user',
          },
        ]}
        icons={tableIcons}
        columns={columns}
        data={dataToShow}
      />
      <DialogComponentDelete
        isOpen={deleteDialogStatus}
        name={deletedRow?.firstName + ' ' + deletedRow?.lastName}
        onClose={() => {
          cancelButton();
        }}
        onSubmit={() => yesButton(deletedRow?.id)}
      ></DialogComponentDelete>
      <DialogComponentAddUser
        isOpen={addDialogStatus}
        name={deletedRow?.firstName + ' ' + deletedRow?.lastName}
        onClose={() => {
          cancelButton();
        }}
        onSubmit={yesAddButton}
      ></DialogComponentAddUser>
    </>
  );
};

export default Table;
