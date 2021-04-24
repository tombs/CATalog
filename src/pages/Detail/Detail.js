import React from 'react';

// Fetch data function (axios)
import { getCatDetails } from 'scripts/dataFetch';

// Constants
import { CAT_DETAILS_URL } from 'apiConstants';

// React Bootstrap Components
import Container from 'react-bootstrap/Container'

class DetailsPage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                catDetails: ''
            };
        
          }

          componentDidMount() {
            const  { catId } = this.props.match.params;
            console.log("search: "+catId);
            
            getCatDetails(CAT_DETAILS_URL, catId).then(response => {                
                this.setState({
                    catDetails: response
                })
              }
        );
          }

          render() {
              return (
                <Container>
                    <h1> Welcome to the Details Page </h1>
              </Container>
              )                                
          }
}

export default DetailsPage;