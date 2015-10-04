/*
 * TODO: Implement a more complete user system. Reference: http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor
 */


Login = React.createClass({
    displayName:'Login',

    handleLogin: function (ev) {
        ev.preventDefault();

        var email = this.refs.loginEmail.getDOMNode().value;
        var password = this.refs.loginPassword.getDOMNode().value;

        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                alert('Incorrect Login');
                return;
            }

            console.log('Login success');
        });
    },

    handleRegister: function (ev) {
        ev.preventDefault();

        var email = this.refs.registerEmail.getDOMNode().value;
        var password = this.refs.registerPassword.getDOMNode().value;
        var password2 = this.refs.registerPassword2.getDOMNode().value;

        if (email.length === 0) {
            alert('Enter email');
            return;
        }

        if (password.length === 0) {
            alert('Enter password');
            return;
        }

        if (password !== password2) {
            alert('Passwords repeated incorrectly!');
            return;
        }

        Accounts.createUser({email: email, password: password}, function (err) {
            if (err) {
                alert('Signup failed');
                return;
            }

            console.log('Signup success');
        });
    },

    render: function () {
        return (
            <div>
                <h1>Welcome to #tickets</h1>
                <p className="lead">To use #tickets, please sign in.</p>

                <div className="row">
                    <div className="col-md-6">
                        <h2>Login</h2>
                        <form onSubmit={this.handleLogin}>
                            <div className="form-group">
                                <label for="loginEmail">Email</label>
                                <input type="email" ref="loginEmail" id="loginEmail" placeholder="Email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label for="loginPassword">Password</label>
                                <input type="password" ref="loginPassword" id="loginPassword" placeholder="Password" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-default">Login</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h2>Register</h2>
                        <form onSubmit={this.handleRegister}>
                            <div className="form-group">
                                <label for="registerEmail">Email</label>
                                <input type="email" ref="registerEmail" id="registerEmail" placeholder="Email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label for="registerPassword">Password</label>
                                <input type="password" ref="registerPassword" id="registerPassword" placeholder="Password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label for="registerPassword2">Password</label>
                                <input type="password" ref="registerPassword2" id="registerPassword2" placeholder="Password repeat" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-default">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});