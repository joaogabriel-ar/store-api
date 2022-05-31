import clientService from "../services/client.service.js"

async function createClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Name, CPF, Phone, Email and Address are obligated")
        }
        client = await clientService.createClient(client)
        res.send(client)
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }

}

async function getClients(req, res, next) {
    try {
        res.send(await clientService.getClients());
        logger.info("GET /client")
    } catch (err) {
        next(err);
    }
}

async function getClient(req, res, next) {
    try {
        res.send(await clientService.getClient(req.params.id));
        logger.info("GET /client");
    } catch (err) {
        next(err);
    }
}

async function deleteClient(req, res, next) {
    try {
        await clientService.deleteClient(req.params.id);
        res.end();
        logger.info("DELETE /client");

    } catch (err) {
        next(err);
    }
}

async function updateClient(req, res, next) {
    
    try {
        let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address || !client.client_id) {
            throw new Error("Client ID, Name, CPF, Phone, Email and Address are obligated")
        }
        client = await clientService.updateClient(client);
        res.send(client);
        logger.info(`PUT /client - ${JSON.stringify(client)}`);
        
    } catch(err){
        next(err);
    }
}

export default {
    createClient,
    getClient,
    deleteClient,
    updateClient,
    getClients
}