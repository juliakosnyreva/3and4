$(document).ready(function () {
    $("#regForm").submit(function() {
        event.preventDefault();
        var jsonData = {
            "name": $("#name").val(),
            "password": $("#password").val(),
            "password2": $("#password2").val()
        };
        $.ajax({
            type: "POST",
            url: "app/check.php",
            data: {
                "data": JSON.stringify(jsonData)
            },
            success: function (res) {
                res = JSON.parse(res);
                if (res["nameValid"] == false) {
                    $("#error-name").removeClass("hidden").text(res["errorName"]);
                }
                if (res["passValid"] == false) {
                    $("#error-pass").removeClass("hidden").text(res["errorPass"]);
                }
            },
            error: function (res) {

            }
        });
    });
    $("#enterForm").submit(function () { 		//Событие submit возникает при отправке формы с именем EnterForm  
												//Эта функция будет вызвана по событию submit на элементы с ID elementform
												//$(селектор).submit(обработчик_события)
												//селектор выбирает элемент, к которому будет привязано событие.
												//обработчик события функция, код которой будет выполнен, когда действие активирующее данное событие произойдет.
												//Здесь $ - вызов функции jQuery
												
        event.preventDefault(); 				//event представляет собой любое событие. Метод - отменяет событие
        var jsonData = { 						//помещаем значения из полей формы в ассоциативный массив (структура данных, в которой можно хранить любые данные в формате ключ-значение)
            "email": $("#email").val(),			//Обратимся к элементу с id=email и получим содержимое атрибута value, то есть введенные пользователем email
            "password": $("#password").val()	//.val() - метод в основном используется для получения значений элементов формы
        };				
        $.ajax({ 								//jQuery.ajax
            type: "POST", 						//тип передачи GET либо POST
            url: "app/checklogin.php", 			//отправляем нашу форму по этому адресу на сервер
			
            data: {								//передаваемые данные — строка или объект
                "data": JSON.stringify(jsonData)//json строка(методом превращем ассоциативный массив в строку в формате JSON, используется, когда нужно из JavaScript передать данные по сети.)
												//в скобках - value - Значение, преобразуемое в строку JSON
            }, 									//выглядит так {"email":"test@mail.ru", "password": "123"}
			
            success: function (res) { 			//если ошибок не возникло, функция вызовется при успешном ответе от сервера
                res = JSON.parse(res); 			//превратит строку с приянтыми данными в формате JSON в JavaScript-объект (разджейсониваем)
                if (res["isValid"] == false) {  //если с сервера пришел ответ, что наша форма не валидна
				
                    $("#error").removeClass("hidden").text(res["error"]); 
					//Удалем с блока, который выводит текст ошибки его "прозрачность" и добавляем текст ошибки который нам пришел с сервера
					
					//Вызываем функцию jqery у элемента с id = error
					//Обратимся к элементу с id=error 
					//removeClass - удалит все классы у выбранных элементов, метод. В скобках - строка, содержащая имя класса, который требуется удалить
					//метод .text() предназначен для считывания и записи текста.
					
                    $("#password").val(""); 	//очищаем поле пароль
												//элемент с id=password, в скобках: атрибут value - строка текста, тут и устанавливаем новое значение 
					
                } else $("#error").addClass("hidden").text(""); //иначе скрываем блок и удаляем оттуда текст ошибки
            },													//в скобках: имя класса, которое требуется добавить к элементу
            error: function (res) { 			//если произошла какая-то ошибка на сервере

            }
        });
    });
});
