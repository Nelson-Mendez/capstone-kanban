import React from "react";
import Modal from "react-modal";

import "./addnotemodal.scss";

Modal.setAppElement("#root");

export default class AddNoteModal extends React.Component {

  foobar = (e) => {
    this.props.foo(e)
  }

  componentDidMount() {
    this.setState({
      projectId: this.props.projectId
    })
  }

  render() {
    return (
      <>
        {this.props.isOpen && (
          <Modal isOpen={this.props.isOpen} 
          className="modal__body" 
          overlayClassName="modal__overlay"
          >
            <form onSubmit={this.foobar} className="Note-modal-form">
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