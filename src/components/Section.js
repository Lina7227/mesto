class Section{

    constructor({ renderer }, container){

        this._renderer = renderer;
        this._container = container;
    }


    renderItems = (items) => {
        items.forEach(item => {
            this._renderer(item);
          });
    }

    addItem(evt) {
        this._container.append(evt);
    }

    addCardItem(evt) {
        this._container.prepend(evt);
    }
}

export { Section };