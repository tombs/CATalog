import React from 'react';

// Fetch data function (axios)
import { getAllBreeds, getCatPicturesFromBreed } from 'scripts/dataFetch';
import { BREEDS_URL, CAT_BREED_IMAGES_URL } from 'apiConstants';

// React Bootstrap Components
import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'

// Custom Components
import CatCard from 'components/Card';
import LoadingButton from 'components/LoadButton';

const buttonStyle = {
    width: "20%",
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catBreeds: [],
            catBreedPics: [], // cat pic objects for display
            fetchedPics:[], // latest fetched cat pic objects, which could include old cat pics
            // newPics:[], // all pic objects from latest fetched pics that are not duplicates
            currentPics:[], // list of id's of all currently displayed cat pics
            currentBreed: null,
            allCatsLoadad: false,
            currentPage: 1,
            totalCats: 0,
            limitCount: 10,
            isLoading: false,
        };
        this.getMoreCats = this.getMoreCats.bind(this);
    
      }

    componentDidMount() {
        const {
            currentPage,
            limitCount
        } = this.state;
        const queryString = this.props.location.search;
        let searchParams = new URLSearchParams(queryString);
        const breedId = searchParams.get('breed');
        console.log("breedId: "+breedId);

        getAllBreeds(BREEDS_URL).then(response => {                
                this.setState({
                    catBreeds: response
                })
              }
        );

        if (breedId) {
            getCatPicturesFromBreed(CAT_BREED_IMAGES_URL,currentPage,limitCount,breedId)
            .then(response => {
                console.log("response: "+JSON.stringify(response));
                this.setState(
                        (state) => ({
                            currentPage: state.currentPage + 1,
                            fetchedPics: response,
                            currentBreed: breedId
                        }),
                        () => {
                            console.log("CALLBACK!!!");
                            this.processCatPicID(response);
                        }
                        )
            });    
        }

    }

    processCatPicID(catPicList) {
        console.log("PROCESSING CATS!");
        const {
            currentPics
        } = this.state;

        let tempPicsList = [];
        let tempNewPicsObjects = []
        let newPicCounter = 0;

        catPicList.map(
            catObj => {
                if (currentPics.indexOf(catObj.id) === -1 ){
                    tempPicsList.push(catObj.id);
                    tempNewPicsObjects.push(catObj);
                    newPicCounter+=1;
                }
            }
        )


        if (newPicCounter > 0) {
            this.setState(
                (state) => ({
                    currentPics: state.currentPics.concat(tempPicsList),
                    catBreedPics: state.catBreedPics.concat(tempNewPicsObjects),
                    // newPics: state.newPics.concat(tempNewPicsObjects);
                })
                )

        }
        else {
            this.setState({
                allCatsLoadad: true
            })
        }

    }

    getMoreCats() {
        const {
            currentPage,
            limitCount, 
            currentBreed
        } = this.state;

        this.setState({
            isLoading: true
        });

        getCatPicturesFromBreed(CAT_BREED_IMAGES_URL,currentPage,limitCount,currentBreed)
        .then(response => {
            console.log("response: "+JSON.stringify(response));
            this.setState(
                (state) => ({
                    currentPage: state.currentPage + 1,
                    fetchedPics: response,
                    isLoading: false,
                }),
                () => {
                    console.log("CALLBACK!!! MORE CATS");
                    this.processCatPicID(response);
                }
                )
        });    
    }

    handleChange(event, value) {
        const {
            currentPage,
            limitCount
        } = this.state;

        console.log("EVENT: "+event);
        console.log("VALUE: "+event.target.value);
        this.setState({
            currentBreed: event.target.value
        })
        
        this.resetImages()
        
        if (event.target.value === 'Select Breed') {
            return;
        }

        getCatPicturesFromBreed(CAT_BREED_IMAGES_URL,currentPage,limitCount,event.target.value)
        .then(response => {
            console.log("CHANGE response: "+JSON.stringify(response));
            this.setState(
                (state) => ({
                    currentPage: state.currentPage + 1,
                    fetchedPics: response,
                }),
                () => {
                    console.log("CALLBACK!!!");
                    this.processCatPicID(response);
                }
                )
                
        });
    }

    // Remove images (reset state) when there is a change in breed selection
    resetImages() {
        this.setState({
            catBreedPics : [],
            totalCats: 0,
            currentPage: 1,
            currentPics: [],
            allCatsLoadad: false,
            fetchedPics: []
        })
    }

      
    render() {
        const {
            catBreeds,
            allCatsLoadad,
            catBreedPics,
            currentBreed,
            isLoading,
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
                    <Form.Control style={buttonStyle} as="select" value={currentBreed?currentBreed:''} custom onChange={(e, value)=>this.handleChange(e, value)}>
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
        );
      })}      
    </CardDeck>
    { catBreedPics.length === 0 && (<h5>No Cats Available</h5>)}


        { !allCatsLoadad &&  (<LoadingButton isCatLoading={isLoading    } noCats={catBreedPics.length===0?true:false} getCats={this.getMoreCats} />) }


        </Container>
        );
    }
  }

export default HomePage;