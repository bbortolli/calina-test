$(document).ready(function() {
    var sent = false;

    function checkRequired() {
        var name = $("#name").val();
        var message = $("#message").val();
        if (!name || !message){  	
            return false; 
        }  	
        return true; 
    } 

    function sendEmail() {
        if (sent){
            return false;
        }
        
        // Verificar se campos nao sao vazios
        if (!checkRequired()){
            alert("Preencha todos os campos"); 
            return false;
        }

        var loaderAni = $('.contload');
        loaderAni.addClass('show');

        var data = {
            name : $("#name").val(),
            message : $("#message").val()
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
