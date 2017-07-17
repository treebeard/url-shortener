function selectColor() {
    var d = new Date();
    var hr = d.getHours();
    var index = Math.floor(hr / 4);
    var colors = ["#FD8190","#FDB16F","#B3CE78","#81C6CA","#86CEE4","#C69DC3"];
    return colors[index];
}

function setColors(color) {
    $('#footer').css('background-color', color);
}


$(document).ready(function() {
    var color = selectColor();
    setColors(color);
});