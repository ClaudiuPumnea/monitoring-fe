import React, { Component } from 'react';
import './DialogComponentDelete.css';

class DialogComponentDelete extends Component {
  render() {
    let dialog = (
      <div>
        <div className='overlay'>
          <div className='dialog'>
            <div className='dialog__content'>
              <h2 className='dialog__title'>Delete {this.props.name}</h2>
              <p className='dialog__description'>
                Are you sure you want to delete this user?
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
                  Yes, delete
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

export default DialogComponentDelete;
