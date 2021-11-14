class UserInfo {
    constructor({name, job}){
        this._name = name;
        this._job = job;

    }

    getUserInfo() {
        const userData = {};

        userData.userName = this._name.textContent;
        userData.userJob = this._job.textContent;
        return userData;
        
        
    }

    setUserInfo( userName, userJob ) {
        this._name.textContent = userName;
        this._job.textContent = userJob;
    }

}

export { UserInfo }; 