import { render } from '@testing-library/react';
import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const sampleStyle = {
    minWidth: "20%",
    flexGrow: 0,
    marginBottom: "20px"
  };

class CatCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    
      }

    render() {
        return(            
            <Card style={sampleStyle}>
            <Card.Img variant="top" src={this.props.picture} />
            <Card.Body>
                <Button variant="primary" size="lg" active>
                    View Details
                </Button>
            </Card.Body>
            </Card>
        );

    }
}

export default CatCard;

    

