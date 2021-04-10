
const renderTeam = function (plArr) {
    
    $(".team").empty()
    const source = $("#team-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({ pl: plArr })
    $(".team").append(newHTML)

}
$(document).on('click', '.b', function () {
    const input = $('input').val()
    $.get(`teams/${input}`, function (plArr) {
        if (plArr == 1) {
            $('.instr').empty()
            $('.instr').append('<div>Enter Name from the following <li>Suns</li><li>Lakers</li><li>Heat</li><li>Warriors</li></div>')
        } else {
            $('.instr').empty()
            $('.team').empty()
            renderTeam(plArr)
        }

    })
})
$(document).on('click', '.dt', function () {
    $.get(`/dreamTeam`, function (dreamTeam) {

        renderTeam(dreamTeam)
    })


})
$(document).on('click', '.addMe', function () {
    let pos = $(this).closest('.pl').find('.pos').text()
    let fname = $(this).closest('.pl').find('.fname').text()
    let lname = $(this).closest('.pl').find('.lname').text()
    let jersey = $(this).closest('.pl').find('.jersey').text()
    $.get('dreamTeam/', function (dreamTeam) {
        if (dreamTeam.length > 0) {
            for (i = 0; i < dreamTeam.length; i++) {
                if (dreamTeam[i].fname == fname && dreamTeam[i].lname == lname) {
                    console.log(dreamTeam[i].fname,fname,dreamTeam[i].lname,lname);
                   
                    $('.instr').empty()
                    $('.instr').append('<div>This Player was selected already</div>')

                } else {
console.log("else");
                    $.post(`/roster?pos=${pos}&fname=${fname}&lname=${lname}&jersey=${jersey}`, function (dreamTeam) {
                    })

                    const input = $('input').val()
                    $.get(`teams/${input}`, function (plArr) {
                        if (plArr == 1) {
                            $('.instr').empty()
                            $('.instr').append('<div>Enter Name from the following <li>Suns</li><li>Lakers</li><li>Heat</li><li>Warriors</li></div>')
                        } else {
                            $('.instr').empty()
                            $('.team').empty()
                            renderTeam(plArr)
                        }


                    })


                }

            }
        } else {

console.log("else4");
            $.post(`/roster?pos=${pos}&fname=${fname}&lname=${lname}&jersey=${jersey}`, function (dreamTeam) {
            })

            const input = $('input').val()
            $.get(`teams/${input}`, function (plArr) {
                if (plArr == 1) {
                    $('.instr').empty()
                    $('.instr').append('<div>Enter Name from the following <li>Suns</li><li>Lakers</li><li>Heat</li><li>Warriors</li></div>')
                } else {
                    $('.instr').empty()
                    $('.team').empty()
                    renderTeam(plArr)
                }


            })


        }



    })


})