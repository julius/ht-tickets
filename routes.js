Router.configure({
  layoutTemplate: 'Layout'
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('Login');
  } else {
    this.next();
  }
});

Router.route('/', function () {
  this.redirect('/projects');
});

Router.route('/projects', function () {
  this.render('ProjectList');
});

Router.route('/project/:_id', function () {
  this.render('Project', {
    data: { projectId: this.params._id }
  });
});

Router.route('/ticket/:ticketId', function () {
  var ticketId = parseInt(this.params.ticketId,10);

  this.render('Ticket', {
    data: function () {
      return {
        ticket: Tickets.findOne({ticketId: ticketId}),
      }
    },
  });
});
