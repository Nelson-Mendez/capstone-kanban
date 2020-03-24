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
          className="modalForm__body" 
          overlayClassName="modalForm__overlay"
          >
            <form onSubmit={this.foobar} className="modalForm">
              <h2 className="modalForm__heading">Create New Ticket</h2>
            
              <input className="modalForm__input" name="title" placeholder="Name of Ticket" required />
              <input className="modalForm__input" name="user" placeholder="Who's working it?"/>
              <textarea className="modalForm__input--big" name="description" placeholder="description, max length 150 characters" maxLength="150"/>

              <div className="modalForm__buttons">
                <button className="modalForm__buttons--save" type="submit">ADD TO BOARD</button>
                <button className="modalForm__buttons--cancel" onClick={this.props.toggleModal}>CANCEL</button>
              </div>
            </form>
          </Modal>
        )}
      </>
    );
  }
}