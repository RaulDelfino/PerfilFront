
export function loginAction(token){
    return {type:"LOGIN", payload: token}
}
export function logoutAction(){
    return {type:"LOGOUT"}
}
