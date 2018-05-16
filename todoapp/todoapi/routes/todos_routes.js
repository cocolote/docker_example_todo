var mongoose = require('mongoose');
var Todo = mongoose.model('TodoModel');

const _getTodo = (todoId, cb) => {
  Todo.findById(todoId, (err, todo) => {
    if (!todo) {
      err = new Error('Todo not found');
      err.statusCode = 404;
    }
    if (err) { next(err); }
    cb(todo);
  });
};

module.exports = function(app) {
  // Todo Lists
  app.route('/todos')
     .get((req, res, next) => {
       Todo.find({}, (err, todos) => {
         if (err) { next(err); }
         res.json(todos);
       });
     })
     .post((req, res, next) => {
       let newList = new Todo(req.body);
       newList.save((err, todo) => {
         if (err) { next(err); }
         res.json(todo);
       });
     });

  app.route('/todos/:id')
     .get((req, res, next) => {
       Todo.findById(req.params.id, (err, todo) => {
         if (err) { next(err); }
         res.json(todo);
       });
     })
     .put((req, res, next) => {
       let options = {};
       if (req.body.title) {
         options.$set = { title: req.body.title };
       }
       Todo.findByIdAndUpdate(
         req.params.id,
         options,
         (err, todo) => {
           if (err) { next(err); }
           res.json(todo);
         }
       );
     })
     .delete((req, res, next) => {
       Todo.findByIdAndRemove(
         req.params.id,
         (err, todo) => {
           if (err) { next(err); }
           res.json(todo);
         }
       );
     });

  // Todo Tasks
  app.route('/todos/:todoId/tasks')
     .get((req, res, next) => {
       Todo.findById(req.params.todoId, (err, todo) => {
         if (!todo) {
           err = new Error('Todo not found');
           err.statusCode = 404;
         }
         if (err) { next(err); }
         res.json(todo.tasks);
       });
     })
     .post((req, res, next) => {
       let options = {};
       if (req.body.task) {
         options.$push = { tasks: { body: req.body.task } };
       }
       Todo.findByIdAndUpdate(req.params.todoId, options, (err, todo) => {
         if (!todo) {
           err = new Error('Todo not found');
           err.statusCode = 404;
         }
         if (err) { next(err); }
         res.json(todo);
       });
     });

  app.route('/todos/:todoId/tasks/:id')
     .get((req, res, next) => {
       _getTodo(req.params.todoId, (todo) => {
         let err;
         let task = todo.tasks.find(task => task._id == req.params.id);
         if (!task) { 
           err = new Error('Task not found');
           err.statusCode = 404;
         }
         if (err) { next(err); }
         res.json(task);
       });
     })
     .put((req, res, next) => {
       let options = {};
       if (req.body.completed) {
         options.$set = { "tasks.$.completed": req.body.completed };
       }
       if (req.body.taks) {
         options.$set = { "tasks.$.body": req.body.task };
       }
       console.log(req.params.todoId);
       _getTodo(req.params.todoId, (todo) => {
         let task = todo.tasks.id(req.params.id);
         Object.keys(req.body).forEach((key) => {
           task[key] = req.body[key];
         })
         todo.save(err => {
           if (err) { next(err); }
           res.json(task);
         });
       });
     })
     .delete((req, res, next) => {
       _getTodo(req.params.todoId, (todo) => {
         let err;
         let task = todo.tasks.id(req.params.id).remove();
         todo.save(err => {
           if (err) { next(err); }
           res.json(task);
         });
       });
     });
}
