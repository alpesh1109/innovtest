import React from "react";
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getuserdata } from './actions/UserAction.js';
import { Redirect } from 'react-router-dom';
class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: '',
            flag: false,
            userId: ''
        };
        this.fetchData = this.fetchData.bind(this);
        this.btntoggle = this.btntoggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.edituser = this.edituser.bind(this);
        this.editdata = this.editdata.bind(this);
    }

    componentDidMount() {
        this.fetchData();
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
                $('#myModaltwo').show();

                this.setState({
                    flag: true,
                    userId: data[0].uId,
                    status: data[0].uStatus
                })

            });

    }


    editdata() {
        // User Data Insert And Update.

        var status = this.state.status;
        var uId = this.state.userId;

        if (uId) {

            axios.post("/EditUser", { uId, status })
                .then(res => {
                    $('#myModaltwo').hide();

                    this.setState({
                        flag: false,
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
                }).catch(err => {
                    console.log(err);
                    throw new Error('Error in Edit User Data');
                });
        }
    }
    btntoggle() {
        // Popup Model Open And Close 

        var flag = this.state.flag;
        if (flag === false) {
            $('#myModaltwo').show();
            this.setState({
                flag: true
            })
        } else {
            $('#myModaltwo').hide();
            this.setState({
                flag: false,
                title: '',
                discription: '',
                userId: ''
            })
        }

    }
    fetchData() {
        // Get All User Data Using Redux Action Method.
        this.props.getuserdata(() => {

        })

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
                            <td>{n.uStatus}</td>
                            <td>
                                <button type="button" class="btn btn-success" onClick={() => this.edituser(n.uId)} style={{ marginRight: '15px' }}>Edit</button>
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
            <div id="myModaltwo" class="modal" role="dialog" style={{ marginTop: '10%' }}>
                <div class="modal-dialog">

                    <div class="modal-content">
                        <div class="modal-header">

                            <h4 class="modal-title">Edit Users</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={this.btntoggle}>&times;</button>
                        </div>

                        <div class="modal-body">

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
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => this.editdata()}>Save</button>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
    render() {
        if (sessionStorage.getItem("uRole") === "Admin") {
            return (
                <div class="container">
                    <div class="card">
                        <div class="card-body">
                            <h2>Users</h2>

                            <label id="message" ></label>
                            <div class="table-responsive" >
                                <table class="table table-hover">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
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
        if (sessionStorage.getItem("uRole") === null || sessionStorage.getItem("uRole") === "User") {
            return (
                <Redirect to='/' />
            );
        }
    }

}
User.propTypes = {
    userd: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    userd: state.user.userdata
})


export default connect(mapStateToProps, { getuserdata })(User); 