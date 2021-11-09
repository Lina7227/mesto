const formProfileElement = document.querySelector('.form_profile');
const nameInput = formProfileElement.querySelector('.form__item_input_name');
const jobInput = formProfileElement.querySelector('.form__item_input_job');

class UserInfo {
    constructor({firstname, jobname}){
        this._firstname = firstname;
        this._jobname = jobname;
    }

    getUserInfo() {
        nameInput.value = this._firstname.textContent;
        jobInput.value =  this._jobname.textContent;
    }

    setUserInfo() {
        this._firstname.textContent = nameInput.value;
        this._jobname.textContent = jobInput.value;
    }

}

export { UserInfo }; 