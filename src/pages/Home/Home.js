import React from 'react';
import { getAllBreeds } from 'scripts/dataFetch';
import { BREED_URL } from 'apiConstants';

import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';


import CatCard from 'components/Card';
import LoadingButton from 'components/LoadButton';

const sampleStyle = {
    minWidth: "20%",
    flexGrow: 0,
    marginBottom: "20px"
  };

const buttonStyle = {
    width: "10%",
};

const sampleNumberOfCards = 15;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catBreeds: [],
            currentBreed: '',
            allCatsLoadad: false,
        };
    
      }

    componentDidMount() {
        getAllBreeds(BREED_URL).then(response => {                
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
            allCatsLoadad,
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
            <CardDeck>
      {[...Array(sampleNumberOfCards)].map((value) => {
        return (
          <CatCard picture="https://via.placeholder.com/300x300" catId="" />
        );
      })}
    </CardDeck>

        { !allCatsLoadad &&  (<LoadingButton networkRequest=""/>) }


        </div>
        );
    }
  }

export default HomePage;