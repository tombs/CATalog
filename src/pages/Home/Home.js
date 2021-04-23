import React from 'react';
import { getBreeds } from 'scripts/dataFetch';
import { BREED_URL } from 'apiConstants';

import Form from 'react-bootstrap/Form'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const sampleStyle = {
    minWidth: "15%",
    flexGrow: 0
  };

const buttonStyle = {
    width: "32%",
};

const sampleNumberOfCards = 5;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catBreeds: [],
            currentBreed: '',
        };
    
      }

    componentDidMount() {
        getBreeds(BREED_URL).then(response => {                
                this.setState({
                    catBreeds: response
                })
              }
        );

    }

    handleChange(event, value) {
        console.log("EVENT: "+event);
        console.log("VALUE: "+event.target.value);
    }

      
    render() {
        const {
            catBreeds,
        } = this.state;
        console.log("catBreeds: "+JSON.stringify(this.state.catBreeds));
      return (
          <div>
            <h1>CAT-alogue!!</h1>

            <h4>Breed</h4>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">                    
                    <Form.Control style={buttonStyle} as="select" custom onChange={(e, value)=>this.handleChange(e, value)}>
                        <option key="breed" >Select Breed</option>
                        {catBreeds.map((breed) => (
                            <option key={breed.id} value={breed.id}>{breed.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
            <CardColumns>
            {[...Array(sampleNumberOfCards)].map((value) => {
                return (
                <Card style={sampleStyle}>
                    <Card.Img variant="top" src="https://via.placeholder.com/300x300" />
                    <Card.Body>
                    <Card.Title>Sample Title</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Sample Rating</small>
                    </Card.Footer>
                </Card>
                );
            })}
            </CardColumns>


            <Button variant="primary" size="lg" active>
                Load More
            </Button>{' '}


        </div>
        );
    }
  }

export default HomePage;