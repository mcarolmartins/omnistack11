const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');
describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
 
    afterAll( async () => {
       await connection.destroy();
    });

    it('should be able to create new ong', async () => {
    const response = await request(app).post('/ongs').send( { 
        name: "APAI",
        email: "apai@contato.com",
        whatsapp: "5534984385756",
        city: "Ituiutaba",
        uf: "MG"
     });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

    });
})