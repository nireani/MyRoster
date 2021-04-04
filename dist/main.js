
const renderTeam = function(plArr){
    $(".team").empty()
    const source = $("#team-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({pl:plArr})
    $(".team").append(newHTML)

}
$(document).on('click', '.b', function () {
    const input = $('input').val()
    $.get(`teams/${input}`, function (plArr) {
        if(arr==1){
            $('.instr').empty()
            $('.instr').append('<div>Enter Name from the following <li>Suns</li><li>Lakers</li><li>Heat</li><li>Warriors</li></div>')
        }else{
            $('.instr').empty()
            $('.team').empty()
            renderTeam(plArr)
        }
       
            })
})
