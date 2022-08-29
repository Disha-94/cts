import React from 'react'
//import data from '../data/RiskNrate.csv';
import { Button, Icon, MediaBox, Row, Col } from 'react-materialize';
//import { Table } from 'react-materialize';
import { Link } from 'react-router-dom';
// import * as d3 from 'd3';

export default class plot extends React.Component {

    /*constructor(props) {
        super(props)
    }*/

    render() {
        //const { classes } = this.props;
        return (
            <div>
                <div style={{ position: 'absolute', top: '5vh', left: '5vw' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button node="button" type="submit" waves="light">
                            Map View
                    <Icon left> map  </Icon>
                        </Button>
                    </Link>
                    <h2 style={{ textAlign: 'center', color: '#2980b9' }}> Results </h2>
                    <Row>
                        <Col>
                            <MediaBox
                                id="MediaBox_1"
                                options={{
                                    inDuration: 275,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 200
                                }}
                            >
                                <img alt="" src="/images/boxplot.jpg" width="500" />
                            </MediaBox>
                        </Col>
                        <Col>
                            <MediaBox
                                id="MediaBox_1"
                                options={{
                                    inDuration: 275,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 200
                                }}
                            >
                                <img alt="" src="/images/boxplotRTN.jpg" width="500" />
                            </MediaBox>
                        </Col>
                        <Col>
                            <div style={{ position: 'relative', left: '3vw' }} >
                                <Row>
                                    <MediaBox
                                        id="MediaBox_1"
                                        options={{
                                            inDuration: 275,
                                            onCloseEnd: null,
                                            onCloseStart: null,
                                            onOpenEnd: null,
                                            onOpenStart: null,
                                            outDuration: 200
                                        }}
                                    >
                                        <img alt="" src="/images/Criterion.jpg" width="300" />
                                    </MediaBox>
                                </Row>
                                <Row>
                                    <MediaBox
                                        id="MediaBox_1"
                                        options={{
                                            inDuration: 275,
                                            onCloseEnd: null,
                                            onCloseStart: null,
                                            onOpenEnd: null,
                                            onOpenStart: null,
                                            outDuration: 200
                                        }}
                                    >
                                        <img alt="" src="/images/table.jpg" width="300" />
                                    </MediaBox>
                                </Row>


                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );

    }
}