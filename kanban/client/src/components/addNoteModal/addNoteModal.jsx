import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import "./addnotemodal.scss";

var randomColor = require('randomcolor');

Modal.setAppElement("#root");

export default class AddNoteModal extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
    this.handleStatus = this.handleStatus.bind(this);
  }  

  handleStatus(checked) {
    this.setState({ checked });
  }

  handleSubmit = event => {
    event.preventDefault();  
    const noteColor = randomColor({luminosity: 'light'})
    let note = { id: uuidv4(),
        title: event.target.title.value,
        user: event.target.user.value,
        description: event.target.description.value, 
        color: noteColor,  
        status: '0',
    }

    axios.post('http://localhost:8080/project/1', note)
    .then(res => {
        this.props.toggleModal();
        this.props.updateList()
    })
    .catch(err => {
        throw err;
    });
  };

  render() {
    return (
      <>
        {this.props.isOpen && (
          <Modal isOpen={this.props.isOpen} 
          className="modal__body" 
          overlayClassName="modal__overlay"
          >
            <form onSubmit={this.handleSubmit} className="Note-modal-form">
              <h2 className="Note-modal-form__heading">Create New</h2>
            
              <input className="input" name="title" placeholder="Name of Ticket" />
              <input className="input" name="user" placeholder="user" />
              <input className="input" name="description" placeholder="description" />

              <div className="buttons">
                <button className="buttons__save" type="submit">ADD TO BOARD</button>
                <button className="buttons__cancel" onClick={this.props.toggleModal}>CANCEL</button>
              </div>
            </form>
          </Modal>
        )}
      </>
    );
  }
}