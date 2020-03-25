const connection = require('../database/connections');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.autorizacao;
        
        const casos = await connection('casos')
        .where('ong_id', ong_id).select('*');

        return response.json(casos);
    }
}