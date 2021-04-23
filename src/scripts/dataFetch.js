import axios from 'axios';

export async function getBreeds(breeds_url) {
    let results = await axios.get(breeds_url);
    const breeds = results.data;
    console.log("breeds: "+JSON.stringify(breeds));
    return breeds;
    
}


export async function getCatPictures(cat_images_url, page_number, limit, breed_id) {
    const picsUrl = cat_images_url + "?page=" + page_number + "&limit=" + limit + "&breed_id="+breed_id;
    let results = await axios.get(picsUrl);
    const cat_images = results.data;
    console.log("cat images: "+JSON.stringify(cat_images));
    return cat_images;

}

  