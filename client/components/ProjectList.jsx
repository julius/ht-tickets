var { Link } = ReactRouter;

ProjectList = React.createClass({
    displayName:'ProjectList',
    mixins: [ReactMeteorMixin],

    getMeteorState: function() {
        return {
            projects: Projects.find().fetch(),
        };
    },

    handleProjectAdd: function (event) {
        event.preventDefault();

        var projectName = event.target.projectName.value;

        if (!projectName || projectName == "") {
            return;
        }

        event.target.projectName.value = "";
        Projects.insert({ title: projectName });
    },

    render: function () {

        var projects = this.state.projects.map( (project) => (
            <div className="panel panel-default" key={project._id}>
                <div className="panel-heading">
                    <div className="panel-title">{project.title}</div>
                </div>
                <div className="panel-body">
                    <Link to={"/project/" + project._id} className="btn btn-primary">Open Tickets</Link>
                </div>
            </div>
        ));

        return (
            <div className="ProjectList">
                <h1>Projects</h1>

                <div className="projects">
                    {projects}

                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="panel-title">Create new project</div>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.handleProjectAdd}>
                                <div className="form-group">
                                    <input type="text" name="projectName" placeholder="Project Name" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-default">Create New Project</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    },
});