import React from 'react';
import Axios from 'axios';
import Note from '../../components/stickeyNote/StickyNote';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import AddNoteModal from '../../components/addNoteModal/addNoteModal';
import Board from '../../components/projectBoard/projectBoard';
import plusSign from '../../assets/icons/Icon-add.svg';
import './project.scss';

export default class Project extends React.Component {

  state = {
      noteList: [],
      loadedNotes: false,
      needsUpdate: true,
      modalIsOpen: false,
  };

  toggleModal = () => {
      this.setState ({ modalIsOpen: !this.state.modalIsOpen})
  }

  updateList = () => {
      this.setState({ needsUpdate: true});
  }

  dropNote = (box, noteId) => {



    let newList = this.state.noteList

    newList.forEach(note => {
      if (note.id === noteId){
        note.status = box
      }
    })

    Axios.put('http://localhost:8080/project/change', newList)
    .then (res => {
      this.setState({ 
        noteList: res.data,
      })
    })
  }

  getNotes = () => {
      Axios.get('http://localhost:8080/project/')
      .then(res => {
          this.setState({
              noteList: res.data,
              loadedNotes: true, 
              needsUpdate: false,
          })
      })
      .catch(err => {
          throw err;
      });
  }

  componentDidMount() {
    this.getNotes();
  }

  componentDidUpdate (_, prevState) {
      if (this.state.needsUpdate && prevState.loadedNotes === true) {
          this.setState({ loadedNotes: false});
          console.log("boutta update")
          this.getNotes();
      }
  }


  render () {
        
        const loadedNotes = this.state.loadedNotes;

        return (
          <DndProvider backend={Backend} >

            <div className="mainPage">

              {loadedNotes 

                ?<>
                  <Board dropNote={this.dropNote} contents={{title: "TODO", check: "0"}} >
                  {this.state.noteList.map(note => {
                      if(note.status === 'TODO' ){
                        return (
                          <Note contents={note} />
                        )
                      }
                    })}
                  </Board>

                  <Board dropNote={this.dropNote} contents={{title: "In Progress", check: "1"}}>
                    {this.state.noteList.map(note => {
                      if(note.status === "In Progress" ){
                        return (
                          <Note contents={note} />
                        )
                      }
                    })}
                  </Board>

                  <Board dropNote={this.dropNote} contents={{title: "Complete", check: "2"}} >
                  {this.state.noteList.map(note => {
                      if(note.status === "Complete" ){
                        return (
                          <Note contents={note} />
                        )
                      }
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
                    />
                  </>
                  
                  :<></>
              }
            </div>
            </DndProvider>
            );
  }
}