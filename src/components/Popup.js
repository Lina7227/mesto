class Popup {
    constructor(popup){
        this._popup = popup;
        this._listenerClick = this._handleEscClose.bind(this);
        
    }

    setEventListeners() {

        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close')
             ) {
                this.close();
                
            } 

        });
        
       
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._listenerClick);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._listenerClick);
    }

    _handleEscClose (evt) {

        if (evt.key === 'Escape') {
            this.close();
        }

    }

}
  
export { Popup };