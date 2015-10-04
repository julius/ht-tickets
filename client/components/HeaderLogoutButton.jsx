HeaderLogoutButton = React.createClass({
    displayName:'HeaderLogoutButton',
    mixins: [ReactMeteorMixin],

    getMeteorState: function() {
        return {
            user: Meteor.user(),
        };
    },

    handleLogout: function (ev) {
        ev.preventDefault();

        Meteor.logout(function (err) {
            if (err) {
                alert('Logout failed!');
                return;
            }

            console.log('Logout success')
        });
    },

    // from: https://github.com/meteor/meteor/blob/devel/packages/accounts-ui-unstyled/login_buttons.js
    getDisplayName: function () {
        var user = this.state.user;
        if (!user)
            return '';

        if (user.profile && user.profile.name)
            return user.profile.name;
        if (user.username)
            return user.username;
        if (user.emails && user.emails[0] && user.emails[0].address)
            return user.emails[0].address;

        return '';
    },

    render: function () {
        if (!this.state.user) {
            return null;
        }

        var displayName = this.getDisplayName();

        return (
            <div className="HeaderLogoutButton">
                {displayName} | <a href='#' onClick={this.handleLogout}>Logout</a>
            </div>
        );
    }
});