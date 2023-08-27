class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.q ? {
            name : {
                $regex : this.queryStr.q,
               $options : "i"
            }
        }:{}
        this.query = this.query.find({...keyword});

        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr};
        // removing fields for category

        const removeFields = ["limit","keyword","q","page"];

        removeFields.forEach(key => delete queryCopy[key]);

        // filter for price and rating

        // console.log(queryCopy);

        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // product.find() == this.query

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        // 10 * 2-1   => 10 * 1 = 10 skipped start with 11 number

        const skip = resultPerPage * (currentPage - 1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures