import React from 'react';

// Fetch data function (axios)
import { getCatDetails } from 'scripts/dataFetch';

// Constants
import { CAT_DETAILS_URL } from 'apiConstants';

// React Bootstrap Components
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class DetailsPage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                catDetailsResponse: '',
                catDetails: '',
                backUrl: '',
            };
        
          }

          componentDidMount() {
            const  { catId } = this.props.match.params;
            console.log("search: "+catId);            
            
            getCatDetails(CAT_DETAILS_URL, catId).then(response => {                
                this.setState({
                    catDetailsResponse: response,
                    catDetails: response.breeds[0]
                })
              }
        );
          }

          render() {
            const {
              catDetailsResponse,
              catDetails
            } = this.state;

              return (
                <Container>
                  
                  <Card>
                    <Card.Header>
                      <Button variant="primary" size="lg" href={'/?breed='+catDetails.id} active>
                      Back
                      </Button>
                  </Card.Header>
                   <Card.Img variant="top" src={catDetailsResponse.url} />
                    <Card.Body>
                      <Card.Title>{catDetails.name}</Card.Title>
                      <Card.Text>{catDetails.origin}</Card.Text>
                      <Card.Text>{catDetails.temperament}</Card.Text>
                      <Card.Text>{catDetails.description}</Card.Text>
                    </Card.Body>
                  </Card>
                          
              </Container>
              )                                
          }
}

export default DetailsPage;