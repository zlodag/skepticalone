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
                if (data == 'D') {
                    var element = this.parentNode.parentNode;
                    element.parentNode.removeChild(element);
                } else {
                    this.innerHTML=data;
                }
            }
        };
        var r =  $.ajax(settings);
        return r;
    }

    /*    document.getElementById("searchstrbutton").addEventListener('click', function() {
          this.style.display = "none";
          this.nextSibling.style.display = "block";
          });
    */
    var list = document.getElementsByClassName("entry");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        item.children[4].lastChild.addEventListener('click', function() {
            getAjax(this.previousSibling, this.parentNode.parentNode.id, 'Summary');
            this.previousSibling.style.display = "block";
            this.style.display = "none";
            //this.parentNode.parentNode.style.backgroundColor = "black";
        });
        item.children[5].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Seen')});
        item.children[6].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Flagged')});
        item.children[7].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Owned')});
        item.children[9].firstChild.addEventListener('click', function() {getAjax (this, this.parentNode.parentNode.id, 'Delete')});
    };
}
