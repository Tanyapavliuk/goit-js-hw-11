"use strict"
// бібліотеки
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import OnlyScroll from 'only-scrollbar';
//---------------------
import { fetchInfo,getMore } from "./js/api";
import { createMarkup } from "./js/markup";

//---------посилання на елементи------------//
const refs = {
    form: document.querySelector("#search-form"),
    wrapperGalery: document.querySelector(".gallery"),
    guard: document.querySelector(".js-guard"),
    buttonMore: document.querySelector(".load-more")
}
//---------скриття кнопки------------//
refs.buttonMore.classList.add("is-hidden");

let gallery = new SimpleLightbox('.gallery a');// додавання слайдеру 

refs.form.addEventListener("submit", onClickSubmitBtn);
refs.wrapperGalery.addEventListener("click", onClickGellaryItem);
refs.buttonMore.addEventListener("click", onClickBtnMore);

let searchThis; //---------змінна для значення інпуту------------//

const scroll = new OnlyScroll(document.scrollingElement, {
    damping: 0.6,
    eventContainer: window
});
//---------Для безкінечного скролу (Intersection_Observer_API)------------//

// let options = {
//     root: null,
//     rootMargin: "500px",
// };

// let observer = new IntersectionObserver(() => {
//     onClickDtnMore(); // виклик функції
// }, options);
//--------------------//

function onClickSubmitBtn(evt) {
    evt.preventDefault();

     searchThis = evt.currentTarget.elements.searchQuery.value;//присвоєння значення з імпуту в змінну 

    fetchInfo(searchThis)
        .then(data => {
            refs.wrapperGalery.innerHTML = ""; // очищення, якщо є контент 

            if (data.hits.length === 0) { //якщо немає знайдених фото
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                refs.form.children[0].value = " ";
                return;
            }
             
            if (data.totalHits < 40) { // якщо фото менше 40 не показувати кнопку
                renderMarkup(createMarkup(data.hits));
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
                setTimeout(() => {
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                }, 1500)
                return;
            }

            renderMarkup(createMarkup(data.hits));
           
            refs.buttonMore.classList.remove("is-hidden");
            // observer.observe(refs.guard);}) //безкінечний скрол
            })
        .catch(er => console.warn(er))
        .finally(()=>{gallery.refresh();});
    
}

function onClickBtnMore() {
    getMore(searchThis).then(data => {
    
        if (data.hits.length < 40) {
            renderMarkup(createMarkup(data.hits));
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
            setTimeout(() => {
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                }, 1500)
            
            refs.buttonMore.classList.add("is-hidden");
            return;
        }
        renderMarkup(createMarkup(data.hits));
})
        .catch(er => console.warn(er))
        .finally(()=>{gallery.refresh();});
}

function renderMarkup(markup) {
    refs.wrapperGalery.insertAdjacentHTML("beforeend", markup)
}

function onClickGellaryItem(evt) {
    evt.preventDefault();   
}
