import jwt from 'jsonwebtoken';

const segredo = 'Senh4';
const tempoExpiracao = '1h';

export const verificarToken = (req, res, next) => {
    let token = req.headers['authorization'];
    console.log('token c/b: ', token)

    // teste no insomnia "Bearer"
    if (token && token.startsWith('Bearer ')) {
        // Removendo "Bearer " do token
        token = token.slice(7);
    }
    console.log('token s/b: ', token)

    if (!token) {
        return res.status(403).json({ auth: false, message: 'Token não fornecido.' });
    }

    jwt.verify(token, segredo, (err, infoToken) => {
        if (err) {
            console.log('segredo: ', segredo)
            console.error('Erro ao autenticar o token:', err.message);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ auth: false, message: 'Token expirado.' });
            }
            return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
        }
        console.log('segredo s/if: ', segredo)
        console.log('infoToken: ', infoToken)


        /* Adicionando o tipo de usuário ao objeto
        const infoTokenTipo = {
            ...infoToken,
            tipo_usuario: infoToken.tipo_usuario
        };
        console.log('infoTokenT: ', infoTokenTipo);*/


        // Se o token for válido, armazene o ID do usuário.
        req.userData = infoToken; //infoTokenTipo
        console.log('Conteúdo de req.userData:', req.userData);
        next();
    });
};
