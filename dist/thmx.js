/*! thmx - v0.1.0 - 2015-10-18
* https://github.com/ThmX/ThmX.ch
* Copyright (c) 2015 Thomas Denoréaz; Licensed MIT */
var $grid = $("#projects-react").isotope({
    itemSelector: '.grid-item',
    layoutMode: 'masonry'
});

$('.filter-button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
    $('.filter-button-group button').removeClass("active");
    $(this).addClass("active");
});

var ProjectButton = React.createClass({
    displayName: 'ProjectButton',

    componentDidMount: function componentDidMount() {
        $grid.delay(500).isotope('reloadItems');
        $grid.delay(500).isotope({ filter: '*' });
    },
    render: function render() {
        var project = this.props.project;
        return React.createElement(
            'div',
            { className: "grid-item col-xs-6 col-sm-4 col-md-3 wow fadeInUp " + project.filters.join(' ') },
            React.createElement(
                'button',
                { type: 'button', className: 'thumbnail btn btn-default',
                    'data-toggle': 'modal', 'data-target': "#" + project.shortname },
                React.createElement('img', { src: 'projects/' + project.shortname + '/thumbnail.png' }),
                React.createElement(
                    'div',
                    { className: 'caption' },
                    project.caption
                )
            )
        );
    }
});

var ProjectModal = React.createClass({
    displayName: 'ProjectModal',

    render: function render() {
        var project = this.props.project;
        var projectURL = 'projects/' + project.shortname + '/';
        var colA = "col-md-6";
        var colB = "col-md-6";
        if (project.mobile) {
            colA = "col-md-4";
            colB = "col-md-8";
        }
        return React.createElement(
            'div',
            { className: 'modal fade', id: project.shortname, tabIndex: '-1', role: 'dialog', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                { className: 'modal-dialog modal-lg' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h3',
                            null,
                            project.name
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: "col-xs-12 col-sm-6 " + colA },
                                React.createElement(
                                    'div',
                                    { id: 'carousel-' + project.shortname, className: 'carousel slide', 'data-ride': 'carousel' },
                                    React.createElement(
                                        'ol',
                                        { className: 'carousel-indicators' },
                                        React.createElement('li', { 'data-target': '#carousel-' + project.shortname, 'data-slide-to': '0', className: 'active' }),
                                        Array.apply(null, { length: project.pics.length - 1 }).map(Number.call, Number).map(function (i) {
                                            return React.createElement('li', { key: i + 1, 'data-target': '#carousel-' + project.shortname, 'data-slide-to': i + 1 });
                                        })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'carousel-inner', role: 'listbox' },
                                        React.createElement(
                                            'div',
                                            { className: 'item active' },
                                            React.createElement('img', { src: projectURL + project.pics.shift(), className: 'img-thumbnail' })
                                        ),
                                        project.pics.map(function (p) {
                                            return React.createElement(
                                                'div',
                                                { key: p, className: 'item' },
                                                React.createElement('img', { src: projectURL + p, className: 'img-thumbnail' })
                                            );
                                        })
                                    ),
                                    React.createElement(
                                        'a',
                                        { className: 'left carousel-control', href: '#carousel-' + project.shortname, role: 'button', 'data-slide': 'prev' },
                                        React.createElement('span', { className: 'glyphicon glyphicon-chevron-left', 'aria-hidden': 'true' }),
                                        React.createElement(
                                            'span',
                                            { className: 'sr-only' },
                                            'Previous'
                                        )
                                    ),
                                    React.createElement(
                                        'a',
                                        { className: 'right carousel-control', href: '#carousel-' + project.shortname, role: 'button', 'data-slide': 'next' },
                                        React.createElement('span', { className: 'glyphicon glyphicon-chevron-right', 'aria-hidden': 'true' }),
                                        React.createElement(
                                            'span',
                                            { className: 'sr-only' },
                                            'Next'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: "col-xs-12 col-sm-6 " + colB },
                                React.createElement(
                                    'div',
                                    { className: 'row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-xs-12 col-sm-12 col-md-6' },
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement('img', { src: projectURL + project.logo, className: 'img-thumbnail' })
                                        )
                                    )
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    React.createElement('i', { className: 'fa fa-calendar' }),
                                    ' ',
                                    project.date
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    React.createElement('i', { className: 'fa fa-globe' }),
                                    ' ',
                                    React.createElement(
                                        'a',
                                        { href: project.url, target: '_blank' },
                                        project.url
                                    )
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    React.createElement('i', { className: 'fa fa-code' }),
                                    ' ',
                                    project.code
                                ),
                                React.createElement('hr', null),
                                React.createElement(
                                    'p',
                                    null,
                                    project.description
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

var Project = React.createClass({
    displayName: 'Project',

    getInitialState: function getInitialState() {
        return null;
    },
    componentDidMount: function componentDidMount() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (function (data) {
                this.setState(data);
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        $grid.delay(500).isotope('reloadItems');
        $grid.delay(500).isotope({ filter: '*' });
    },
    render: function render() {
        if (this.state) {
            return React.createElement(
                'div',
                { key: this.state.shortname, className: 'row' },
                React.createElement(ProjectButton, { project: this.state }),
                React.createElement(ProjectModal, { project: this.state })
            );
        } else {
            return null;
        }
    }
});

var Projects = React.createClass({
    displayName: 'Projects',

    getInitialState: function getInitialState() {
        return { projects: [] };
    },
    componentDidMount: function componentDidMount() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (function (data) {
                this.setState({ projects: data });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            this.state.projects.map(function (p) {
                return React.createElement(Project, { key: p, url: '/projects/' + p + '/info.json' });
            })
        );
    }
});

ReactDOM.render(React.createElement(Projects, { url: '/projects.json' }), document.getElementById('projects-react'));

new WOW().init();

$(window).load(function () {
    $(".loader").fadeOut("slow");
});

//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
