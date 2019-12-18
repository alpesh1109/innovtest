import React from 'react';

function Footer() {
    return (
        <React.Fragment>
            <footer class="main-footer">
                <div class="pull-right hidden-xs"> </div>
                <strong>Copyright &copy; 2019 <a href="https://www.heliossolutions.co/" rel="noopener noreferrer" target="_blank">Helios Solutions</a>.</strong> All rights reserved.
            </footer>
            <aside class="control-sidebar control-sidebar-dark">

                <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
                    <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
                    <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
                </ul>

                <div class="tab-content">

                    <div class="tab-pane active" id="control-sidebar-home-tab">
                        <h3 class="control-sidebar-heading">Recent Activity</h3>
                        <ul class="control-sidebar-menu">
                            <li>
                           
                            </li>
                        </ul>
                        <h3 class="control-sidebar-heading">Tasks Progress</h3>
                        <ul class="control-sidebar-menu">
                            <li>
                                
                            </li>
                        </ul>

                    </div>
                    <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
                    <div class="tab-pane" id="control-sidebar-settings-tab">
                        <form method="post">
                            <h3 class="control-sidebar-heading">General Settings</h3>
                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Report panel usage
                                   <input type="checkbox" class="pull-right" checked />
                                </label>

                                <p>
                                    Some information about this general settings option
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </aside>

            <div class="control-sidebar-bg"></div>
        </React.Fragment>

    );
}
export default Footer;