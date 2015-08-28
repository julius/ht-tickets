
if (Meteor.isClient) {

    Template.Ticket.helpers({

        project: function () {
            if (!this.ticket) return null;
            return Projects.findOne({ _id: this.ticket.projectId });
        },

        userName: function (userId) {
            var user = Meteor.users.findOne({ _id: userId });
            if (!user || !user.emails || user.emails.length == 0) return null;

            return user.emails[0]['address'];
        },

        updatePreviewText: function () {
            return Session.get('TicketUpdateRawText');
        },
    });

    Template.Ticket.onRendered(function () {
        Session.set('TicketUpdateRawText', '');

        if (!this.ticket) return;
        console.log(this.ticket);
    });

    Template.Ticket.events({

        'keyup form#ticketUpdateAdd textarea': function (event, template) {
            var text = event.target.value;
            Session.set('TicketUpdateRawText', text);
        },

        'submit form#ticketUpdateAdd': function (event, template) {
            event.preventDefault();

            // Build the update
            var update = {
                userId: Meteor.userId(),
                text: event.target.text.value,
                changes: [],
            };

            var status = event.target.status.value;
            var priority = event.target.priority.value;

            if (status !== this.ticket.status) {
                update.changes.push({ field: 'status', oldValue: this.ticket.status, newValue: status });
            }
            if (priority !== this.ticket.priority) {
                update.changes.push({ field: 'priority', oldValue: this.ticket.priority, newValue: priority });
            }

            // Add Ticket-Update to the ticket
            var ticketUpdates = this.ticket.updates || [];
            ticketUpdates.push(update);

            Tickets.update({
                _id: this.ticket._id,
            }, {
                $set: {
                    updates: ticketUpdates,
                    status: status,
                    priority: priority,
                },
            });

            event.target.text.value = "";
        },

    });

}