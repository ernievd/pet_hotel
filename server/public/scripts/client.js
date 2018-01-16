$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Get pets on load
    getPets();
  
    // Event Listeners

} // End readySetGo function


function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: function(response){
            console.log('success!:', response);
        } //end success
    }); //end ajax get
} // End getPets

function addPets() {
} // End addPets

function updatePets() {
} // End updatePets

function deletePets() {
} // End deletePets

function editPets() {
    
}
