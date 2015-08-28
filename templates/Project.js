
if (Meteor.isClient) {

    Template.Project.helpers({

        project: function () {
            return Projects.findOne({ _id: this.projectId });
        },

        tickets: function () {
            return Tickets.find({ projectId: this.projectId });
        },

        cssClassForPriority: function (priority) {
            if (priority == 'High') return 'warning';
            if (priority == 'Very High') return 'danger';
            return '';
        },

    });

    Template.Project.events({

        'submit form#ticketAdd': function (event, template) {
            event.preventDefault();

            var ticket = {
                projectId: event.target.projectId.value,
                title: event.target.title.value,
                status: event.target.status.value,
                priority: event.target.priority.value,
            };

            if (!ticket.title || ticket.title == "") {
                return;
            }

            event.target.title.value = "";

            ticket.ticketId = getNextTicketId();
            console.log(ticket.ticketId);
            Tickets.insert(ticket);
        },

    });

}