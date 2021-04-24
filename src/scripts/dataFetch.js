import axios from 'axios';

/**
 * Get all breeds from https://docs.thecatapi.com/
 * @param {string} breedsUrl API URL for breeds
 * @returns {Promise} Query result for breeds
 */
export async function getAllBreeds(breedsUrl) {
    let results = await axios.get(breedsUrl);
    const breeds = results.data;
    console.log("breeds: "+JSON.stringify(breeds));
    return breeds;
    
}

/**
 * Get all cat pictures for a specific breed from https://docs.thecatapi.com/
 * @param {string} catImagesUrl API URL for cat breed images
 * @param {integer} pageNumber Page Number
 * @param {integer} limit Number of images to return
 * @param {string} breedId ID for the cat breed
 * @returns  {Promise} Query result for cat pictures of a breed
 */
export async function getCatPicturesFromBreed(catImagesUrl, pageNumber, limit, breedId) {
    const picsUrl = catImagesUrl + "?page=" + pageNumber + "&limit=" + limit + "&breed_id="+breedId;
    let results = await axios.get(picsUrl);
    const catImages = results.data;
    console.log("cat images: "+JSON.stringify(catImages));
    return catImages;

}

/**
 * Get details about a specific cat from  from https://docs.thecatapi.com/
 * @param {string} catDetailsUrl API Url for cat details
 * @param {string} catId Specific cat ID
 * @returns {Promise} Query result for cat details for a specific cat
 */
export async function getCatDetails(catDetailsUrl, catId) {
    const detailsUrl = catDetailsUrl + catId;
    let results = await axios.get(detailsUrl);
    const catDetails = results.data;
    console.log(" cat details: "+JSON.stringify(catDetails));
    return catDetails;

}
  