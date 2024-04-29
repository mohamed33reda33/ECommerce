class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    filter() {
        const queryStringObj = { ...this.queryString };
        const excludesFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludesFields.forEach((field) => delete queryStringObj[field]);

        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createAt");
        }
        return this;
    }

    fieldsLimit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select(-"__v");
        }
        return this;
    }

    search(modelName) {
        if (this.queryString.keyword) {
            let query = {};
            if (modelName === "products") {
                query.$or = [
                    { title: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } },
                ];
            } else {
                query = { name: { $regex: this.queryString.keyword, $options: 'i' } };

            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }
    pagination() {
        const page = this.queryString.page * 1 || 1;   // ضربت في واحد عشان احول الاسترينج الى رقم
        const limit = this.queryString.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeatures;