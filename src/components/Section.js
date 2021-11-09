class Section{

    constructor({ items, renderer}, containerSelector){

        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }


    renderItems(){
        this._items.forEach(item => {
            this._renderer(item);
          });
    }

    addItem(evt) {
        this._containerSelector.append(evt);
    }
}

export { Section };