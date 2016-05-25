
import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

$(function () {
    window.$grid = $('#projects-react').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry'
    });

    $('#projects-react').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        window.$grid.isotope({ filter: '*' });
    });

    $('.filter-button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        window.$grid.isotope({ filter: filterValue });
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
    });
});

var ProjectButton = React.createClass({
    render() {
        var project = this.props.project;
        return (
            <div className={'grid-item col-xs-12 col-sm-4 col-md-3 ' + project.filters.join(' ')}>
                <button type='button' className='thumbnail btn btn-default'
                        data-toggle='modal' data-target={'#' + project.shortname}>
                    <Image src={'projects/'+ project.shortname +'/thumbnail.png'}/>

                    <div className='caption'>{project.caption}</div>
                </button>
            </div>
        );
    }
});

var ProjectModal = React.createClass({
    render() {
        var project = this.props.project;
        var projectURL = 'projects/'+ project.shortname +'/';
        var colA = 'col-md-6';
        var colB = 'col-md-6';
        if (project.mobile) {
            colA = 'col-md-4';
            colB = 'col-md-8';
        }
        return (
            <div className='modal fade' id={project.shortname} tabIndex='-1' role='dialog' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <h3>{project.name}</h3>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>

                                <div className={'col-xs-12 col-sm-6 ' + colA}>
                                    <div id={'carousel-' + project.shortname} className='carousel slide' data-ride='carousel'>
                                        <ol className='carousel-indicators'>
                                            <li data-target={'#carousel-' + project.shortname} data-slide-to='0' className='active'></li>
                                            {Array.apply(null, {length: project.pics.length-1}).map(Number.call, Number).map(function(i) {
                                                return <li key={i+1} data-target={'#carousel-' + project.shortname} data-slide-to={i+1}></li>;
                                            })}

                                        </ol>

                                        <div className='carousel-inner' role='listbox'>
                                            <div className='item active'><img src={projectURL + project.pics.shift()} className='img-thumbnail'/></div>
                                            {project.pics.map(function (p) {
                                                return <div key={p} className='item'><img src={projectURL + p} className='img-thumbnail'/></div>;
                                            })}
                                        </div>

                                        <a className='left carousel-control' href={'#carousel-' + project.shortname} role='button' data-slide='prev'>
                                            <span className='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>
                                            <span className='sr-only'>Previous</span>
                                        </a>
                                        <a className='right carousel-control' href={'#carousel-' + project.shortname} role='button' data-slide='next'>
                                            <span className='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>
                                            <span className='sr-only'>Next</span>
                                        </a>
                                    </div>
                                </div>

                                <div className={'col-xs-12 col-sm-6 ' + colB}>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-6'>
                                            <p><img src={projectURL + project.logo} className='img-thumbnail'/></p>
                                        </div>
                                    </div>

                                    <p><i className='fa fa-calendar'></i> {project.date}</p>
                                    <p><i className='fa fa-globe'></i> <a href={project.url} target='_blank'>{project.url}</a></p>
                                    <p><i className='fa fa-code'></i> {project.code}</p>

                                    <hr/>

                                    <p dangerouslySetInnerHTML={{__html: project.description}} />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

var Project = React.createClass({
    render() {
        return (
            <div className='row'>
                <ProjectButton project={this.props.project} />
                <ProjectModal project={this.props.project} />
            </div>
        );
    }
});

var Projects = React.createClass({
    getInitialState() {
        return {projects: []};
    },
    componentDidMount() {
        $.getJSON(this.props.url, function(data) {
            this.setState({projects: data});
        }.bind(this));
    },
    componentDidUpdate(prevProps, prevState) {
        window.$grid.isotope('reloadItems');
        window.setTimeout(() => {
            window.$grid.isotope({ filter: '*' });
        }, 500);
    },
    render() {
        return (
            <div>
                {this.state.projects.map(p => {
                    return <Project key={p.shortname} project={p}/>;
                })}
            </div>
        );
    }
});

ReactDOM.render(
    <Projects url='projects/projects.json' />,
    document.getElementById('projects-react')
);
