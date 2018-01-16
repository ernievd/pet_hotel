$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display pets onload
  
    // Event Listeners

} // End readySetGo function


function getPets() {
    $.ajax({
        method: 'GET',
        url: '/koalas',
        success: function(response) {
            $('#koalaList').empty();
            console.log('response from GET', response);
            for (let i = 0; i < response.length; i++) {
                const koala = response[i];
                let transferButton;

                if (koala.ready_to_transfer === true) {
                    koala.ready_to_transfer = "Yes";
                } else {
                    koala.ready_to_transfer = "No";
                    // Define a button for transfer
                    transferButton = '<button class="transferButton btn btn-info">Ready for Transfer</button>';
                }
                // Update the following to use template literals - back ticks
                let $listItem = $(`<li class="koalaItem jumbotron" data-id="${koala.id}">`);
                $listItem.append(`<h2 class="name" data-name="${koala.name}">${koala.name}</h2>`);
                $listItem.append(`<p class="age" data-age="${koala.age}">Age: ${koala.age}</p>`);
                $listItem.append(`<p class="gender" data-gender="${koala.gender}">Gender: ${koala.gender}</p>`);
                $listItem.append(`<p class="transferrable" data-transfer="${koala.ready_to_transfer}">Ready to Transfer? ${koala.ready_to_transfer}</p>`);
                $listItem.append(`<p class="notes">${koala.notes}</p>`);
                $listItem.append(transferButton);
                $listItem.append(`<button class="deleteButton btn btn-info">Delete</button>`);
                $listItem.append(`<button class="editButton btn btn-info">Edit</button>`);
                $('#koalaList').prepend($listItem);
            }
        }
    });
} // End getPets

function addPets() {
} // End getPets

function updatePets() {
    const buttonId = $(this).parents('.koalaItem').data('id');
    console.log('buttonId', buttonId);
    
    $.ajax({
        method: 'PUT',
        url: '/koalas/' + buttonId,
        data: { ready_to_transfer: 'Y' },
        success: function(response) {
            console.log('response:', response);
            getKoalas();
        }
    });
} // End getPets

function deletePets() {
    const buttonId = $(this).parents('.koalaItem').data('id');

    $.ajax({
        method: 'DELETE',
        url: '/koalas/' + buttonId,
        success: function(response) {
            console.log('response', response);
            getKoalas();
        }
    });
} // End getPets

function editPets() {
    
}
