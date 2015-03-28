function toggleseen(id, type)
{
$.ajax({
    url: 'update.php',
    type: 'GET',
    data: {id: id, type: type},
    dataType: 'text',
    success: function(data) {
        document.getElementById("txtHint").innerHTML=data;
        }
});
}
