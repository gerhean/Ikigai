import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { InputGroup, Button, FormControl} from 'react-bootstrap';

import Twitter from './components/Twitter';
import Facebook from './components/Facebook';
import Linkedin from './components/Linkedin';
import Whatsapp from './components/Whatsapp';
import Trash from './components/trash';
import Add from './components/Add';

class Page6 extends Component{
    render(){
        return (
            <>
                <div className="page-container-6 container">
                    <div className="btn-back">
                        <Link to="/your-ikigai-chart">
                            <Button variant="light">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1A1A1A" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <line x1="5" y1="12" x2="11" y2="18" />
                                    <line x1="5" y1="12" x2="11" y2="6" />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                    <h3>Your Ikigai, Visualised.</h3>
                    <div className="row my-5">
                        <div className="col-lg">
                            <p>***Venn Diagram Here***</p>
                        </div>
                        <div className="col-lg">
                            <p>Your steps to achieving ikigai</p>
                            <div className="steps-container container">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Enter step..."
                                        aria-label="Enter step..."
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-danger"><Trash /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Button className="mt-2" variant="outline-primary"><Add /></Button>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn-default btn-2 btn-lg my-5">
                        Export Report
                    </button>

                    <div class="card card-shadow mt-5">
                        <div class="card-body">
                            <div className="share-container container">
                                <p>Share:</p>
                                <ul>
                                    <li className="hvr-icon-bob hvr-float"><a href="https://twitter.com/" target="__blank"><Twitter /></a></li>
                                    <li className="hvr-icon-bob hvr-float"><a href="https://facebook.com/" target="__blank"><Facebook /></a></li>
                                    <li className="hvr-icon-bob hvr-float"><a href="https://linkedin.com/" target="__blank"><Linkedin /></a></li>
                                    <li className="hvr-icon-bob hvr-float"><a href="https://whatsapp.com/" target="__blank"><Whatsapp /></a></li>
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
            </>
        )
    }
}

export default Page6;