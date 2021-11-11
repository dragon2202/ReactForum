//Checks if all form inputs are not blank
import Message from 'antd/lib/message'
export function validateForm(object){
    var count = 0
    for (const property in object) {
        if(object[property] === undefined || object[property] === "") {
            Message.warning('Please fill out ' + `${property}`, 10)
            count++
        }
    }
    if(count > 0) { 
        return false
    } else {
        return true
    }
}