import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button'

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  
function LoadingButton(props) {
const [isLoading, setLoading] = useState(false);

useEffect(() => {
    if (props.isCatLoading===false) {
        setLoading(false);
    }
  },[props.isCatLoading]);


useEffect(() => {
    if (isLoading) {
        props.getCats();
    }
}, [isLoading]);

 const handleClick = () => setLoading(true);
//const handleClick = () => props.getCats();

return (
    <Button
    variant="primary"
    size="lg"
    disabled={isLoading||props.noCats}
    onClick={!isLoading ? handleClick : null}
    >
    {isLoading ? 'Loading Cats…' : 'Load More'}
    </Button>
);
}

export default LoadingButton;