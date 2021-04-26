import React from 'react'
import PropTypes from 'prop-types'

// Fetch data function (axios)
import { getCatDetails } from 'scripts/dataFetch'

// Constants
import { CAT_DETAILS_URL } from 'apiConstants'

// React Bootstrap Components
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

/**
 *  This is the DetailsPage page component. It displays the specific cat details for a specific cat
 */
class DetailsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      catDetailsResponse: '',
      catDetails: '',
      backUrl: ''
    }
  }

  componentDidMount () {
    // Get catId from URL
    const { catId } = this.props.match.params
    console.log('search: ' + catId)

    // Execute API to get cat details for catId
    getCatDetails(CAT_DETAILS_URL, catId).then(response => {
      this.setState({
        catDetailsResponse: response,
        catDetails: response.breeds[0]
      })
    }
    )
  }

  render () {
    const {
      catDetailsResponse,
      catDetails
    } = this.state

    return (
                <Container>

                  <Card>
                    <Card.Header>
                      <Button variant="primary" size="lg" href={'/?breed=' + catDetails.id} active>
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

// Props validation
DetailsPage.propTypes = {

  match: PropTypes.shape({
    params: PropTypes.shape({
      catId: PropTypes.string
    })
  })

}

export default DetailsPage
