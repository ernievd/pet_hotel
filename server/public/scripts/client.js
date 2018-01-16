$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Get pets on load
    getPets();
    $('.pet-list').on('click', '.edit-pet', editPets);
    $('.pet-list').on('click', '.cancelButton', getPets);
    // Event Listeners
    $('#addNewOwnerBtn').on('click', registerNewOwner);
    $('#addNewPetBtn').on('click', registerNewPet);
    $('table').on('click', '.deleteButton', deletePets);
    $('table').on('click', '.check-in-out', checkInOut);
} // End readySetGo function


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
        <td class="checkedInOrOut">${checkPetStatus(pet.is_checked_in)}</td>
        <td><button class="edit-pet">Edit</button></td>
        <td><button class="deleteButton">Delete</button></td>
        <td><button class="check-in-out">${buttonCheckIn(pet.is_checked_in)}</button></td>
        `);
        $('.pet-list').append($row);
        $row.data(pet);
    } //end for loop

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
    let pet = $(this).closest('tr').data('id');
    
    $(this).parents().siblings('.petName').html(`<input type="text" value="hello">`);
    $(this).parents().siblings('.petBreed').html(`<input type="text" value="hello">`);
    $(this).parents().siblings('.petColor').html(`<input type="text" value="hello">`);
    $(this).replaceWith(`
        <button class="confirmButton">Confirm</button>
        <button class ="cancelButton">Cancel</button>`);
        console.log($(this));
        
    
    // $.ajax({
    //     method: 'PUT',
    //     url: '/pets/' + pet,
    //     data: ,
    //     success: function(){
    //         getPets();
    //     }
    // });
}

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
            console.log('response:', response)
            $('#tableBody').empty();
        },
        error: function(response) {
            alert('Fill out all input fields.');
        }
    });
} // End registerNewOwner

function registerNewPet() {
    console.log("In registerNewPet");

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
            console.log('response:', response)
            $('#tableBody').empty();
        },
        error: function(response) {
            alert('Fill out all input fields.');
        }
    });
} // End registerNewPet

function checkInOut() {
    let id = $(this).parents('tr').data('id');
    let boolean = $(this).parents('tr').data('is_checked_in');
    if (boolean == false) {
        boolean = true;
    } else if (boolean == true){
        boolean = false;
    }
    $.ajax({
        method:'PUT',
        url: `/pets/${id}/${boolean}`,
        success: getPets
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