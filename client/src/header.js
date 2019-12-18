import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <React.Fragment>
            <header class="main-header">

                <a href="javascript:void(0)" class="logo">
                    <span class="logo-mini"><b>H</b>S</span>
                    <span class="logo-lg"><b>Helious</b></span>
                </a>

                <nav class="navbar navbar-static-top" role="navigation">

                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                </nav>
            </header>

            <aside class="main-sidebar">

                <section class="sidebar">

                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="img" />
                        </div>
                        <div class="pull-left info">
                            <p>Admin</p>
                        </div>
                    </div>
                    <ul class="sidebar-menu" data-widget="tree">
                        <li class="header">Dashboard</li>
                        <li class="active"><Link to={{ pathname: '/' }}><i class="fa fa-user-md"></i> <span>User</span></Link></li>
                    </ul>
                </section>
            </aside>
        </React.Fragment>
    );
}
export default Header;