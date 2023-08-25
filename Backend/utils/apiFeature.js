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
        }:{

        };

        console.log(keyword);

        this.query = this.query.find({...keyword});

        return this;

    }

    filter(){
        const queryCopy = {...this.queryStr};
        console.log(queryCopy);
        // removing fields for category

        const removeFieds = ["limit","keyword","page"];

        removeFieds.forEach(key => delete queryCopy[key]);
        console.log(queryCopy);
    }
}

module.exports = ApiFeatures;