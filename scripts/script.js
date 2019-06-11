$(document).ready(function() {
    var sent = false;

    function checkRequired(name, message, subject) {

        if (!name || !message || !subject){  	
            return false; 
        }  	
        return true; 
    } 

    function checkPattern(name) {
        var pat = new RegExp(/[a-zA-Z]+/);
        if (!pat.test(name)){
            return false;
        }
        return true;
    }

    function sendEmail() {
        if (sent){
            return false;
        }

        var name = $("#name").val();
        var message = $("#message").val();
        var subject = $("#subject").val();
        
        // Verificar se campos nao sao vazios
        if (!checkRequired(name, message, subject)){
            alert("Preencha todos os campos"); 
            return false;
        }

        if (!checkPattern(name)){
            alert("Preencha o nome apenas com letras"); 
            return false;
        }

        var loaderAni = $('.contload');
        loaderAni.addClass('show');

        var data = {
            name : name,
            message : message,
            subject : subject
        }

        $.ajax({
            url: 'scripts/send.php',
            data: JSON.stringify(data),
            contentType: 'application/json',
            type: 'POST',
            success: function (result) {
                console.log("Sucesso");
                var btn = $('#send');
                btn.text('ENVIADO'); 
                btn.addClass('sent');
                sent = true;
                loaderAni.removeClass('show');
                return false;
            },
            error: function(result){
                console.log("Deu erro");
                loaderAni.removeClass('show');
                alert("Ocorreu um erro, tente novamente.");
                return;
            }
        }); 
    }

    $('#send').click(function(e){e.preventDefault(); sendEmail();});
});
