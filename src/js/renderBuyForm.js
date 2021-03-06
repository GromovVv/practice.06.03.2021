import cardBuy from '../templates/cardBuy.hbs'
import {refs as galleryRefs} from './renderGallery'
import ApiServices from './apiServices';


const api = new ApiServices();

const refs = {
    root: document.getElementById('root'),
    
}

const addToRefs = () => {
    refs.input = document.querySelector('[data-id="buy-value"]');
    refs.decrement = document.querySelector('[data-action="decrement"]');
    refs.increment = document.querySelector('[data-action="increment"]');
    refs.buy = document.querySelector('[data-action="buy"]');
    refs.cancel = document.querySelector('[data-action="cancel"]');
}


const handlerDecrement = () => {
    const {value} = refs.input;
    if (value >= 1) {
        refs.input.value = Number(value) - 1;
        if(value === 0){
            refs.input.setAttribute('disabled', '');
        }   
    }
}

const handlerIncrement = () => {
    const {value} = refs.input;
    refs.input.value = Number(value) + 1;
    if(value === 1){
        refs.input.removeAttribute('disabled');
    }   
}

const handlerCancel = () => {
    document.getElementById('card-buy').remove()
    galleryRefs.list.removeAttribute('style')   
}

const handlerBuy = (e) => {
    e.preventDefault();
    if (refs.input.value === '0' || !refs.input.value) return alert('uncorrect value!')
    const parent = document.getElementById('card-buy');
    const parentId = parent.dataset.id;
    const good = ApiServices.goods.find(elem => elem.id === Number(parentId));
    const newGood = {...good, quantity: Number(refs.input.value)};
    // delete newGood.id;
    // api.postGood(newGood).then(handlerCancel);
    localStorage.setItem('order', JSON.stringify(newGood))
    handlerCancel()
}



const renderFormBuy = (data) => {
    const markup = cardBuy(data);
    refs.root.insertAdjacentHTML('beforeend' , markup);
    addToRefs();
    refs.input.value = 1;
    refs.decrement?.addEventListener('click', handlerDecrement);
    refs.increment?.addEventListener('click', handlerIncrement);
    refs.cancel?.addEventListener('click', handlerCancel);
    refs.buy?.addEventListener('click', handlerBuy)
}


export default renderFormBuy;
