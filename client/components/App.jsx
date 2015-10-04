App = React.createClass({
    displayName:'App',

    render: function () {
        return (
            <div className="container">
                <div className="row topBar">
                    <div className="col-xs-4">
                        <a href="/" className="logo">#tickets</a>
                    </div>
                    <div className="col-xs-8 profile">
                        <HeaderLogoutButton />
                    </div>
                </div>

                {this.props.children}
            </div>
        );
    }
});