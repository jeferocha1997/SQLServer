

export const verificarTipoUsuario = (tipo) => {
    return (req, res, next) => {

        console.log('req.tipo: ', req.userData.tipo_usuario);

        if (!req.userData || req.userData.tipo_usuario !== tipo) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }
        next();
    };
};
