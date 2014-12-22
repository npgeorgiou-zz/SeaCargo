var currentView = "/";
var previousView = "";


$(document).ready(function () {
    loadPartial("#content", "/orders");
    $(".nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

});

function loadPartial(element, url) {
    $("#content").load(url, function (response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            $(element).html(msg + xhr.status + " " + xhr.statusText + "<p>" + response + "</p>"
            );
        }

        previousView = currentView;
        currentView = url;
        if (!!document.getElementById('backBtn')) {
            document.getElementById('backBtn').href = previousView;
        }

    });
}
$(document).on('click', "a.useajax", function (event) {
    event.preventDefault();
    var url = event.target.href;
    //var self = this;
    loadPartial("#content", url);
});

$(document).on("click", ".btn-blue, .btn-red", function () {
    event.preventDefault();

    var url = this.name;
    if (this.classList.contains("btn-red")) {
        deleteRequest(url);
    } else {
    }
});

function deleteRequest(url) {
    $.ajax({
        url: url,
        type: "DELETE",
        error: function (jqXHR, textStatus, errorThrown) {
            //create message to user
            alert("Something went wrong: " + textStatus);
        }
    }).done(function (data) {
        //create message to user
        loadPartial("#content", data);
    });
}
