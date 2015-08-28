Projects = new Mongo.Collection('projects');
Tickets = new Mongo.Collection('tickets');


/*

 Counters are used to make ticket-ids in an auto_increment fashion
 http://docs.mongodb.org/v3.0/tutorial/create-an-auto-incrementing-field/#auto-increment-counters-collection

*/
Counters = new Mongo.Collection('counters');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (!Counters.findOne({ _id: 'ticketId' })) {
            Counters.insert({
                _id: 'ticketId',
                seq: 0
            });
        }
    });
}

getNextTicketId = function () {
    var ret = Counters.findAndModify(
        {
            query: { _id: 'ticketId' },
            update: { $inc: { seq: 1 } },
            new: true
        }
    );

    return ret.seq;
};
