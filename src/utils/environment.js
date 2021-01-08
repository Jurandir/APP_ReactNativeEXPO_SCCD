const API_SERVER = '192.168.1.138' //'192.168.0.31'  // ''
const API_PORTA = '5000'

const environment = {
    API_AD: `http://${API_SERVER}:${API_PORTA}/api/loginad`,
    API_CARTAFRETE: `http://${API_SERVER}:${API_PORTA}/api/cartafrete`
}

export default environment