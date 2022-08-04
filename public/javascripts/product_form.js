// for(i=0; i<categories.length; i++){
//     document.getElementById(categories[i]._id).addEventListener('click', function(){
//         console.log('Hello')
//     })
// }
// $(document).ready( function () {
  
// });

// var myBlah = function($blah) { alert($blah);  };

let div1 = document.getElementById('character-input');

let myBlah = function($id) { 
  let checkBox = document.getElementById($id);
  $.ajax(
    {
      url: "/inventory/get-category-characters/"+$id, 
      success: function(result){
          // console.log('$checked: ', $checked)
        if(checkBox.checked){
          createInputFields(result.characters);
        }
        else{
          removeInputFields(result.characters)
        }
      }
    }
  );
};

function createInputFields(characters){
  for(let i=0; i<characters.length;i++){
    let charIn = document.createElement('input')
    let charLabel = document.createElement('label')
    charIn.type='checkbox'
    charIn.id = characters[i]._id
    charIn.innerText=characters[i].name
    charIn.setAttribute('category', characters[i].category[0]._id)
    charLabel.innerText = characters[i].name
    charLabel.for=characters[i].id
    charLabel.id = characters[i]._id+'-label'
    div1.appendChild(charIn);
    div1.appendChild(charLabel)
  }
  console.log(characters)
}

function removeInputFields(characters){
  for(let i=0; i<characters.length;i++){
    let characterElement = document.getElementById(characters[i]._id)
    let characterElementLabel = document.getElementById(characters[i]._id+'-label')
    characterElement.remove()
    characterElementLabel.remove()
  }
  console.log(characters)
}


// $(document).ready(function(){
// $.ajax({url: "/inventory/get-category-characters/"+id, success: function(result){
// $("#div1").html(result.characters[0].name);
// }});
// });