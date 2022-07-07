import './DialogComponentDelete.css';

import React, { Component } from 'react';

class DialogComponentLinkUserToApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedApartment: this.props?.apartments[0]?.id || null,
      selectedUser: null,
      users: this.props?.users || null,
    };
  }

  handleOnChangeSelectedApartment(event) {
    this.setState({
      selectedApartment: event.target.value,
    });
    console.log(event.target.value);
  }

  handleOnChangeSelectedUser(event) {
    this.setState({
      selectedUser: event.target.value,
    });
    console.log(event.target.value);
  }

  componentDidMount() {
    // this.setState({ selectedUser: this.state.users[0]?.userId || null });
    console.log(this.props.apartments);
    console.log(this.state.selectedApartment);
    console.log(this.state.users);
  }
  render() {
    let dialog = (
      <div>
        <div className='overlay'>
          <div className='dialog'>
            <div className='dialog__content'>
              <h2 className='dialog__title'>Link user to apartment</h2>
              <p className='dialog__description'></p>
              <h4>Apartments: </h4>
              <select
                className='select'
                onChange={this.handleOnChangeSelectedApartment.bind(this)}
              >
                {this.props.apartments
                  ? this.props.apartments.map((apartment) => (
                      <option value={apartment.id}>
                        {apartment.apartmentNumber}
                      </option>
                    ))
                  : null}
              </select>
              <hr />
              <h4>User: </h4>
              <select
                className='select'
                onChange={this.handleOnChangeSelectedUser.bind(this)}
              >
                {this.props.users
                  ? this.props.users.map((user) => (
                      <option value={user.userId}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))
                  : null}
              </select>
              <hr />
              <div className='dialog__footer'>
                <button className='dialog__cancel' onClick={this.props.onClose}>
                  Cancel
                </button>
                <button
                  className='dialog__confirm'
                  onClick={() => {
                    this.props.yesButton(
                      this.state.selectedApartment
                        ? this.state.selectedApartment
                        : this.props?.apartments[0]?.id,
                      this.state.selectedUser
                        ? this.state.selectedUser
                        : this.props?.users[0]?.userId
                    );
                    this.setState({
                      selectedUser: null,
                    });
                  }}
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

export default DialogComponentLinkUserToApartment;
