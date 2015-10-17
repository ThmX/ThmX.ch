new WOW().init();

$(document).ready( function() {

    [
        "spektro",
        "lsi",
        "scm",
        "lapbachelor",
        "lapsubmit",
        "forumepfl",
        "qloudlab",
        "aac",
        "lapprojects",
        "arpibot",
        "eblast"
    ].forEach(function (project) {
        $.get("projects/" + project + "/button.html", function( data ) { $("#modals-buttons").append(data); });
        $.get("projects/" + project + "/modal.html", function( data ) { $("#modals").append(data); });
    });

    $(window).load(function() {
	    $(".loader").fadeOut("slow");

	    $(".grid-item").addClass("col-xs-6 col-sm-4 col-md-3");

        var $grid = $("#modals-buttons").isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry'
        });

	    $('.filter-button-group').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
            $('.filter-button-group button').removeClass("active");
            $(this).addClass("active");
		});
	})
});