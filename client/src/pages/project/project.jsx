import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import Note from '../../components/stickeyNote/StickyNote';
import AddNoteModal from '../../components/addNoteModal/addNoteModal';
import Board from '../../components/projectBoard/projectBoard';
import plusSign from '../../assets/icons/Icon-add.svg';
import WasteBin from '../../components/wasteBin/wasteBin';
import Edit from '../../components/editNote/editNote';
import Workshop from '../../components/workshop/workshop';
import backButton from '../../assets/icons/backButton.png';
import './project.scss';

var randomColor = require('randomcolor');

export default class Project extends React.Component {

  state = {
      loadedNotes: false,
      needsUpdate: true,
      modalIsOpen: false,
      workshopIsOpen: false,
      ticketList: [],
      ticketDetails: {}
  };

  toggleModal = () => {
    this.setState ({ modalIsOpen: !this.state.modalIsOpen})
  }

  toggleEdit = () => {
    this.setState ({ workshopIsOpen: !this.state.workshopIsOpen})
  }

  updateList = () => {
    this.setState({ needsUpdate: true});
  }

  dropNote = (status, ticketId) => {

    const updateData = {
      TicketId: ticketId,
      Status: status
    }

    axios.put('http://localhost:8000/database/tickets', updateData)
    .then (res => {
      this.setState ({
        needsUpdate: true,
      })
    })
  }
  
  dropNoteBin = (ticketId) => {

    axios.delete(`http://localhost:8000/database/tickets/${ticketId}`)
    .then(res => this.setState ({ needsUpdate: true}))
    .catch(err => console.log(err)
    )
  }

  dropNoteEdit = (item) => {

    const { ticketContents } = item;

    this.setState({
      workshopIsOpen: !this.state.workshopIsOpen,
      ticketDetails: ticketContents
    })
  }

  updateNote = (event) => {
    event.preventDefault();

    const deets = {
      title: event.target.title.value,
      user: event.target.user.value,
      description: event.target.description.value,
      ticketId: this.state.ticketDetails.TicketId
    }

    axios.put('http://localhost:8000/database/tickets/edit', deets)
    .then (res => {
      this.setState ({
        needsUpdate: true,
      })
    })

    this.toggleEdit();
  }

  getTickets = () => {
    const { projectId } = this.props.match.params    

    axios.get(`http://localhost:8000/database/tickets/${projectId}`)
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

    const { projectId } = this.props.match.params;
    const ticketColor = randomColor({luminosity: 'light'});
    const id = Math.floor(Math.random() * 1000000000);

    const ticket = { ticketId: id,
      projectId: Number(projectId),
      user: event.target.user.value,
      title: event.target.title.value,
      status: 'TODO',
      description: event.target.description.value, 
      color: ticketColor  
    }

    axios.post('http://localhost:8000/database/tickets', ticket)
    .then( response => {
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
      if (this.state.needsUpdate && prevState.loadedNotes) {
        this.setState({ loadedNotes: false});
        this.getTickets();
      }
  }

  render () {

    return (
      <DndProvider backend={Backend} >

        <div className="mainPage">
        
        <Link to={`/user`} >
         <img src={`${backButton}`} className="backButton" alt="" />
        </Link>

        {this.state.loadedNotes && 
          <>
            <Board dropNote={this.dropNote} contents={{title: "TODO"}} >
              {this.state.ticketList.map(note => {
                if(note.Status === 'TODO') return (
                  <Note key={note.TicketId} contents={note} />
                )                        
                else return null
              })}
            </Board>

            <div className="divider"></div>

            <Board dropNote={this.dropNote} contents={{title: "In Progress"}}>
              {this.state.ticketList.map(note => {
                if(note.Status === "In Progress") return (
                  <Note key={note.TicketId} contents={note} />
                )   
                else return null
              })}
            </Board>

            <div className="divider"></div>

            <Board dropNote={this.dropNote} contents={{title: "Complete"}} >
              {this.state.ticketList.map(note => {
                if(note.Status === "Complete") return (
                  <Note key={note.TicketId} contents={note} />
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

            <WasteBin dropNoteBin={this.dropNoteBin} />
            
            <Edit dropNoteEdit={this.dropNoteEdit}/>

            {this.state.workshopIsOpen && 
              <Workshop 
                contents={this.state.ticketDetails} 
                toggle={this.dropNoteEdit}
                updateNote={this.updateNote}
              />
            }
          </>
        }
        </div>
      </DndProvider>
    )
  }
}