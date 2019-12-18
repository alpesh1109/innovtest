import React from "react";
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getuserdata, searchuser } from './actions/UserAction.js';

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            firstName: '',
            lastName: '',
            email: '',
            role: '',
            status: '',
            pbtnname: 'Save',
            flag: false,
            fvalue: '',
            userId: ''
        };
        this.fetchData = this.fetchData.bind(this);
        this.adduser = this.adduser.bind(this);
        this.btntoggle = this.btntoggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteuser = this.deleteuser.bind(this);
        this.filterList = this.filterList.bind(this);
        this.edituser = this.edituser.bind(this);
        this.validateform = this.validateform.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    filterList(e) {
        // Search User By Text Value Pass As Parameter In Redux Action Method.
        var searchname = e.target.value;
        this.setState({
            fvalue: searchname
        })
        this.props.searchuser(searchname, () => {
        })
    }
    handleChange(e) {
       
        this.setState({ [e.target.name]: e.target.value });
    }

    edituser(uId) {

        //Get User Data By Id. Id Pass As Parameter.

        var url = "/GetUserById";
        axios.post(url, { uId })
            .then(res => {

                var data = res.data;
                $('#myModal').show();
               
                this.setState({
                    flag: true,
                    userId: data[0].uId,
                    firstName: data[0].uFirstName,
                    lastName: data[0].uLastName,
                    email: data[0].uEmail,
                    role: data[0].uRole,
                    status: data[0].uStatus
                })

            });
         
    }
    validateform = () => {

        var fName = this.state.firstName;
        var lName = this.state.lastName;
        var email = this.state.email;
        var role = this.state.role;
        var status = this.state.status;
        if (fName !== '' && lName !== '' && email !== '' && role !== '' && status !== '') {
            this.adduser();
        }
    }

    adduser() {
        // User Data Insert And Update.

        var fName = this.state.firstName;
        var lName = this.state.lastName;
        var email = this.state.email;
        var role = this.state.role;
        var status = this.state.status;
        var uId = this.state.userId;

        if (uId === '') {

            axios.post("/InsertUser", { fName, lName, email, role, status })
                .then(res => {

                    $('#myModal').hide();
                    this.setState({
                        flag: false,
                        firstName: '',
                        lastName: '',
                        email: '',
                        role: '',
                        status: ''
                    })
                    this.fetchData();
                    var temp = res.data[0].message;
                    $("#message").css("color", "blue");
                    $('#message').text(temp);
                    setTimeout(function () {
                        $('#message').text('');
                    }, 2000);
                });
        } else {

            axios.post("/EditUser", { uId, fName, lName, email, role, status })
                .then(res => {

                    $('#myModal').hide();

                    this.setState({
                        flag: false,
                        firstName: '',
                        lastName: '',
                        email: '',
                        role: '',
                        status: '',
                        userId: ''
                    })
                    this.fetchData();
                    var temp = res.data[0].message;
                    $("#message").css("color", "green");
                    $('#message').text(temp);
                    setTimeout(function () {
                        $('#message').text('');
                    }, 2000);
                });
        }
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
                role: '',
                status: '',
                userId: ''
            })
        }

    }
    fetchData() {
        // Get All User Data Using Redux Action Method.
        this.props.getuserdata(() => {

        })

    }

    deleteuser(id) {
        // Delete User. Id Pass as Parameter.
        var url = "/DeleteUser";
        axios.post(url, { id })
            .then(res => {
                this.fetchData();
                var temp = res.data[0].message;
                $("#message").css("color", "red");
                $('#message').text(temp);
                setTimeout(function () {
                    $('#message').text('');
                }, 2000);
            });

    }
    userdatatable = () => {
        const { userd } = this.props;
        var usertable;
        if (userd.length > 0) {
            usertable = userd.map((n, index) => {

                return (
                    <tbody>
                        <tr>
                            <td>{n.uName}</td>
                            <td>{n.uRole}</td>
                            <td>{n.uCreated}</td>
                            <td>{n.uStatus}</td>
                            <td>
                                <button type="button" class="btn btn-success" onClick={() => this.edituser(n.uId)} style={{ marginRight: '15px' }}>Edit</button>
                                <button type="button" class="btn btn-danger" onClick={() => this.deleteuser(n.uId)} >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                );
            })
        } else {
            usertable = (
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: 'center' }}>No Data Found</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>

            );
        }

        return usertable;
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

                        <div class="modal-body">

                            <div class="form-group">
                                <label for="sel1">First Name: </label>
                                <input className="form-control col-sm-12" type="text" onChange={this.handleChange} name="firstName" required value={this.state.firstName} />
                            </div>

                            <div class="form-group">
                                <label for="sel2">Last Name: </label>
                                <input type="text" className="form-control" onChange={this.handleChange} name="lastName" value={this.state.lastName} />
                            </div>

                            <div class="form-group">
                                <label for="sel4">Select Role:</label>
                                <select class="form-control" id="sel4" name="role" value={this.state.role} onChange={this.handleChange}>
                                    <option value="" disabled>Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Partner">Partner</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="sel3">Email: </label>
                                <input type="text" className="form-control" onChange={this.handleChange} name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="xyz@gmail.com" value={this.state.email} />
                            </div>
                            <div class="form-group">
                                <label for="sel5" >Select Status:</label>
                                <select class="form-control" id="sel5" onChange={this.handleChange} value={this.state.status} name="status">
                                    <option value="" disabled>Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => this.validateform()}>{this.state.pbtnname}</button>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
    render() {

        return (
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <h2>Users</h2>
                        <input type="text" className="form-control col-sm-2" placeholder="Search" style={{ paddingLeft: '10px', borderRadius: '10px 10px 10px 10px', float: 'right', marginRight: '10px' }} name="fvalue" onChange={this.filterList} value={this.state.fvalue} />
                        <div style={{ float: 'right', marginRight: '20px', marginBottom: '2%' }}><button type="button" class="btn btn-primary" onClick={this.btntoggle} data-toggle="modal" id="btnadd" data-target="#myModal">Add User</button></div>
                        <label id="message" ></label>
                        <div class="table-responsive" >
                            <table class="table table-hover">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Created</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                {this.userdatatable()}

                            </table>
                        </div>
                    </div>
                </div>
                {this.popupmodel()}
            </div>

        );
    }

}
User.propTypes = {
    userd: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    userd: state.user.userdata
})


export default connect(mapStateToProps, { getuserdata, searchuser })(User); 