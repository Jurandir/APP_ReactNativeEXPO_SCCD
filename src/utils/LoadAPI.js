import { post, get } from 'axios'

async function LoadAPI(method, endpoint, server, params) {

    const config = {
        headers: { "Content-Type": 'application/json' }
    }
    let url = server + endpoint

    try {
        if (method == 'POST') {
            ret = await post(url, params, config)
        } else {
            ret = await get(url, { params }, config)
        }
        dados                = ret.data
        dados.success        = ret.data.auth || false
        dados.message        = dados.success===true ? 'Success. OK.' : 'Falha na autenticação!!!'
        dados.isErr          = false
        dados.isAxiosError   = false
        return dados

    } catch (err) {
        dados = { success: false, message: 'ERRO', url: url, err, Err: true, isAxiosError: true }
        if (err.message) {
            dados.message  = err.message
        }
        return dados
    }
}

export default LoadAPI
