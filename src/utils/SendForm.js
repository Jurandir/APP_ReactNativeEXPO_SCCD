import axios from 'axios'

async function SendForm(method, url, bodyFormData, file, token ) {
    let headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }

    axios({
        method: method,
        url: url,
        data: bodyFormData,
        headers: headers
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        }
    )
}

export default SendForm

