import React from 'react';
import $ from 'jquery';
import axios from 'axios';
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: '',
            flag: false,
            redirect: false
        };

        this.adduser = this.adduser.bind(this);
        this.btntoggle = this.btntoggle.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    adduser = (e) => {
        // User Data Insert And Update.    
        e.preventDefault();
        var fName = this.state.firstName;
        var lName = this.state.lastName;
        var email = this.state.email;
        var password = this.state.password;
        var repassword = this.state.repassword;

        if (password !== repassword) {
            $("#message").css("color", "red");
            $('#message').text('Password Do Not Match');
            setTimeout(function () {
                $('#message').text('');
            }, 2000);
            e.preventDefault();
            return false;
        }
        axios.post("/InsertUser", { fName, lName, email, password })
            .then(res => {
                var temp = res.data[0].message;
                if (res.data[0].userexist === 'userexist') {
                    $("#message").css("color", "red");
                    $('#message').text(temp);
                    setTimeout(function () {
                        $('#message').text('');
                    }, 2000);
                } else {                   
                    $("#message").css("color", "red");
                    $('#message').text(temp);
                    setTimeout(function () {
                        $('#message').text('');
                        $('#myModal').hide();
                    }, 1000);
                    this.setState({
                        flag: false,
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        repassword: ''
                    })
                }
            }).catch(err => {
                console.log(err);
                throw new Error('Error in Add User Data');
            });

    }
    btntoggle() {
        // Popup Model Open And Close 

        var flag = this.state.flag;
        if (flag === false) {
            $('#myModal').show();
            this.setState({
                flag: true
            })
        } else {
            $('#myModal').hide();
            this.setState({
                flag: false,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repassword: '',
                userId: ''
            })
        }

    }
    popupmodel = () => {
        return (
            <div id="myModal" class="modal" role="dialog">
                <div class="modal-dialog">

                    <div class="modal-content">
                        <div class="modal-header">

                            <h4 class="modal-title">Add Users</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={this.btntoggle}>&times;</button>
                        </div>
                        <form method="post" class="sign-up-form" id="frmLogin" onSubmit={this.adduser}>
                            <div class="modal-body">

                                <div class="form-group">
                                    <label for="sel1">First Name: </label>
                                    <input className="form-control col-sm-12" type="text" onChange={this.handleChange} name="firstName" required value={this.state.firstName} />
                                </div>

                                <div class="form-group">
                                    <label for="sel2">Last Name: </label>
                                    <input type="text" className="form-control" required onChange={this.handleChange} name="lastName" value={this.state.lastName} />
                                </div>

                                <div class="form-group">
                                    <label for="sel3">Email: </label>
                                    <input type="text" className="form-control" onChange={this.handleChange} name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="xyz@gmail.com" value={this.state.email} />
                                </div>
                                <div class="form-group">
                                    <label for="sel4">Password:</label>
                                    <input type="password" class="form-control" required name="password" id="pwd" value={this.state.password} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label for="sel5" >Confirm Password:</label>
                                    <input type="password" class="form-control" required name="repassword" id="pwd" value={this.state.repassword} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <label id="message" style={{ marginRight: '25%' }}></label>
                                <button type="submit" id="btnSubmit" class="btn btn-primary" data-dismiss="modal" >Save</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        );
    }
    logout = () => {
        localStorage.setItem('isUser', false);
        sessionStorage.clear();
        window.location.href = '/';
    }

    render() {

        let button;
        if (localStorage.getItem('isUser') === "false") {
            button = <button type="submit" class="btn btn-primary" onClick={this.btntoggle} style={{ marginLeft: '85%' }}>Sign Up</button>;
        } else {
            button = <button type="submit" class="btn btn-primary" style={{ marginLeft: '85%' }} onClick={this.logout}>Logout</button>;
        }

        return (
            <React.Fragment>
                <nav class="navbar navbar-expand-sm bg-light navbar-light">
                    {button}
                </nav>
                {this.popupmodel()}
            </React.Fragment>
        );

    }
}

export default Header;