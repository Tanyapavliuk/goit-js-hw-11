export function createMarkup(data) {
    const markup = data.map(el =>
        `<a class="photo-card" href="${el.largeImageURL}">
    <div class="photo-box"><img src="${el.webformatURL}" alt="${el.tags }" loading="lazy" /></div>
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            <span>${el.likes}</span>
            </p>
            <p class="info-item">
            <b>Views</b>
            <span>${el.views}</span>
            </p>
            <p class="info-item">
            <b>Comments</b>
            <span>${el.comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads</b>
            <span>${el.downloads}</span>
            </p>
        </div>
    </a>`).join("");
   
    return markup;
}