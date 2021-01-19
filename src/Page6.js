import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { useLocation, Link } from "react-router-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import { Row, Modal, Col } from 'react-bootstrap';

import Venn from './components/Venn';
import Logo from './components/CS_Logo';
import BackButton from './components/BackButton';

import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";


const Intermediate = () => {
    let { columns, filtered, modals } = useLocation();
    const { setColumn, onDragEnd } = useLocation();

    if (!columns) {
        modals = {
            ['vocation']: {
                name: 'Vocation',
                body1: 'This intersection represents your vocation.',
                body2: 'What are some steps can you take to enjoy your vocation more?',
                top: '378px',
                left: '227px',
                items: []
            },
            ['profession']: {
                name: 'Profession',
                body1: 'This intersection represents your profession.',
                body2: 'In your profession, how can you help the people and community around you?',
                top: '378px',
                left: '554px',
                items: []
            },
            ['mission']: {
                name: 'Mission',
                body1: 'This intersection represents your mission.',
                body2: 'What are some steps you can take to hone your craft?',
                top: '441px',
                left: '225px',
                items: []
            },
            ['passion']: {
                name: 'Passion',
                body1: 'This intersection represents your passion.',
                body2: 'Are you able to turn your passion into something you can be paid for?',
                top: '443px',
                left: '554px',
                items: []
            }
        }

        columns = {
            [v4()]: {
                id: 'r1',
                name: 'what you can be PAID FOR',
                items: [],
                top: '118px',
                left: '254px',
                width: '283px',
                maxWidth: '283px',
                height: '82px',
            },
            [v4()]: {
                id: 'r2',
                name: 'what the WORLD NEEDS',
                items: [],
                top: '292px',
                left: '46px',
                width: '130px',
                maxWidth: '150px',
                height: '258px'
            },
            [v4()]: {
                id: 'r3',
                name: 'what you LOVE',
                items: [],
                top: '642px',
                left: '259px',
                width: '271px',
                maxWidth: '283px',
                height: '89px'
            },
            [v4()]: {
                id: 'r4',
                name: 'what you are GOOD AT',
                items: [],
                top: '291px',
                left: '614px',
                width: '125px',
                maxWidth: '150px',
                height: '261px'
            },
            [v4()]: {
                id: 'r5',
                name: '', // blue yellow
                items: [],
                top: '223px',
                left: '199px',
                width: '128px',
                maxWidth: '150px',
                height: '134px'
            },
            [v4()]: {
                id: 'r6',
                name: '', // green blue
                items: [],
                top: '490px',
                left: '198px',
                width: '129px',
                maxWidth: '150px',
                height: '130px'
            },
            [v4()]: {
                id: 'r7',
                name: '', // green red
                items: [],
                top: '497px',
                left: '461px',
                width: '134px',
                maxWidth: '150px',
                height: '128px'
            },
            [v4()]: {
                id: 'r8',
                name: '', // center
                items: [],
                top: '362px',
                left: '325px',
                width: '132px',
                maxWidth: '150px',
                height: '125px'
            },
            [v4()]: {
                id: 'r9',
                name: '', // red yellow
                items: [],
                top: '223px',
                left: '458px',
                width: '144px',
                maxWidth: '150px',
                height: '134px',
            },
            'add': {
                id: 'r10',
                name: '', // add activity
                items: [],
                top: '',
                left: '',
                width: '',
                height: ''
            },
        };

    filtered = Object.fromEntries(Object.entries(columns).filter(([colId]) => colId !== 'add'))
    }

    return (
        <div className="venn-diagram">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumn)}>
                <div className="page-break">
                    <Venn filtered={filtered} columns={columns} setColumn={setColumn} />
                    <br/>
                    <h3> Steps to Ikigai</h3>
                    {Object.entries(modals).map(([id, modal]) => {
                        return (
                            <>
                            <Col> 
                            <h5>{id}</h5>
                        
                            <p>
                                {modal.items.map((item)=>{
                                    return (
                                        <p>{item.intext}</p>
                                    )}    
                                )}
                            </p>
                            </Col>
                            </>
                        )}
                    )}

                </div>
            </DragDropContext>
        </div>
    );
}

class ComponentToPrint extends Component {
    render() {
        return (
            <Intermediate />
        );
    }
}

class Export extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: [],
        }
    }

    state = {
        showModal: false
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render() {

        return (

            <>
                <Logo />
                <Modal show={this.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Going back to the previous page will erase your progress? Do you want to begin from scratch?</Modal.Body>
                    <Modal.Footer>
                        <button className="btn-default btn-lg" onClick={this.toggleModal}>
                            No
                        </button>
                        <Link
                            to={{
                                pathname: "/your-ikigai-chart",
                            }}
                        >
                            <button className="btn-secondary btn-lg">
                                Yes
                            </button>
                        </Link>
                    </Modal.Footer>
                </Modal>
                <Logo />
                <div className="page-container-6 container">
                    <div className="btn-back">
                        <Link
                            to={{
                                pathname: "/your-ikigai-chart",
                            }}
                        >
                            <BackButton onClick={this.toggleModal} />
                        </Link>
                    </div>
                    <p className="subtitle">Your Ikigai, Visualised</p>
                    <div className="page-print">
                        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
                    </div>

                    <ReactToPrint
                        trigger={() => (
                            <div className="btn-container-center">
                                <button type="button" className="btn-default btn-2 btn-lg btn-width-fit">
                                    Export Report
                            </button>
                            </div>
                        )}
                        content={() => this.componentRef}
                        documentTitle="Your_ikigai"
                    />

                    <div class="card card-shadow mt-5">
                        <div class="card-body">
                            <div className="share-container container">
                                <p>Share:</p>
                                <ul>
                                    <li className="hvr-float">
                                        <FacebookShareButton
                                            url={"https://u.careersocius.com/ikigai"}
                                            quote={"Find out your ikigai here"}
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                    </li>
                                    <li className="hvr-float">
                                        <TwitterShareButton
                                            url={"https://u.careersocius.com/ikigai"}
                                            quote={"Find out your ikigai here"}
                                        >
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                    </li>
                                    <li className="hvr-float">
                                        <LinkedinShareButton
                                            url={"https://u.careersocius.com/ikigai"}
                                            quote={"Find out your ikigai here"}
                                        >
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                    </li>
                                    <li className="hvr-float">
                                        <WhatsappShareButton
                                            url={"https://u.careersocius.com/ikigai"}
                                            quote={"Find out your ikigai here"}
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="container end">
                        <p>Achieving Ikigai is a challenging process.</p>
                        <p>Your pursuit of Ikigai should draw you closer to a particular cause, skill, or people networks.</p>
                        <br />
                        <p> All the best in your pursuit of ikigai!</p>
                    </div>
                </div>
            </>
        );
    }
}

export default Export;