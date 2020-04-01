import React from 'react';
import axios from 'axios';
import Note from '../../components/stickeyNote/StickyNote';
import { Link } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import AddNoteModal from '../../components/addNoteModal/addNoteModal';
import Board from '../../components/projectBoard/projectBoard';
import plusSign from '../../assets/icons/Icon-add.svg';
import './project.scss';
import backButton from '../../assets/icons/backButton.png';

var randomColor = require('randomcolor');


export default class Project extends React.Component {

  state = {
      loadedNotes: false,
      needsUpdate: true,
      modalIsOpen: false,
      ticketList: [],
      ticketDetails: {}
  };

  toggleModal = () => {
      this.setState ({ modalIsOpen: !this.state.modalIsOpen})
  }

  updateList = () => {
      this.setState({ needsUpdate: true});
  }

  toggleTicket = () => {
    console.log("hello")
  }

  dropNote = (status, ticketId) => {

    console.log()
    const updateData = {
      TicketId: ticketId,
      Status: status
    }

    axios.put('http://localhost:8080/database/tickets', updateData)
    .then (res => {
      this.setState ({
        needsUpdate: true,
      })
    })
  }

  getTickets = () => {
    const { projectId } = this.props.match.params    

    axios.get(`http://localhost:8080/database/tickets/${projectId}`)
    .then( response => {
      this.setState({
        ticketList: response.data.results,
        loadedNotes: true, 
        needsUpdate: false,
      })
    })
    .catch( error => console.log(error))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { projectId } = this.props.match.params
    const ticketColor = randomColor({luminosity: 'light'})
    const id = Math.floor(Math.random() * 1000000000);

    const ticket = { ticketId: id,
        projectId: Number(projectId),
        user: event.target.user.value,
        title: event.target.title.value,
        status: 'TODO',
        description: event.target.description.value, 
        color: ticketColor,  
    }

    console.log("ticket info: ", ticket);

    axios.post('http://localhost:8080/database/tickets', ticket)
    .then( response => {
      console.log(response)
      this.getTickets();
      this.toggleModal();
    })
    .catch( error => console.log(error))

    event.target.reset();
  }

  componentDidMount() {
    this.getTickets();
  }

  componentDidUpdate (_, prevState) {
      if (this.state.needsUpdate && prevState.loadedNotes === true) {
          this.setState({ loadedNotes: false});
          this.getTickets();
      }
  }


  render () {

    return (

      <DndProvider backend={Backend} >

        <div className="mainPage">
        <Link to={`/user`} >
         <img src={`${backButton}`} className="backButton" />
        </Link>

          {this.state.loadedNotes && 
            <>
              <Board dropNote={this.dropNote} contents={{title: "TODO"}} >
              {this.state.ticketList.map(note => {
                  if(note.Status === 'TODO') return (
                    <Note key={note.TicketId} 
                    contents={note} 
                    toggleTicket={this.toggleDetails} 
                    display={this.state.ticketDetails} />
                  )                        
                  else return null
                })}
              </Board>

              <div className="divider"></div>

              <Board dropNote={this.dropNote} contents={{title: "In Progress"}}>
                {this.state.ticketList.map(note => {
                  if(note.Status === "In Progress") return (
                    <Note key={note.TicketId} 
                    contents={note} 
                    toggleTicket={this.toggleDetails}
                    display={this.state.ticketDetails} />
                  )   
                  else return null
                })}
              </Board>

              <div className="divider"></div>

              <Board dropNote={this.dropNote} contents={{title: "Complete"}} >
              {this.state.ticketList.map(note => {
                  if(note.Status === "Complete") return (
                    <Note key={note.TicketId} 
                    contents={note} 
                    toggleTicket={this.toggleDetails} 
                    display={this.state.ticketDetails} />
                  )   
                  else return null
                })}
              </Board>

              <button className="addButton" onClick={this.toggleModal}>
                <img className="addButton__plus" src={plusSign} alt="plus sign" />
              </button>

              <AddNoteModal
                isOpen={this.state.modalIsOpen}
                contentLabel="onRequestClose"
                toggleModal={this.toggleModal}
                portalClassName="AddProductModal"
                updateList={this.updateList}
                projectId={this.props.match.params.projectId}
                foo={this.handleSubmit}
              />

              </>
              
            }
        </div>
        </DndProvider>
        );
  }
}