import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from './actions/UserAction';
import PropTypes from 'prop-types';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: '',
            pwd: '',
            flag: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentWillMount(){
        localStorage.setItem('isUser', false)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var email = this.state.email;
        var password = this.state.pwd;

        this.props.loginAction(email, password, () => {
            this.setState({
                flag: true,
                email: '',
                pwd: ''
            })
        });

    }
    render() {

        if (localStorage.getItem('isUser') === "false") {
            return (
                <form method="post" class="sign-up-form" id="frmLogin" onSubmit={this.handleSubmit}>
                    <div class="card" style={{ marginTop: '10%', width: '50%', marginLeft: '23%' }}>
                        <div class="card-body">

                            <div class="container">
                                <label for="email">Email address:</label>
                                <input type="email" class="form-control" required name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                                <label for="pwd">Password:</label>
                                <input type="password" class="form-control" required name="pwd" id="pwd" value={this.state.pwd} onChange={this.handleChange} />
                                <button type="submit" class="btn btn-primary" style={{ marginTop: '10px', float: 'right' }}>Submit</button>
                            </div>

                        </div>
                    </div>
                </form>
            );
        }
        if (localStorage.getItem('isUser') === "true") {
            return (
                <Redirect to='/blog' />
            );
        }
    }
}
Login.propTypes = {
    ldata: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    ldata: state.user.logindata
})
export default connect(mapStateToProps, { loginAction })(Login);