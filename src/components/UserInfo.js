class UserInfo {
    constructor({name, job, avatar}){
        this._name = name;
        this._job = job;
        this._avatar = avatar;

    }

    getUserInfo() {
        const userData = {};

        userData.userName = this._name.textContent;
        userData.userJob = this._job.textContent;
        return userData;
        
        
    }

    setUserInfo( {userName, userJob} ) {
        if(userName) {
            this._name.textContent = userName;
            this._job.textContent = userJob;
        }
        
    }

    setUserAvatar(avatar){
        if(avatar) {
            this._avatar.src = avatar;
        }
        
    }

}

export { UserInfo }; 