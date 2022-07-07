import './DialogComponentAddUser.css';

import React, { Component } from 'react';

class DialogComponentAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      password: null,
    };
  }

  handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    switch (fieldName) {
      case 'firstName':
        this.setState({ firstName: fieldValue });
        break;
      case 'lastName':
        this.setState({ lastName: fieldValue });
        break;
      case 'email':
        this.setState({ email: fieldValue });
        break;
      case 'phoneNumber':
        this.setState({ phoneNumber: fieldValue });
        break;
      case 'password':
        this.setState({ password: fieldValue });
        break;
      default:
        break;
    }
    const newFormData = { ...this.state.user };
    newFormData[fieldName] = fieldValue;
    console.log(newFormData);
    console.log(this.state);
  };

  render() {
    let dialog = (
      <div>
        <div className='overlay'>
          <div className='dialog'>
            <div className='dialog__content'>
              <h2 className='dialog__title'>Add a new user</h2>
              <p className='dialog__description'></p>
              <h4>First Name</h4>
              <input
                type='text'
                name='firstName'
                required='required'
                placeholder='Enter the first name...'
                onChange={this.handleAddFormChange}
              />
              <hr />
              <h4>Last Name</h4>
              <input
                type='text'
                name='lastName'
                required='required'
                placeholder='Enter the last name ...'
                onChange={this.handleAddFormChange}
              />
              <hr />
              <h4>Phone Number</h4>
              <input
                type='text'
                name='phoneNumber'
                required='required'
                placeholder='Enter a phone number...'
                onChange={this.handleAddFormChange}
              />
              <hr />
              <h4>Email</h4>
              <input
                type='email'
                name='email'
                required='required'
                placeholder='Enter an email...'
                onChange={this.handleAddFormChange}
              />
              <hr />
              <h4>Password</h4>
              <input
                type='password'
                name='password'
                required='required'
                placeholder='Enter an email...'
                onChange={this.handleAddFormChange}
              />
              <hr />
              <div className='dialog__footer'>
                <button className='dialog__cancel' onClick={this.props.onClose}>
                  Cancel
                </button>
                <button
                  className='dialog__confirm'
                  onClick={() => this.props.onSubmit(this.state)}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}

export default DialogComponentAddUser;
