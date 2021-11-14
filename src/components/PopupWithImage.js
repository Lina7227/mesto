import { Popup } from './Popup.js'

class PopupWithImage extends Popup{
    constructor(popup){
        super(popup)
        this.imgPopup = document.querySelector('.popup__image');
        this.titlePopup = document.querySelector('.popup__title');
    }

    open({data}) {
        super.open();

        this.imgPopup.src = data.link;
        this.imgPopup.alt = data.name;
        this.titlePopup.textContent = data.name;
    }
}

export { PopupWithImage };