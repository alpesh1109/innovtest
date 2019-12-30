import React from 'react';
import { connect } from 'react-redux';
import { loginAction, getblogdata } from './actions/UserAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import './imgpre.css';
class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            discription: '',
            flag: false,
            selectedFile: '',
            imagePreviewUrl: '',
            id: ''
        };
        this.fetchblog = this.fetchblog.bind(this);
        this.btntoggle = this.btntoggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addblog = this.addblog.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    componentDidMount() {
        var id = sessionStorage.getItem("uId");
        this.setState({
            id: id
        })
        this.fetchblog();

    }
   
    fetchblog = () => {

        var id = sessionStorage.getItem("uId");
        var role = sessionStorage.getItem("uRole");

        this.props.getblogdata(id, role, () => {

        })
    }
    addblog = (e) => {
        e.preventDefault();

        var form = $('#FormUpload')[0];
        var fileData = new FormData(form);

        axios.post("/InsertBlog", fileData)
            .then(res => {
                this.fetchblog();
                $('#myModalthree').hide();
                this.setState({
                    flag: false,
                    title: '',
                    discription: '',
                    imagePreviewUrl: "",
                    selectedFile: ''
                })

            }).catch(err => {
                console.log(err);
                throw new Error('Error in Add Blog Data');
            });

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    btntoggle() {
        // Popup Model Open And Close 

        var flag = this.state.flag;
        if (flag === false) {
            $('#myModalthree').show();
            this.setState({
                flag: true
            })
        } else {
            $('#myModalthree').hide();
            this.setState({
                flag: false,
                title: '',
                discription: ''
            })
        }

    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                imagePreviewUrl: reader.result
            });
        }
        if (file) {
            reader.readAsDataURL(file);
            this.setState({
                imagePreviewUrl: reader.result
            })
        }
        else {
            this.setState({
                imagePreviewUrl: ""
            })
        }
    }
    popupmodel = () => {

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt=""/>);
        }
        else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div id="myModalthree" class="modal" role="dialog">
                <div class="modal-dialog">

                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add Users</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={this.btntoggle}>&times;</button>
                        </div>
                        <form method="post" class="sign-up-form" enctype="multipart/form-data" id="FormUpload" onSubmit={this.addblog}>
                            <div class="modal-body">
                                <input type="hidden" value={this.state.id} name="id" />
                                <div class="form-group">
                                    <label for="sel1">Title: </label>
                                    <input className="form-control col-sm-12" type="text" onChange={this.handleChange} name="title" required value={this.state.title} />
                                </div>

                                <div class="form-group">
                                    <label for="sel2">Discription: </label>
                                    <input type="text" className="form-control" required onChange={this.handleChange} name="discription" value={this.state.discription} />
                                </div>
                                <div class="form-group">
                                    <input className="fileInput"
                                        type="file"
                                        onChange={this.handleImageChange}
                                        name="selectedFile" />
                                </div>
                                <div className="imgPreview">
                                    {$imagePreview}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" id="btnSubmit" class="btn btn-primary" data-dismiss="modal" >Save</button>
                            </div>
                        </form>
                    </div>
                    <label id="message" ></label>
                </div>
            </div>

        );
    }
    deleteblog(id) {
        // Delete Blog. Id Pass as Parameter.
        var url = "/DeleteBlog";
        axios.post(url, { id })
            .then(res => {
                this.fetchblog();
            });

    }
    render() {
        const { blogdata } = this.props;
        const blog = blogdata.map((n, index) => {
            return (
                <div class="row">
                    <div class="col-sm-2" ></div>
                    <div class="col-sm-8" >
                        <div class="card">
                            <div class="card-body">
                                <span style={{ float: 'right', marginTop: '-1%' }} onClick={() => this.deleteblog(n.bId)}><i class="fa fa-times" aria-hidden="true"></i></span>
                                <label><h3>{n.bTitle}</h3></label>
                                <p>{n.bDiscription}</p>
                                <div><img src={"/UploadImage/"+n.bImageName} style={{float:'right',marginRight:'15%',marginTop:'-10%'}} height="150" width="150"  alt='fist'/></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2" >

                    </div>

                </div>
            );
        });
        if (localStorage.getItem('isUser') === "true") {
            return (
                <div class="section" style={{ marginTop: '2%' }}>
                    <button type="button" class="btn btn-primary" style={{ marginLeft: '76%', marginBottom: '5px' }} onClick={this.btntoggle}>Add Blog</button>
                    <React.Fragment>
                        {
                            blog
                        }
                    </React.Fragment>
                    {this.popupmodel()}
                </div>
            );
        } else {
            return (
                <Redirect to='/' />
            );
        }
    }
}

Blog.propTypes = {
    blogdata: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    blogdata: state.user.blogdata
})
export default connect(mapStateToProps, { loginAction, getblogdata })(Blog);