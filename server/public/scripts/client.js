$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Get pets on load
    getPets();
    // Event Listeners
    formListeners();
    $('.pet-list').on('click', '.edit-pet', editPets);
    $('.pet-list').on('click', '.cancelButton', getPets);
    $('#addNewOwnerBtn').on('click', registerNewOwner);
    $('#addNewPetBtn').on('click', registerNewPet);
    $('table').on('click', '.deleteButton', deletePets);
    $('table').on('click', '.check-in-out', checkInOut);
    $('.pet-list').on('click', '.confirmButton', confirmEdit);
} // End readySetGo function

function formListeners(){
    $('.register').hide();
    $('#showRegisterOwner').on('click', function(){
        $('.register-owner').show();
    });
    $('#exitRegisterOwner').on('click', function(){
        $('.register-owner').hide();
    });
    $('#showRegisterPet').on('click', function(){
        $('.register-pet').show();
    });
    $('#exitRegisterPet').on('click', function(){
        $('.register-pet').hide();
    });
}

function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: displayPets
    }); //end ajax get
} // End getPets

function displayPets(pets) {
    $('.pet-list').empty();
    for (let i = 0; i < pets.length; i++) {
        let pet = pets[i]
        let $row = $(`<tr>`);
        $row.append(`
        <td>${pet.first_name} ${pet.last_name}</td>
        <td class="petName">${pet.name}</td>
        <td class="petBreed">${pet.breed}</td>
        <td class ="petColor">${pet.color}</td>
        <td class="btn-td"><button class="edit-pet"><i class="fas fa-edit"></i></button></td>
        <td class="checkedInOrOut">${checkPetStatus(pet.is_checked_in)}</td>
        <td class="btn-td"><button class="check-in-out">${buttonCheckIn(pet.is_checked_in)}</button></td>
        <td class="btn-td"><button class="deleteButton"><i class="far fa-trash-alt"></i></button></td>
        `);
        $('.pet-list').append($row);
        $row.data(pet);
    } //end for loop
    // Need to also get all owner names to help populate the owner dropdown
    getOwners()
} //end displayPets

function addPets() {
} // End addPets

function updatePets() {
} // End updatePets

function deletePets() {
    let id = $(this).parents('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/pets/${id}`,
        success: getPets
    })
} // End deletePets

function editPets() {
    let name = $(this).parents().siblings('.petName').text();
    let breed = $(this).parents().siblings('.petBreed').text();
    let color = $(this).parents().siblings('.petColor').text();

    $(this).parents().siblings('.petName').html(`<input type="text" id="pet-name" value="${name}">`);
    $(this).parents().siblings('.petBreed').html(`<input type="text" id="pet-breed" value="${breed}">`);
    $(this).parents().siblings('.petColor').html(`<input type="text" id="pet-color" value="${color}">`);
    $(this).replaceWith(`
        <button class="confirmButton">Confirm</button>
        <button class ="cancelButton">Cancel</button>`);
}

function confirmEdit(){
    let pet = $(this).closest('tr').data('id');
    let name = $('#pet-name').val();
    let breed = $('#pet-breed').val();
    let color = $('#pet-color').val();
    $.ajax({
        method: 'PUT',
        url: `/pets/${pet}`,
        data: {
            name: name,
            breed: breed,
            color: color
        },
        success: function(){
            getPets();
        }
    });
}


function getOwners() {
    $.ajax({
        method: 'GET',
        url: '/pets/owners',
        success: function(response) {
            console.log('response from getTask', response);
            for (let i = 0; i < response.length; i++) {
                const ownerResponse = response[i];
                $('#petOwnerDropDown').append(`<option class="ownerList" data-id="${ownerResponse.id}">${ownerResponse.first_name} ${ownerResponse.last_name}</option>`);
            }
        }
    }); //end ajax get
} // End getPets


function registerNewOwner() {
    let newOwner = {
        firstName: $('#OwnerFirstNameInput').val(),
        lastName: $('#OwnerLastNameInput').val(),
    };

    $.ajax({
        method: 'POST',
        url: '/pets',
        data: newOwner,
        success: function(response) {
            console.log('response:', response);
            //Clear input fields
            $('.register-owner input[type="text"]').val('');
        },
        error: function(response) {
            alert('Fill out all input fields.');
        }
    });
} // End registerNewOwner

function registerNewPet() {
    console.log("In registerNewPet");
 ///////***********************
 
    const ownerId = $(this).closest('.ownerList').data('id');

    let newPet = {
        name: $('#petNameInput').val(),
        breed: $('#petBreedInput').val(),
        color: $('#petColorInput').val()
    };
    $.ajax({
        method: 'POST',
        url: '/pets/newPet',
        data: newPet,
        success: function(response) {
            console.log('response:', response);
            //Clear input fields
            $('.register-pet input[type="text"]').val('');
        },
        error: function(response) {
            alert('Fill out all input fields.');
        }
    });
} // End registerNewPet

function checkInOut() {
    let id = $(this).parents('tr').data('id');
    let boolean = $(this).parents('tr').data('is_checked_in');
    console.log('id, ', id, 'boolean, ', boolean);
    if (boolean == false) {
        visitCheckInPost(id);
        boolean = true;
    } else if (boolean == true){
        visitCheckOutPut(id);
        boolean = false;
    }
    $.ajax({
        method:'PUT',
        url: `/pets/${id}/${boolean}`,
        success: getPets
    })
}

function visitCheckOutPut(id){
    $.ajax({
        method: 'PUT',
        url: `/visits/${id}`,
        success: function (response) {
            getVisitId();
        }
    })
}
function visitCheckInPost(id){
    $.ajax({
        method: 'POST',
        url: `/visits/${id}`,
        success: function (response) {
            getVisitId();
        }
    })
}

function getVisitId() {
    $.ajax({
        method: 'GET',
        url: '/visits',
        success: function (response) {
            // console.log('visits', response);
        }
    })
}
    //converts true or false boolean to useful string

function checkPetStatus(status) {
    if (status == true) {
        return 'Checked In';
    } else if (status == false){
        return 'Checked Out';
    }
}
    //converts button text depending on status
function buttonCheckIn(status) {
    if (status == true) {
        return 'Check Out';
    } else if (status == false){
        return 'Check In';
    }
}