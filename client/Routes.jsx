var { Router, Route, Redirect } = ReactRouter;

Routes = React.createClass({
    displayName:'Routes',
    mixins: [ReactMeteorMixin],

    getMeteorState: function() {
        return {
            userId: Meteor.userId(),
        };
    },

    render: function () {
        if (!this.state.userId) {
            return (<App><Login /></App>);
        }

        return (
            <Router history={ReactRouter.lib.BrowserHistory.history}>
                <Route component={App}>
                    <Route path="/projects" component={ProjectList}/>
                    <Route path="/project/:projectId" component={Project}/>
                    <Route path="/ticket/:ticketId" component={Ticket}/>

                    <Redirect from="/" to="/projects" />
                </Route>
            </Router>
        );
    },
});