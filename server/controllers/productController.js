const Product = require('../models/product');
const Brand = require('../models/brand');

class ProductController {
    static findAll(req,res,next){
        Product.find().sort([['brand','ascending']])
            .then(products=>{
                res.status(200).json(products);
            })
            .catch(err=>{
                next(err);
            })
    }
    static findByName(req,res,next){
        Product.find({
            brand: req.params.name
        })
            .then(products=>{
                res.status(200).json(products);
            })
            .catch(next)
    }
    static findIdProduct(req,res,next){
        Product.findById({
            _id: req.params.id
        })
            .then(product=>{
                res.status(200).json(product)
            })
            .catch(next)
    }
    static create(req,res,next){
        let url = req.file.cloudStoragePublicUrl
        const {name,category,price,description,brand} = req.body;
        console.log(req.body);

        Product.create(
            {
                name,
                category,
                price,
                description,
                image: url,
                brand
            })
            .then(product=>{
                return Brand.findOneAndUpdate({
                    name : product.brand
                },{
                    $push: {ProductId : product._id}
                })
            })
            .then(_=>{
                res.status(201).json({msg:'sukses created'});
            })
            .catch(err=>{
                console.log(err)
                if(err.errmsg == `E11000 duplicate key error collection: e-commerce-test.products index: name_1 dup key: { : "${name}" }`){
                    next({status:403,msg:'nameUsed'})
                }else{
                    next(err)
                }
            })
    }
    static update(req,res,next){
        const id = req.params.id;
        const {name,category,stock,description,price} = req.body;
        Product.findByIdAndUpdate({
            _id: id
        },{
            name,category,stock,description,price
        })
            .then(_=>{
                res.status(201).json({msg: "Success Update"});
            })
            .catch(err=>{
                next(err);
            })
    }
    static delete(req,res,next){
        const brand = req.body.brand
        const id = req.params.id;
        Product.deleteOne({
            _id : id
        })
            .then(product=>{
                return Brand.deleteMany({ ProductId: id })
            })
            .then(success => {
              res.status(200).json({ msg: 'Success Delete' })
            })
            .catch(err=>{
                next(err)
            })
    }
}


module.exports = ProductController;