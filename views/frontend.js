$('.addAnothaRepo').on('click', function(event) {
    const regEx = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    const link = $('#link').val();
    if (!regEx.test(link)) {
        event.preventDefault();
        vex.dialog.open({
           message: 'Sorry! You need to enter a vaild URL! Like this (ツ)_/¯ http://google.com'
        })
    }
});
