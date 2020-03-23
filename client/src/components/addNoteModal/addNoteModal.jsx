import React from "react";
import Modal from "react-modal";

import "./addnotemodal.scss";

Modal.setAppElement("#root");

export default class AddNoteModal extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     checked: false
  //   };
  //   this.handleStatus = this.handleStatus.bind(this);
  // }  

  // handleStatus(checked) {
  //   this.setState({ checked });
  // }

  // handleSubmit2 = event => {
  //   event.preventDefault();  
  //   const noteColor = randomColor({luminosity: 'light'})
  //   let note = { id: uuidv4(),
  //       title: event.target.title.value,
  //       user: event.target.user.value,
  //       description: event.target.description.value, 
  //       color: noteColor,  
  //       status: 'TODO',
  //   }

  //   axios.post('http://localhost:8080/project/1', note)
  //   .then(res => {
  //       this.props.toggleModal();
  //       this.props.updateList()
  //   })
  //   .catch(err => {
  //       throw err;
  //   });

  // };

  // handleSubmit = (event) => {

  //   event.preventDefault();

  //   const ticketColor = randomColor({luminosity: 'light'})
  //   const id = Math.floor(Math.random() * 1000000000);

  //   const ticket = { ticketId: id,
  //       projectId: Number(this.state.projectId),
  //       user: event.target.user.value,
  //       title: event.target.title.value,
  //       status: 'TODO',
  //       description: event.target.description.value, 
  //       color: ticketColor,  
  //   }

  //   console.log("ticket info: ", ticket);
    

  //   axios.post('http://localhost:8080/database/projects/tickets', ticket)
  //   .then( response => console.log(response))
  //   .catch( error => console.log(error))

  //   event.target.reset();

  // }

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