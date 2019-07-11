const source = $('#template').html()
const template = Handlebars.compile(source)

const renderr = function () {

    $("#bigbox").empty()

    let input = $("#input").val()

    $.get(`/teams/${input}`, function (data) {
        const newHTML = template({ data: data })
        $('#bigbox').append(newHTML)
    })
}

