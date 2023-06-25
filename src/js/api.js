const KEY = "37747663-1158017a6a7069441e8b1da5b";
const BASE_URL = "https://pixabay.com/api/"
let page;

export async function fetchInfo(searchThis) {
    page = 1;
    const responsInfo = await fetch(`${BASE_URL}?key=${KEY}&q=${searchThis}&image_type=photo&orientation=horizontal&safesearch=false&page=${page}&per_page=40&lang=ru`);
    return await responsInfo.json();
}

export async function getMore(searchThis) {
    
    page += 1;
    const responsMoreInfo = await fetch(`${BASE_URL}?key=${KEY}&q=${searchThis}&image_type=photo&orientation=horizontal&safesearch=false&page=${page}&per_page=40&lang=ru`);
    if (responsMoreInfo.totalHits / (40 * page) <= 40) {
        return;
    }
    return await responsMoreInfo.json();
}