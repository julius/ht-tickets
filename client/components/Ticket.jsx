var { Link } = ReactRouter;

Ticket = React.createClass({
    displayName:'Ticket',
    mixins: [ReactMeteorMixin],

    getMeteorState: function() {
        var ticketId = parseInt(this.props.params.ticketId, 10);
        var ticket = Tickets.findOne({ticketId: ticketId});

        if (!ticket) return {};

        return {
            ticket: ticket,
            project: Projects.findOne({ _id: ticket.projectId }),
        };
    },

    handleUpdateTextChange: function (event) {
        var text = event.target.value;
        Session.set('TicketUpdateRawText', text);

    },

    handleTicketUpdateAdd: function (event) {
        event.preventDefault();

        // Build the update
        var update = {
            userId: Meteor.userId(),
            text: event.target.text.value,
            changes: [],
        };

        var status = event.target.status.value;
        var priority = event.target.priority.value;

        if (status !== this.state.ticket.status) {
            update.changes.push({ field: 'status', oldValue: this.state.ticket.status, newValue: status });
        }
        if (priority !== this.state.ticket.priority) {
            update.changes.push({ field: 'priority', oldValue: this.state.ticket.priority, newValue: priority });
        }

        // Add Ticket-Update to the ticket
        var ticketUpdates = this.state.ticket.updates || [];
        ticketUpdates.push(update);

        Tickets.update({
            _id: this.state.ticket._id,
        }, {
            $set: {
                updates: ticketUpdates,
                status: status,
                priority: priority,
            },
        });

        event.target.text.value = "";
    },

    cssClassForPriority: function (priority) {
        if (priority == 'High') return 'warning';
        if (priority == 'Very High') return 'danger';
        return '';
    },

    // TODO: Use implementation more like HeaderLogoutButton.getDisplayName
    getUserName: function (userId) {
        var user = Meteor.users.findOne({ _id: userId });
        if (!user || !user.emails || user.emails.length == 0) return null;

        return user.emails[0]['address'];
    },

    render: function () {
        // TODO: remove the reason for this situation happening in the first place !
        console.log(this.state.ticket);
        if (!this.state.ticket) {
            return null;
        }

        var updates = (this.state.ticket.updates || []).map( (update, idx) => {
            var changes = update.changes.map( (change, idx) => (
                <li key={'change'+idx}><b>{change.field}</b> was changed from <b>{change.oldValue}</b> to <b>{change.newValue}</b></li>
            ));

            return (
                <div className="panel panel-default" key={'update'+idx}>
                    <div className="panel-heading">
                        <div className="panel-title">{this.getUserName(update.userId)}</div>
                    </div>
                    <div className="panel-body">
                        <ul className="changes">
                            {changes}
                        </ul>
                        <p className="message">
                            {update.text}
                        </p>
                    </div>
                </div>
            )
        });

        var project = this.state.project;
        var ticket = this.state.ticket;

        return (
            <div className="Ticket">
                <h1><Link to="/projects">Projects</Link> / <Link to={"/project/" + project._id}>{project.title}</Link> / #{ticket.ticketId} {ticket.title}</h1>

                <div className="ticketBaseInfo">
                    {/* TODO */}
                </div>

                <div className="ticketUpdates">
                    {updates}
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="panel-title">Update Ticket</div>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleTicketUpdateAdd}>
                            <input type="hidden" name="ticketId" value="{ticket._id}" />
                            <div className="form-group">
                                <label htmlFor="ticketUpdateAdd-status">Status</label>
                                <select name="status" id="ticketUpdateAdd-status" className="form-control" defaultValue={ticket.status}>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketUpdateAdd-priority">Priority</label>
                                <select name="priority" id="ticketUpdateAdd-priority" className="form-control" defaultValue={ticket.priority}>
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="High">High</option>
                                    <option value="Very High">Very High</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketUpdateAdd-text">Text</label>
                                <textarea name="text" id="ticketUpdateAdd-text" placeholder="Text (use Markdown)" className="form-control"></textarea>
                                <br/>
                                <div className="previewText">
                                    {/* TODO */}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-default">Update Ticket</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    },
});