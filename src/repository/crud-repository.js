import Tweet from "../models/tweet.js";

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            console.log("Creating document with data:", data);
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.error("Error in create method:", error);
            throw error;
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            if (!result) {
                throw new Error("Document not found");
            }
            return result;
        } catch (error) {
            console.error("Error in destroy method:", error);
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            if (!result) {
                throw new Error("Document not found");
            }
            return result;
        } catch (error) {
            console.error("Error in get method:", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.error("Error in getAll method:", error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!result) {
                throw new Error("Document not found");
            }
            return result;
        } catch (error) {
            console.error("Error in update method:", error);
            throw error;
        }
    }
}

export default CrudRepository;
