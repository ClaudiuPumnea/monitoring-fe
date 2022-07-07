import './DialogComponentDelete.css';

import React, { Component } from 'react';

class DialogComponentRemoveUserFromApartment extends Component {
  render() {
    let dialog = (
      <div>
        <div className='overlay'>
          <div className='dialog'>
            <div className='dialog__content'>
              <h2 className='dialog__title'>Remove {this.props.name}</h2>
              <p className='dialog__description'>
                Are you sure you want to unlink this user from apartment 5{' '}
                {this.props.apartmentNumber}?
              </p>
              <hr />
              <div className='dialog__footer'>
                <button className='dialog__cancel' onClick={this.props.onClose}>
                  Cancel
                </button>
                <button
                  className='dialog__confirm'
                  onClick={this.props.onSubmit}
                >
                  Yes, unlink
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

export default DialogComponentRemoveUserFromApartment;
