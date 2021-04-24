import React from 'react';

// Fetch data function (axios)
import { getAllBreeds, getCatPicturesFromBreed } from 'scripts/dataFetch';
import { BREEDS_URL, CAT_BREED_IMAGES_URL } from 'apiConstants';

// React Bootstrap Components
import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'

// Custom Components
import CatCard from 'components/Card';
import LoadingButton from 'components/LoadButton';

const buttonStyle = {
    width: "20%",
};

const sampleNumberOfCards = 15;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catBreeds: [],
            catBreedPics: [],
            currentBreed: '',
            allCatsLoadad: false,
        };
    
      }

    componentDidMount() {
        getAllBreeds(BREEDS_URL).then(response => {                
                this.setState({
                    catBreeds: response
                })
              }
        );

    }

    handleChange(event, value) {
        console.log("EVENT: "+event);
        console.log("VALUE: "+event.target.value);
        this.resetImages()
        getCatPicturesFromBreed(CAT_BREED_IMAGES_URL,1,10,event.target.value)
        .then(response => {
            console.log("response: "+JSON.stringify(response));
            this.setState({
                catBreedPics: response
            })
        });
    }

    // Remove images (reset state) when there is a change in breed selection
    resetImages() {
        this.setState({
            catBreedPics : []
        })
    }

      
    render() {
        const {
            catBreeds,
            allCatsLoadad,
            catBreedPics,
        } = this.state;

        console.log("catBreeds: "+JSON.stringify(catBreeds));
        console.log("catBreedPics: "+JSON.stringify(catBreedPics));
      return (
          <Container>
            <h1>CAT-alogue</h1>
            <Figure>
                <Figure.Image
                    width={60}
                    height={60}
                    alt="40x40"
                    src="https://cdn.pixabay.com/photo/2016/03/31/18/10/cat-1294175__340.png"
                />
            </Figure>

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
      {catBreedPics.length > 0 && catBreedPics.map((cat) => {
        return (
            <CatCard picture={cat.url} catId={cat.id} />
        );
      })}      
    </CardDeck>
    { catBreedPics.length === 0 && (<h5>No Cats Available</h5>)}


        { !allCatsLoadad &&  (<LoadingButton networkRequest=""/>) }


        </Container>
        );
    }
  }

export default HomePage;