window.onload = main;

function main() {

    function getAjax (node, id, type) {
        var settings = {
            url: 'update.php',
            type: 'POST',
            data: {'id': id, 'type': type},
            dataType: 'text',
            context: node,
            success: function(data) {
            this.parentNode.parentNode.setAttribute("class",data);
            }
        };
        return $.ajax(settings);
    }

    var list = document.getElementsByClassName("entry");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        item.children[4].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Active')});
        item.children[3].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Completed')});
        //item.children[5].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Flagged')});
    };

    var showtoggle = document.getElementById('showtoggle');
    showtoggle.addEventListener('click', function() {
        var showlist = document.getElementsByClassName("c1");
        for (var i = 0; i < showlist.length; i++) {
            var item = showlist[i];
            if (item.style.display == '') {var newdisplay = 'table-row'}
            else if (item.style.display == 'table-row') {var newdisplay = ''}
            showlist[i].style.display = newdisplay;
        }
    });
}
