import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const sampleStyle = {
  minWidth: '20%',
  flexGrow: 0,
  marginBottom: '20px'
}

class CatCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
            <Card style={sampleStyle}>
            <Card.Img variant="top" src={this.props.picture} />
            <Card.Body>
                <Button variant="primary" size="lg" href={this.props.catId} active>
                    View Details
                </Button>
            </Card.Body>
            </Card>
    )
  }
}

// Props validation
CatCard.propTypes = {
  picture: PropTypes.string,
  catId: PropTypes.string
}

export default CatCard
