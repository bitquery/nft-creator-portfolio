import React from 'react'
import '../../pages/style.css';
import { Container, Row, Col } from 'react-bootstrap'


function Aboutpage() {
    return (
        <div className='aboutpagebackground'>
            <Container>
                <Row className='textbackground'>
                    <Col md={7} >
                        <h3 className='aboutmetext'>About <span>Me</span></h3>
                        <p className='aboutdetails'>
                           Bitquery is a blockchain data company that provides realtime and archive blockchain data
                        </p>
                        <ul className='skilllist'>
                            <Row>
                                <h3>Skills</h3>
                                <Col md={7}>
                                    <li>Solidity</li>
                                    <li>GraphQL</li>
                                    <li>Canva</li>
                                    <li>Python</li>
                                </Col>
                                <Col md={5}>
                                    <li>Graphic Design</li>
                                    <li>Adobe Illustrator</li>
                                    <li>Adobe Photoshop</li>
                                    <li>Material-ui</li>
                                    <li>Git/Github</li>
                                </Col>
                            </Row>
                        </ul>
                    </Col>
               
                </Row>
            </Container>
        </div>
    )
}

export default Aboutpage