//-----FUNCIONES DEL DISEÑO ADAPTATIVO------//
function isMobile(){
  var screenSize = screen.width;
  if(screenSize<992){
    return true
  }else return false;
}

function inicioOrganizacion(){
  if (isMobile()==true) {
    $('#btnMessage').attr('class', 'btn-floating hide-on-large-only')
    organizarMensaje();
  }
}

function organizarMensaje(){
  $(".numHora").unwrap();
  var horas = $(".numHora");
  for (var i = 0; i < horas.length; i++) {
    $(horas[i]).prependTo($(horas[i]).prev());
  }
  var horasRecibido=$(".recibidos .numHora");
  for (var i = 0; i < horasRecibido.length; i++) {
    $(horasRecibido[i]).next().after(horasRecibido[i]);
  }

}

function slideContactos(direction){
  if (desplegado==false) {
    if (direction=="left") {
      $(".right-side")
      .css({
        position: "absolute",
        zIndex: "3",
        right: "0px",
        display: "none"
      })
      .removeClass("hide-on-small-only")
      .show("slide", { direction: "right" },300)
      desplegado=true;
    }

  }else{
    if (direction=="right") {
      $(".right-side").hide("slide", { direction: "right" }, 300)

      desplegado=false;
    }


  }
}

var desplegado = false;
$(function(){
  //----VARIABLES Y FUNCIONES DEL DISEÑO ADAPTATIVO -----//
  $(".container").css("height",$(window).height());
  inicioOrganizacion();
  if (isMobile()) {
    $(".input-contenedor button").html("<i class='material-icons right'>send</i>")
    $("body").swipe({
      swipe:function(event, direction, distance, duration, fingerCount){
        slideContactos(direction);
      },
      allowPageScroll:"vertical"
    })
    $(".titulo-chat button").on("click", function(){
      slideContactos("left");
    })
  }
})



// (function(document, window, undefined, $ ,io){
// })(document, window, undefined, jQuery , io);

var ChatIni = function(document, window, undefined, $ ,io){
  var Chat = {
      apiUrl:'/chat',
      $userDataModal: $('#modalCaptura'),
      $btnMessages: $("#messageText"),
      $userName:'',
      socket: io(),

      init: function(){
        var self = this
        this.fetchUseInfo(function(user){
          self.renderUser(user)
        })
        this.watchMessages()
        // emitir usuario
        self.socket.on('userJoin', function(user){
          self.renderUser(user)
        })
        // emitir mensaje
        self.socket.on('message', function(message){
          self.renderMessage(message)
        })
      },

      fetchUseInfo: function(callback){
        var self = this
        this.$userDataModal.openModal()
        var $GuardaInfo = $('.guardaInfo')
        $GuardaInfo.on('click',function(){
          var nombre = $('.nombreUsuario').val()
          var user = [{nombre: nombre, img:'p2.png'}]
          self.socket.emit('userJoin', user[0])
          callback(user)
          self.joinUser(user[0])
          self.userName = nombre
          self.$userDataModal.closeModal()
        })
        self.getInitalUsers()
      },
      getInitalUsers: function(){
        var self = this
        var endpoint = self.apiUrl + '/users'
        self.ajaxRequest(endpoint,'GET',{})
        .done(function(data){
          var users = data.current
          self.renderUser(users)
        }).fail(function(err){
          console.log(err)
        })
      },
      ajaxRequest: function(url,type,data){
        return $.ajax({
          url:url,
          type:type,
          data:data
        })

      },
      joinUser: function(user){
        var self = this
        var endpoint = self.apiUrl + '/users'
        var userObj = {user:user}
        self.ajaxRequest(endpoint,'POST',userObj)
        .done(function(data){
          console.log(data)
        }).fail(function(err){
          console.log(err)
        })

      },
      renderUser: function(users){
        var self = this
        var userlist = $('.user-list')
        var userTemplate = '<li class="collection-item avatar">'+
                  '<img src="image/:image:" class="circule">'+
                  '<span class="title">:nombre:</span>'+
                  '<p><img src="image/online.png">En linea</p>'+
                  '</li>'

        users.map(function(user){
          var newUser = userTemplate.replace(':image:','p2.jpg')
                        .replace(':nombre:',user.nombre)

        })
      },
      watchMessages: function(){
        var self = this
        self.$btnMessages.on('keypress',function(e){
          if(e.which == 13){
            if($this.val().trim()!=""){
              var message = {
                sender: self.userName,
                text: $(this).val()
              }
            }
            self.renderMessage(message)
            self.socket.emit('message', message)
            $(this).val()
          }else{
            e.preventDefault()
          }
        })
        self.$btnMessages.on('click',function(){
          if(self.$btnMessages.val()!=''){
            var message = {
              sender: self.userName,
              text: $(this).val()
            }
            self.renderMessage(message)
            self.socket.emit('message', message)
            self.$btnMessages.val('')
          }
        })

      },
      renderMessage: function(message){
        var self = this
        var tipoMensaje = message.sender == self.userName ? 'recibidos' : 'enviados'
        var messageList = $('.historial-chat')
        var messageTeamplate = '<div class=":tipoMensaje:">'+
                    '<div class="mensaje">'+
                    '<div class="imagen">'+
                    '<img src="image/p2.jpg" alt="Contacto"/>'+
                    '<div>'+
                    '<div class="texto">'+
                    '<span class="nombre">:nombre:</span><br>'+
                    '<span>:mensaje:</span>'+
                    '</div>'+
                    '<div class="hora">'+
                    '<span class="numHora">:hora:</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
        var currentDate = new Date()
        var newMessage = messageTeamplate.replace(':tipoMensaje:',tipoMensaje)
                         .replace(':nombre:',message.sender)
                         .replace(':mensaje:',message.text)
                         .replace(':hora:',currentDate.getHours()+ ":" +current.getMinutes())
        messageList.append(newMessage)
        $(".scroller-chat").animate({ scrollTop : $("scroll-char").get(0).scrollHeight},500)
      }
    }// end Chat
    Chat.init();
}

ChatIni(document, window, undefined, jQuery , io);