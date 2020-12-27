import React, { useState } from 'react';
import { Container, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { v4 } from 'uuid';
import Trash from '../components/trash.js';
import Info from '../components/info.js';

const initialNotes = [
    {intext : 'hello i am a first note', id: v4()},
]

const Rectangle = ()=> {
    const [notes, setNote] = React.useState(initialNotes);
    const [text, setText] = React.useState('');

    const [isShown, setIsShown] = useState(false);


    function handleChange(event) {
        setText(event.target.value);
      }

    function handleAdd(event) {
        if (!text){
            return;
        }
        const newList = notes.concat({ intext: text, id: v4()});
        setNote(newList);
     
        setText('');
    }


    function Note(props) {
        return (
        <div 
            variant = 'light' 
            className='rounded-pill' 
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            {props.intext}
            {isShown && (
                <div className="btn-delete-container" onClick={() => props.deleteNote(props.id)}>
                    <Trash />
                </div>
            )}
        </div>
        )
    }


    const deleteNote = (id) => {
        setNote(notes.filter((note) => note.id !== id))
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          if (!text){
            return;
        }

        const newList = notes.concat({ intext: text, id: v4()});
        setNote(newList);
     
        setText('');
        }
    }

    
    return ( 
        <>
            <div className="container">
                <div className="rectangle-container text-center">
                    <h3 className="dark-blue">
                        What the world <br></br><strong>NEEDS </strong>
                        
                        <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Tooltip id={`tooltip-bottom`}>
                                    <strong> What The World Needs</strong> <br /> Are you helping to solve an actual problem? <br /> Is what you’re doing bringing beauty or utility to others, helping out, and shaping the world around you?
                                </Tooltip>
                            }
                        >
                            <span>
                                <Info />
                            </span>
                        </OverlayTrigger>
                    </h3>

                    <Container className="pill-container">
                        {notes.map((element) => <Note key={element.id.toString()} intext={element.intext} id={element.id} deleteNote={deleteNote}></Note>)}
                    </Container>

                    <Container>
                        <Form.Control className='form rounded-pill' value={text} onChange={handleChange} onBlur={handleAdd} onKeyPress={handleKeyPress} placeholder="Type here..."/>
                    </Container>
                </div>
            </div>
        </>
    );
}
 
export default Rectangle; 