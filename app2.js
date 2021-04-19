function validate(){
    let res = ($("input:empty").length === 0)
    if (res !== true){
        alert("error")
        return false
    }
}