class UserInfo {
    constructor({firstname, jobname}){
        this._firstname = firstname;
        this._jobname = jobname;
        // this._name = document.querySelector(this._firstname);
        // this._job = document.querySelector(this._jobname);

    }

    getUserInfo() {
        const userData = {};

        userData.userName = this._firstname.textContent;
        userData.userJob = this._jobname.textContent;
        return userData;
        
        
    }

    setUserInfo( userName, userJob ) {
        this._firstname.textContent = userName;
        this._jobname.textContent = userJob;
    }

}

export { UserInfo }; 