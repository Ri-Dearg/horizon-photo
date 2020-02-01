$(".list-group li").on("click", function () {
    $(".list-group li").removeClass("active");
    $(this).addClass("active");
});