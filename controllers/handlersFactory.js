const asyncWrapper = require("../middlewares/asyncWrapper");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");


exports.deleteOne = (Model) => asyncWrapper(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.ID);
    if (!document) {
        console.log(231324)
        return next(new ApiError(`not find any document`, 404));
    }
    res.status(204).json({ msg: `delete ${Model} ` });
})

exports.updateOne = (Model) => asyncWrapper(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
        req.params.ID,
        req.body,
        { new: true }
    );
    if (!document) {
        return next(new ApiError("not find any document", 404));
    }
    res.status(200).json({ data: document });
})

exports.create = (Model) => asyncWrapper(async (req, res) => {
    const newModel = new Model(req.body);
    await newModel.save();
    res.status(201).json({ data: newModel });
});

exports.getOne = (Model) => asyncWrapper(async (req, res, next) => {
    const document = await Model.findById(req.params.ID)
    if (!document) {
        return next(new ApiError("not find any document", 404));
    }
    res.status(200).json({ data: document });

})

exports.getAll = (Model, modelName = "") => asyncWrapper(async (req, res, next) => {
    let filterObj = {}
    if (req.params.ID) filterObj = { category: req.params.ID };
    const apiFeatures = new ApiFeatures(Model.find(filterObj), req.query)
        .pagination()
        .sort()
        .search(modelName)
        .filter()
        .fieldsLimit();
    const documents = await apiFeatures.mongooseQuery;
    if (!documents) {
        return next(new ApiError("not find any document", 404));
    }

    res.status(200).json({ result: documents.length, data: documents });

})

asyncWrapper(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(Category.find(), req.query)
        .pagination()
        .sort()
        .search("category")
        .filter()
        .fieldsLimit();
    const categorys = await apiFeatures.mongooseQuery;
    if (!categorys) {
        return next(new ApiError("not find any category", 200));
    }

    res.status(200).json({ result: categorys.length, data: categorys });

})