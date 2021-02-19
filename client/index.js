const SERVER = 'http://localhost:3000/'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

$(document).ready(()=> {
    const access_token= localStorage.access_token
    $("#register-page").hide()
    $("error-message").empty()
    if(access_token) {
        fetchTicket()
        $("#register-page").hide()
        $("#login-page").hide()
        $("#ticket-card").show()
        $("#logout-button").show()
    }else {
        $("#ticket-card").hide();
        $("#logout-button").hide()
    }
})

function login(event) {
    event.preventDefault()
    const email = $("#input-email").val()
    const password = $("#input-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + 'login',
        data: {
            email,
            password
        }
    })
    .done(response => {
        $("#ticket-card").empty()
        const access_token= response.access_token
        console.log(access_token)
        localStorage.setItem('access_token', access_token)
        fetchTicket()
        $("#login-page").hide()
        $("#register-page").hide()
        $("#ticket-card").show();
        $("#logout-button").show()
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error !',
            err.responseJSON.message,
            'ERROR'
        )
    })
}

$("#logout-button").on('click', ()=> {
    $("#ticket-card").hide()
    $("#login-page").show();
    $("#logout-button").hide()
    localStorage.clear()
    Toast.fire({
      icon: 'success',
      title: 'logout successfully'
    })
})

function register(event) {
    event.preventDefault();
    const email = $("#register-email").val();
    const password = $("#register-password").val();
    $.ajax({
      method: "POST",
      url: SERVER + "register",
      data: {
        email,
        password
      }
    })
    .done(response => {
      $("#login-page").show();
      $("#register-page").hide();
      Toast.fire({
          icon: 'success',
          title: 'registered in successfully'
        })
    }).fail(err => {
      Swal.fire(
          'Error !',
          err.responseJSON.message,
          'ERROR'
      )
    })
  }
  $("#register-link").on('click', ()=> {
      $("#register-page").show()
      $("#login-page").hide()
      $("navbar-home").hide()
      $("#logout-button").hide()
  })
  
  $("#cancel-register").on('click', ()=> {
      $("#login-page").show()
      $("#register-page").hide()
      $("navbar-home").hide()
      $("#logout-button").hide()
  })

  function fetchTicket(){
    const access_token= localStorage.getItem('access_token')
    console.log(access_token)
    $.ajax({
        method: "GET",
        url: SERVER + "ticket",
        headers: {
          access_token
        }
    }).done(response => {
        console.log(response);
    if (response.length !== 0) {
        response.forEach(element => {
        $("#ticket-card").append(`
        <div class="row justify-content-center mt-5">
          <div class="card text-black bg-light mb-3" style="width: 70rem;">
              <div class="card-header" style="height: 3rem;">${new Date(element.due_date).toISOString().split('T')[0]}</div>
                <div class="card-body">
                  <img class="card-title" src="${element.image_url}" style="width: 300px"/>
                  <div class="content-card">
                  <h3 class="bismillah">${element.name}</h3>
                    <a href="#" id="done${element.id}">
                        <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </a>
                    <a href="#" id="yetDone${element.id}">
                        <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </a>
                  </div>
                </div>
                <h5 id="pending-button${element.id}" class="btn btn-warning m-2">Pending</h5>
                <h5 id="closed-button${element.id}" class="btn btn-dark m-2">Closed</h5>
          </div>
        </div>
        `)
        if(element.status === true) {
            $(`#yetDone${element.id}`).hide();
            $(`#pending-button${element.id}`).hide();
            $(`#pending-button${element.id}`).hide();
            }else {
            $(`#done${element.id}`).hide();
            $(`#pending-button${element.id}`).show();
            $(`#closed-button${element.id}`).hide();
            }
            $(`#done${element.id}`).on("click", () => {
            yetDoneStatus(element.id);
            $(`#yetDone${element.id}`).show();
            $(`#done${element.id}`).hide();    
            $(`#pending-button${element.id}`).hide();
            })
            $(`#yetDone${element.id}`).on("click", () => {
            doneStatus(element.id);
            $(`#done${element.id}`).show();
            $(`#yetDone${element.id}`).hide();
            })
        });
    } else {
        $("#ticket-card").append(`
        <div class="row justify-content-center mt-5">
            <p>You do not have any Todo</p>
        </div>
        `)
    }
    }).fail(err => {
    errorMessage(err)
    })
}
    


function doneStatus(id) {
    const token = localStorage.getItem("token");
    const status = true;
    $.ajax({
      method: "PATCH",
      url: SERVER + "ticket/" + id,
      headers: {
        token
      },
      data: {
        status
      }
    }).done(response => {
      fetchTicket()
      $("#ticket-card").empty()
      console.log(response)
    }).fail(err => {
      console.log(err)
    })
  }
  function yetDoneStatus(id) {
    const token = localStorage.getItem("token");
    const status = false;
    $.ajax({
      method: "PATCH",
      url: SERVER + "ticket/" + id,
      headers: {
        token
      },
      data: {
        status
      }
    }).done(response => {
      fetchTicket()
      $("#ticket-card").empty()
      console.log(response)
    }).fail(err => {
      console.log(err)
    })
  }

  function successMessage(message) {
    $("#success-message").empty();
    youTodo()
    $("#success-message").append(`
      <div class="row justify-content-center mt-5">
        <p class="alert alert-success" role="alert" style="color: green;">${message}</p>
      </div>
    `)
    setTimeout(() => {
      $("#success-message").empty();
    }, 3000);
  }
  function errorMessage(message) {
    $(".error-message").empty();
    let errors = message.responseJSON.message.split(', ');
    errors.forEach(element => {
      $(".error-message").append(`
          <p class="alert alert-danger" role="alert" style="color: red;">${element}</p>
        `)
    })
  }