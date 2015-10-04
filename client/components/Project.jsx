var { Link } = ReactRouter;

Project = React.createClass({
    displayName:'Project',
    mixins: [ReactMeteorMixin],

    componentWillMount: function () {
        console.log("componentWillMount");

    },

    startMeteorSubscriptions: function () {
        console.log("startMeteorSubscriptions");
        //Meteor.subscribe('projects');
        //Meteor.subscribe('tickets-of-project', this.props.params.projectId);
    },

    getMeteorState: function() {
        console.log("getMeteorState");
        return {
            tickets: Tickets.find(),
            project: Projects.findOne({ _id: this.props.params.projectId }),
        };
    },

    handleTicketAdd: function (event) {
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
        console.log('Generated Ticket ID:', ticket.ticketId);

        Tickets.insert(ticket);
    },

    cssClassForPriority: function (priority) {
        if (priority == 'High') return 'warning';
        if (priority == 'Very High') return 'danger';
        return '';
    },

    render: function () {
        if (!this.state.project) {
            console.error('FUCK');
            return null;
        }

        var tickets = this.state.tickets.map( (ticket) => (
            <tr className={this.cssClassForPriority(ticket.priority)} key={"ticket" + ticket._id}>
                <td><Link to={"/ticket/" + ticket.ticketId}>#{ticket.ticketId}</Link></td>
                <td><Link to={"/ticket/" + ticket.ticketId}>{ticket.title}</Link></td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
            </tr>
        ));

        var project = this.state.project;

        return (
            <div className="Project">
                <h1><Link to="/projects">Projects</Link> / {project.title}</h1>

                <table className="table table-striped tickets">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ticket</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tickets}
                    </tbody>
                </table>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="panel-title">Create New Ticket</div>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleTicketAdd}>
                            <input type="hidden" name="projectId" value={project._id} />
                            <div className="form-group">
                                <label htmlFor="ticketAdd-title">Title</label>
                                <input type="text" name="title" id="ticketAdd-title" placeholder="Ticket title" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketAdd-status">Status</label>
                                <select name="status" id="ticketAdd-status" className="form-control">
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketAdd-priority">Priority</label>
                                <select name="priority" id="ticketAdd-priority" className="form-control" defaultValue="Normal">
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="High">High</option>
                                    <option value="Very High">Very High</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-default">Create New Ticket</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    },
});