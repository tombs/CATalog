import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

function LoadingButton (props) {
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (props.isCatLoading === false) {
      setLoading(false)
    }
  }, [props.isCatLoading])

  useEffect(() => {
    if (isLoading) {
      props.getCats()
    }
  }, [isLoading])

  const handleClick = () => setLoading(true)

  return (
    <Button
    variant="primary"
    size="lg"
    disabled={isLoading || props.noCats}
    onClick={!isLoading ? handleClick : null}
    >
    {isLoading ? 'Loading Cats…' : 'Load More'}
    </Button>
  )
}

// Props validation
LoadingButton.propTypes = {
  isCatLoading: PropTypes.bool,
  noCats: PropTypes.bool,
  getCats: PropTypes.func
}

export default LoadingButton
