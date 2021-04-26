import React from 'react'
import PropTypes from 'prop-types'

// Fetch data function (axios)
import { getAllBreeds, getCatPicturesFromBreed } from 'scripts/dataFetch'
import { BREEDS_URL, CAT_BREED_IMAGES_URL } from 'apiConstants'

// React Bootstrap Components
import Form from 'react-bootstrap/Form'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'

// Custom Components
import CatCard from 'components/Card'
import LoadingButton from 'components/LoadButton'

// Custom style for Form Control
const buttonStyle = {
  width: '20%'
}

/**
 * This is the HomePage page componenet.  This displays our main page, with cat breeds selection
 * and display of different cat pictures for each breed.
 */
class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      catBreeds: [],
      catBreedPics: [], // cat pic objects for display
      fetchedPics: [], // latest fetched cat pic objects, which could include old cat pics
      // newPics:[], // all pic objects from latest fetched pics that are not duplicates
      currentPics: [], // list of id's of all currently displayed cat pics
      currentBreed: null,
      allCatsLoadad: false,
      currentPage: 1,
      totalCats: 0,
      limitCount: 10,
      isLoading: false,
      isApiError: false
    }
    this.getMoreCats = this.getMoreCats.bind(this)
  }

  componentDidMount () {
    const {
      currentPage,
      limitCount
    } = this.state

    // Get the breed ID from URL if coming from DetailPage
    const queryString = this.props.location.search
    const searchParams = new URLSearchParams(queryString)
    const breedId = searchParams.get('breed')
    console.log('breedId: ' + breedId)

    // Get all cat breeds using API
    getAllBreeds(BREEDS_URL)
      .then(response => {
        this.setState({
          catBreeds: response
        })
      })
      .catch((error) => {
        console.log('ERROR: ' + JSON.stringify(error))
        this.setState({
          isApiError: true
        })
      })

    // If breed ID is present in query parameters, call cat images from breed
    if (breedId) {
      getCatPicturesFromBreed(CAT_BREED_IMAGES_URL, currentPage, limitCount, breedId)
        .then(response => {
          this.setState(
            (state) => ({
              currentPage: state.currentPage + 1,
              fetchedPics: response,
              currentBreed: breedId
            }),
            () => {
              // Process all incoming cat pictures
              this.processCatPicID(response)
            }
          )
        })
        .catch((error) => {
          console.log('ERROR: ' + JSON.stringify(error))
          this.setState({
            isApiError: true
          })
        })
    }
  }

  // Function to process incoming cat pictures from list <catPicList>.
  // functions include:
  //  - Old pictures are ignored (API returnes duplicate pictures)
  //  - New pictures are added to the current list of pictures
  //  - If no new pictures received (all are duplicates), remove "Load More" button (allCatsLoadad)
  processCatPicID (catPicList) {
    const {
      currentPics
    } = this.state

    const tempPicsList = []
    const tempNewPicsObjects = []
    let newPicCounter = 0

    // Process each picture. New cats are added to tempNewPicObjects
    // NewPicCounter is incremented for every new pic.
    catPicList.forEach(
      catObj => {
        if (currentPics.indexOf(catObj.id) === -1) {
          tempPicsList.push(catObj.id)
          tempNewPicsObjects.push(catObj)
          newPicCounter += 1
        }
      }
    )

    // If there are new cat pics, add them to the current list of cats (currentPics)
    if (newPicCounter > 0) {
      this.setState(
        (state) => ({
          currentPics: state.currentPics.concat(tempPicsList),
          catBreedPics: state.catBreedPics.concat(tempNewPicsObjects)
          // newPics: state.newPics.concat(tempNewPicsObjects);
        })
      )
    } else { // All cats have been loaded, remove "Load More" button
      this.setState({
        allCatsLoadad: true
      })
    }
  }

  // This function is called by clicking the "Load More" button.
  // Executes API to get more cats from a selected breed
  getMoreCats () {
    const {
      currentPage,
      limitCount,
      currentBreed
    } = this.state

    this.setState({
      isLoading: true
    })

    // Get more cats from the currently selected breed
    getCatPicturesFromBreed(CAT_BREED_IMAGES_URL, currentPage, limitCount, currentBreed)
      .then(response => {
        this.setState(
          (state) => ({
            currentPage: state.currentPage + 1,
            fetchedPics: response,
            isLoading: false
          }),
          () => {
            // process all incoming cat picturees
            this.processCatPicID(response)
          }
        )
      })
      .catch((error) => { // Handle API errors
        console.log('ERROR: ' + JSON.stringify(error))
        this.setState({
          isApiError: true
        })
      })
  }

  // Function handles changes in the breed select button.
  // Executes API to get all cat pictures from selected breed
  handleChange (event, value) {
    const {
      currentPage,
      limitCount
    } = this.state

    this.setState({
      currentBreed: event.target.value
    })

    // Reset images and other states whenever a new breed is selected.
    this.resetImages()

    if (event.target.value === 'Select Breed') {
      return
    }

    // Execute API to get all pictures from the selected breed
    getCatPicturesFromBreed(CAT_BREED_IMAGES_URL, currentPage, limitCount, event.target.value)
      .then(response => {
        this.setState(
          (state) => ({
            currentPage: state.currentPage + 1,
            fetchedPics: response
          }),
          () => {
            // Process all incoming cat pictures
            this.processCatPicID(response)
          }
        )
      })
      .catch((error) => {
        console.log('ERROR: ' + JSON.stringify(error))
        this.setState({
          isApiError: true
        })
      })
  }

  // Remove images (reset states) when there is a change in breed selection.
  // Called everytime there is a change in breed selection.
  resetImages () {
    this.setState({
      catBreedPics: [],
      totalCats: 0,
      currentPage: 1,
      currentPics: [],
      allCatsLoadad: false,
      fetchedPics: [],
      isApiError: false
    })
  }

  render () {
    const {
      catBreeds,
      allCatsLoadad,
      catBreedPics,
      currentBreed,
      isLoading,
      isApiError
    } = this.state

    return (
          <Container>
            <br/>
              <div className="row text-left">
                <div className="col-md-3">
                  <h1>CAT-alogue</h1>
                </div>
                <div className="col-md-2">
                  <Figure>
                      <Figure.Image
                          width={60}
                          height={60}
                          alt="40x40"
                          src="https://cdn.pixabay.com/photo/2016/03/31/18/10/cat-1294175__340.png"
                      />
                  </Figure>
                </div>
            </div>

            <h4>Breed</h4>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control style={buttonStyle} as="select" value={currentBreed || ''} custom onChange={(e, value) => this.handleChange(e, value)} disabled={!(catBreeds.length > 0)}>
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
            <CatCard picture={cat.url} catId={cat.id} key={cat.id} />
        )
      })}
    </CardDeck>
    { catBreedPics.length === 0 && !isApiError && (<h5>No Cats Available</h5>)}
    {isApiError && (<h5>So sorry, there was a problem calling the cats. RAWR! </h5>)}

        { !allCatsLoadad && (<LoadingButton isCatLoading={isLoading } noCats={catBreedPics.length === 0} getCats={this.getMoreCats} />) }

        </Container>
    )
  }
}

// Props validation
HomePage.propTypes = {

  location: PropTypes.shape({
    search: PropTypes.string
  })

}

export default HomePage
