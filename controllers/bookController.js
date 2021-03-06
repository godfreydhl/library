var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookInstance');

var async = require('async');

exports.index = function(req, res){
    async.parallel({
         book_count:function(callback){
            Book.countDocuments({}, callback);
         },
         book_instance_count: function(callback){
             BookInstance.countDocuments({}, callback)
         },
         book_instance_available_count:function(callback){
             BookInstance.countDocuments({staus:'Available'}, callback);
         }, 
         author_count: function(callback){
             Author.countDocuments({}, callback);
         },
         genre_count: function(callback){
             Genre.countDocuments({}, callback);

         }
        }, function(err, results){
            try {
                res.render('index', {title: 'Local Library Home', error: err, data:results});
            } catch (err) {
                res.send('Error')
            }
            

        });
} 

exports.book_list = function(req, res){
    Book.find({}, 'title author').populate('author')
        .exec(function(err, list_books){
        if(err){return next(err);}
        res.render('book_list', {title: 'Book List', book_list:list_books});
    });
}

exports.book_detail = function(req, res){
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
}

exports.book_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: Book create GET');
}

exports.book_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: Book create POST');
}

exports.book_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: Book delete GET');
}

exports.book_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: Book DELETE POST');
}

exports.book_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: Book update get');
}

exports.book_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: Book update POST');
}