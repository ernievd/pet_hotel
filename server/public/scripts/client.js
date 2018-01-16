$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display pets onload
  
    // Event Listeners
    $('#addNewOwnerBtn').on('click', registerNewOwner);

} // End readySetGo function


function getPets() {
} // End getPets

function addPets() {
} // End addPets

function updatePets() {
} // End updatePets

function deletePets() {
} // End deletePets

function editPets() {
    
}

function registerNewOwner() {
    console.log("In registerNewOwner");

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