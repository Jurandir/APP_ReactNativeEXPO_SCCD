import CheckAD from './CheckAD'
import { setData } from '../utils/dataStorage';
import { Buffer } from "buffer"

export default async function CheckUser(user, pwd) {
    const cliente = '00000000000000';
    let ret = { success: false, message: '' }
    let password = Buffer.from(`"${pwd}"`).toString("base64")

    if (!user) {
        ret = { success: false, err: true, message: 'Campo "Usuário local" obrigatorio para autenticação !!!!' }
        return ret;
    } else {
        await CheckAD(cliente, user, password).then((credencial) => {
            let Err = credencial.Err || false;
            if (Err) {
                ret = {success: false, err: true, message: 'Credenciais fornecidas não são válidas !!!' };
            } else {
                setData('@Credencial', credencial);
                ret = { success: true, err: true, message: 'Success. OK.' };
            }

        }).catch((err) => {
            console.log('ERRO: (CheckUser)', err);
            ret = { success: false, err: true, message: err };
        });

        return ret;
    }
}
