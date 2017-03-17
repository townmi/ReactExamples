import axios from 'axios';

let authToken = {
    getLocalToken () {
        if(!!localStorage.getItem("cnode_accesstoken")) {
            return {
                user_accessToken: localStorage.getItem("cnode_accesstoken"),
                user_avatar: localStorage.getItem("cnode_avatar"),
                user_id: localStorage.getItem("cnode_id"),
                user_name: localStorage.getItem("cnode_name")
            }
        }
        return false;
    },
    setLocalToken (userInfo) {
        localStorage.setItem("cnode_accesstoken", userInfo.accesstoken);
        localStorage.setItem("cnode_avatar", userInfo.avatar);
        localStorage.setItem("cnode_id", userInfo.id);
        localStorage.setItem("cnode_name", userInfo.name);
    },
    delLocalToken () {
        localStorage.removeItem("cnode_accesstoken");
        localStorage.removeItem("cnode_avatar");
        localStorage.removeItem("cnode_id");
        localStorage.removeItem("cnode_name");
    },
    authToken(id) {
        return new Promise((resolve, reject) => {
            axios.post('https://cnodejs.org/api/v1/accesstoken?accesstoken=' + id)
            .then((response) => {
                resolve({
                    status: "success",
                    data: response.data
                });
            })
            .catch((error) => {
                resolve({
                    status: "fail",
                    data: error
                });
            });
        });
    }
}
export default authToken;