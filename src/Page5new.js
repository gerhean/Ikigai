import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';
import { Button } from 'react-bootstrap';
import { useLocation, Link } from "react-router-dom";
import "./u.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Hidden from './Hidden';
import { v4 } from 'uuid';
import { Row, Col, Container, Modal, Form } from 'react-bootstrap';
import Trash from './components/trash';
import Note from './Note';
import BackButton from './components/BackButton';
import CircleSVG from './components/CircleSVG';
import Twitter from './components/Twitter';
import Facebook from './components/Facebook';
import Linkedin from './components/Linkedin';
import Whatsapp from './components/Whatsapp';
import Add from './components/Add';

//paid, vocation, needs, mission, love, passion, ikigai, profession, good


const Circa2 = () => {
    const { cols, pathname } = useLocation();
    let circleData = null;

    if (pathname === '/u') {
        const rectangleData = [[], [], [], []]
        let i = 0

        Object.entries(cols).map(([columnId, column]) => {
            rectangleData[i] = column.items;
            i += 1;
        });

        circleData = {
            [v4()]: {
                id: 'r1',
                name: 'what you can be PAID FOR',
                items: rectangleData[3],
                top: '118px',
                left: '254px',
                width: '283px',
                maxWidth: '283px',
                height: '82px',
            },
            [v4()]: {
                id: 'r2',
                name: 'what the WORLD NEEDS',
                items: rectangleData[0],
                top: '292px',
                left: '83px',
                width: '90px',
                maxWidth: '110px',
                height: '258px'
            },
            [v4()]: {
                id: 'r3',
                name: 'what you LOVE',
                items: rectangleData[1],
                top: '642px',
                left: '259px',
                width: '271px',
                maxWidth: '283px',
                height: '89px'
            },
            [v4()]: {
                id: 'r4',
                name: 'what you are GOOD AT',
                items: rectangleData[2],
                top: '291px',
                left: '616px',
                width: '88px',
                maxWidth: '110px',
                height: '261px'
            },
            [v4()]: {
                id: 'r5',
                name: '', // blue yellow
                items: [],
                top: '223px',
                left: '199px',
                width: '128px',
                maxWidth: '200px',
                height: '134px'
            },
            [v4()]: {
                id: 'r6',
                name: '', // green blue
                items: [],
                top: '490px',
                left: '198px',
                width: '129px',
                maxWidth: '200px',
                height: '130px'
            },
            [v4()]: {
                id: 'r7',
                name: '', // green red
                items: [],
                top: '497px',
                left: '461px',
                width: '134px',
                maxWidth: '200px',
                height: '128px'
            },
            [v4()]: {
                id: 'r8',
                name: '', // center
                items: [],
                top: '363px',
                left: '335px',
                width: '119px',
                maxWidth: '130px',
                height: '125px'
            },
            [v4()]: {
                id: 'r9',
                name: '', // red yellow
                items: [],
                top: '230px',
                left: '460px',
                width: '132px',
                maxWidth: '2px',
                height: '127px'
            },
            ['add']: {
                id: 'r10',
                name: '', // add activity
                items: [],
                top: '',
                left: '',
                width: '',
                height: ''
            },
        };
    }
    else {
        circleData = cols;
    }

    const [columns, setColumn] = useState(circleData);
    const filtered = Object.fromEntries(Object.entries(columns).filter(([colId, col]) => colId !== 'add'))
    const [text, setText] = React.useState('');

    function handleChange(event) {
        event.preventDefault()
        setText(event.target.value);
    }

    function handleAdd() {
        if (!text) {
            return;
        }
        const newList = columns['add'].items.concat({ id: v4(), intext: text });
        const newColumns = {
            ...columns,
            ['add']: {
                ...columns['add'],
                items: newList
            }
        };

        setColumn(newColumns);

        setText('');
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (!text) {
                return;
            }

            const newList = columns['add'].items.concat({ id: v4(), intext: text });

            const newColumns = {
                ...columns,
                ['add']: {
                    ...columns['add'],
                    items: newList
                }
            };

            setColumn(newColumns);

            setText('');
        }
    }

    const onDragEnd = (result, columns, setColumn) => {

        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumn({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });

        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumn({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };


    return (

        <>
            {/* <Logo/> */}

            <div className="page-container-6 container">

                <div className="venn-diagram" style={{ display: 'table', margin: '0 auto' }}>
                    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumn)}>
                        <div className="btn-back">
                            {/* <BackButton /> */}
                        </div>
                        <div className="main-header-text">
                            <h3>Your Ikigai, Visualised.</h3>
                        </div>
                        <Row className="row-container">
                            <Col xs={9} className="venn-container p-0">
                                {Object.entries(filtered).map(([columnId, column]) => {
                                    return (
                                        <Hidden
                                            key={columnId}
                                            id={columnId}
                                            col={column}
                                            columns={columns}
                                            handleColumn={setColumn}
                                            top={column.top}
                                            left={column.left}
                                            width={column.width}
                                            maxWidth={column.maxWidth}
                                            height={column.height}>
                                        </Hidden>
                                    );
                                })}
                                <CircleSVG />
                            </Col>

                            <Col xs={3} className="circle-add mt-5">
                                <Droppable droppableId='add'>
                                    {(provided, snapshot) => (
                                        <>
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {provided.placeholder}
                                            </div>

                                            <div className="pills-location">
                                                <Form.Control className='form rounded-pill' value={text}
                                                    onChange={handleChange}
                                                    onBlur={handleAdd}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="Add activity..."
                                                />
                                            </div>
                                            <div className="pill-container">
                                                {columns['add'].items.map((element, index) =>
                                                    <Note
                                                        columnId='add'
                                                        col={columns['add']}
                                                        columns={columns}
                                                        items={columns['add'].items}
                                                        key={element.id}
                                                        id={element.id}
                                                        intext={element.intext}
                                                        handleColumn={setColumn}
                                                        index={index}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    )}
                                </Droppable>
                            </Col>
                        </Row>
                    </DragDropContext>


                    <Link
                        to={{
                            pathname: "/print",
                            cols: columns
                        }}
                    >
                        <button type="button" className="btn-default btn-2 btn-lg my-5">
                            Export Report
                </button>
                    </Link>


                    {/* <button type="button" className="btn-default btn-2 btn-lg my-5">
                    Export Report
                    </button> */}

                    <div class="card card-shadow mt-5">
                        <div class="card-body">
                            <div className="share-container container">
                                <p>Share:</p>
                                <ul>
                                    <li className="hvr-float"><a href="https://twitter.com/" target="__blank"><Twitter /></a></li>
                                    <li className="hvr-float"><a href="https://facebook.com/" target="__blank"><Facebook /></a></li>
                                    <li className="hvr-float"><a href="https://linkedin.com/" target="__blank"><Linkedin /></a></li>
                                    <li className="hvr-float"><a href="https://whatsapp.com/" target="__blank"><Whatsapp /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <p>
                            Achieving Ikigai is a challenging process.<br />
                            Your pursuit of Ikigai should draw you closer to a particular cause, skill, or people networks.<br /><br />

                            All the best in your pursuit of ikigai!
                        </p>
                    </div>


                </div>


            </div>
        </>
    );
};

export default Circa2;