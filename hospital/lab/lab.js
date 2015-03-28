$(document).ready(function(){
    $(".link").click(function () {
        $.ajax({
            url: "index.php",
            data: {
                panel: $(this).attr("data-panel_i"),
                nhi: $("#nhi").text().toLowerCase()
            },
            method: "GET",
            dataType: "html",
            beforeSend: function(){
                $("#right, #loadimg").toggle();
            },
            complete: function(){
                $("#right, #loadimg").toggle();
            },
            success: function(result) {
                $("#right").html(result);
            }
        });
    });
});
        

