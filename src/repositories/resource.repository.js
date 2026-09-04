const Resource = require('../models/resource.model');

class ResourceRepository {
    async findAll() {
        return await Resource.find();
    }

    async insertMany(resources) {
        return await Resource.insertMany(resources);
    }
    
    async updateLegacyLinks(title, oldLink, newLink) {
        return await Resource.updateMany(
            { title, link: oldLink },
            { $set: { link: newLink } }
        );
    }
}

module.exports = new ResourceRepository();
