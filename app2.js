function validate(){
    $('#register_form input:text,password,email').each(function() {
        if($(this).val()==$(this).attr('placeholder'))
            console.log("hello")
    });
}