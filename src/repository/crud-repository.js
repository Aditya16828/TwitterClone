class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            console.log("Hitting Repository");
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            error = { ...error, fromLayer3: "Repository" };
            console.log(error);
            throw error;
        }
    }

    async read(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            error = { ...error, fromLayer3: "Repository" };
            console.log(error);
            throw error;
        }
    }

    async readAll(offset, limit) {
        try {
            const response = await this.model.find().skip(offset).limit(limit);
            return response;
        } catch (error) {
            error = { ...error, fromLayer3: "Repository" };
            console.log(error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, {new: true});
            return response;
        } catch (error) {
            error = { ...error, fromLayer3: "Repository" };
            console.log(error);
            throw error;
        }
    }

    async remove(id) {
        try {
            const tweet = await this.model.findByIdAndRemove(id);
            return tweet;
        } catch (error) {
            error = { ...error, fromLayer3: "Repository" };
            console.log(error);
            throw error;
        }
    }
}

module.exports = CrudRepository;
