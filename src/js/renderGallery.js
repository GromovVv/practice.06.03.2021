import goodsTmp from '../templates/goodsTmp.hbs';
// import { goods } from '../../db.json';
import ApiServices from "./apiServices";
import renderFormBuy from  './renderBuyForm'

const api = new ApiServices();


export const refs = {
    root: document.getElementById('root'), 
    list: document.createElement('ul')
}

refs.root.appendChild(refs.list);

const renderGallery = (data) => {
    const markup = goodsTmp(data);

    refs.list.insertAdjacentHTML('beforeend' , markup)
}

const handlerBuy = (e) => {
    if (e.target.nodeName !== 'BUTTON') return
    const {id} = e.target.closest('li');
    const good = ApiServices.goods.find(e => e.id === Number(id));
    renderFormBuy(good);
    refs.list.style = 'display: none;';

}

api
.getGoods()
.then(data => renderGallery(data))
.catch(error => console.log(error))

refs.list.addEventListener('click', handlerBuy)





