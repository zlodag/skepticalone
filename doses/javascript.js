window.onload = main;

function main() {
    function getAjax(node, id, yn) {
        var settings = {
            url: 'update.php',
            type: 'POST',
            data: {'id': id.slice(1), 'yn': yn},
            dataType: 'text',
            context: node,
            success: function(data) {
                this.parentNode.previousSibling.innerHTML=data + '% correct!';
            }
        };
        return $.ajax(settings);
    }

    var cards = document.getElementsByTagName("dl");
    for (var n = 0; n < cards.length; n++) {
        cards[n].getElementsByClassName("correct")[0].addEventListener("click", function() {
            getAjax(this, this.parentNode.parentNode.id, 'y');
            this.parentNode.style.display = "none";
        });
        cards[n].getElementsByClassName("incorrect")[0].addEventListener("click", function() {
            getAjax(this, this.parentNode.parentNode.id, 'n');
            this.parentNode.style.display = "none";
        });
        cards[n].getElementsByClassName("reveal")[0].addEventListener("click", function() {
            var hidden = this.parentNode.parentNode.getElementsByClassName("answer");
            for (var i = 0; i < hidden.length; i++) {
                var element = hidden[i];
                element.style.display="block";
            }
            this.style.display="none";
        });
    }
}
