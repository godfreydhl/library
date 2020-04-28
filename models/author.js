var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
    firste_name:{type:String, required:true, max:100},
    family_name:{type:String, required:true, max:100},
    date_of_birth:{type:Date},
    date_of_death:{type:Date},
});

AuthorSchema.virtual('name').get(()=>{
    var fullname= '';
    if(this.first_name && this.family_name){
        fullname = this.family_name + ', '+ this.first_name
    }
    if (!this.first_name|| !this.family_name){
        fullname = '';
    }
    return fullname;
});

AuthorSchema.virtual('lifespan').get(()=>{
    return (this.date_of_death.getYear()-this.date_of_birth.getYear())
});

AuthorSchema.virtual('url').get(()=>{
    return '/catalog/author/' + this._id
});

module.exports = mongoose.model('Author', AuthorSchema);